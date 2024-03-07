// Imports Modules
import express from "express";
import { db as prisma } from "../utils/db.server.js";
import { allowed } from "../utils/helpers.js";

// Express Router
const TicketsRouter = express.Router();

/* Helper Functions */
// Check if Ticket Exists
const exists = async (ticket_id) => {
    const requestEntry = await prisma.Tickets.findUnique({
        where: {
            ticket_id: ticket_id,
        },
    });

    if (requestEntry == null) {
        return false;
    } else {
        return true;
    }
};

// Get Latest Ticket ID
const getLatestTicketIDSegment = async (currentYear) => {
    // ID Format: YYYY-AAAAA
    // YYYY: Year
    // AAAAA: 5-digit segment

    // Get all ticket_ids
    const ticketEntries = (
        await prisma.Tickets.findMany({
            select: {
                ticket_id: true,
            },
            where: {
                ticket_id: {
                    startsWith: currentYear,
                },
            },
            orderBy: {
                ticket_id: "asc",
            },
        })
    ).map((element) => {
        return element.ticket_id;
    });

    //If last ticket id is null
    if (ticketEntries.length === 0) {
        return -1;
    }

    //Get the last ticket id segment
    const id_list = ticketEntries.map((element) => parseInt(element.substring(5)));
    let max = 0;
    for (const num of id_list) {
        if (num > max) {
            max = num;
        }
    }

    return max;
}

// Generate requestID
const generateTicketID = async (currentYear, lastTicketIDSegment) => {

    //If last ticket id is null
    if (lastTicketIDSegment === -1) {
        return currentYear + "-00000";
    }

    //Increment the last ticket id segment
    if (lastTicketIDSegment < 99999) {
        const id_segment = (lastTicketIDSegment + 1).toString().padStart(5, "0");
        return currentYear + "-" + id_segment;
    }

    //Throw an error if the id number overflows. This happens when the number of requests exceeds 99999 per year
    throw new Error("ID Overflow!");
};

/* Controllers */
/* GET Endpoints */
// Get a Ticket
TicketsRouter.get("/:ticket_id", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(403).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        // Get ticket_id from req.params
        const { ticket_id } = req.params;

        // Check if ticket exists
        if (!(await exists(ticket_id))) {
            throw new Error("Ticket does not exist");
        }

        // Get ticket from database
        const ticket = await prisma.Tickets.findUnique({
            where: {
                ticket_id: ticket_id,
            },
            select: {
                ticket_id: true,
                first_name: true,
                last_name: true,
                email: true,
                mobile_number: true,
                title: true,
                description: true,
                status: true,
                create_date: true,
            },
        });

        // Return ticket
        res.status(200).send(ticket);
    } catch (error) {
        // Return error
        res.status(404).send({ error: error.message });
    }
});

// Get all Tickets
TicketsRouter.get("/", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(403).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        // Get Tickets

        const tickets = await prisma.Tickets.findMany({
            select: {
                ticket_id: true,
                first_name: true,
                last_name: true,
                email: true,
                mobile_number: true,
                title: true,
                description: true,
                status: true,
                create_date: true,
            },
            orderBy: {
                ticket_id: "asc",
            },
        });

        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

//Get all Ticket for a certain year
TicketsRouter.get("/year/:year", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(403).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        // Get year
        const { year } = req.params;

        // Get Tickets
        const tickets = await prisma.Tickets.findMany({
            where: {
                AND: [
                    {
                        create_date: {
                            gte: new Date(year + "-01-01"),
                        },
                    },
                    {
                        create_date: {
                            lt: new Date((parseInt(year) + 1).toString() + "-01-01"),
                        },
                    },
                ],
            },
            select: {
                ticket_id: true,
                first_name: true,
                last_name: true,
                email: true,
                mobile_number: true,
                title: true,
                description: true,
                status: true,
                create_date: true,
            },
            orderBy: {
                ticket_id: "asc",
            },
        });

        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

//Get all Tickets of a certain status
TicketsRouter.get("/all/:status", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(403).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        // Get status
        const { status } = req.params;

        // Get Tickets
        const tickets = await prisma.Tickets.findMany({
            where: {
                status: status.toUpperCase(),
            },
            select: {
                ticket_id: true,
                first_name: true,
                last_name: true,
                email: true,
                mobile_number: true,
                title: true,
                description: true,
                status: true,
                create_date: true,
            },
            orderBy: {
                ticket_id: "asc",
            },
        });

        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

/* POST Endpoints */
// Create Ticket
TicketsRouter.post("/", async (req, res) => {
    if (!allowed(req.permission, [0, 1, 2, 3])) {
        res.status(403).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        // Get ticket from req.body
        const ticket = req.body;

        // Generate ticket_id
        const currentYear = new Date().getFullYear().toString();
        const lastTicketIDSegment = await getLatestTicketIDSegment(currentYear);
        ticket.ticket_id = await generateTicketID(currentYear, lastTicketIDSegment);
        
        ticket.status = "PENDING";
        ticket.create_date = new Date();

        // Create ticket in database
        await prisma.Tickets.create({ data: ticket });

        res.status(200).send({ message: "Create successful", ticket_id: ticket.ticket_id});
    } catch (error) {
        // Return error
        res.status(500).send({ error: error.message });
    }
});

/* UPDATE Endpoints */
// Update Ticket
TicketsRouter.patch("/:ticket_id", async (req, res) => {
    if (!allowed(req.permission, [1, 2, 3])) {
        res.status(403).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        // Get ticket_id from req.params
        const { ticket_id } = req.params;

        // Check if ticket exists
        if (!(await exists(ticket_id))) {
            throw new Error("Ticket does not exist");
        }

        // Get updated info from req.body
        const updatedData = req.body;

        // Update ticket in database
        await prisma.Tickets.update({
            where: {
                ticket_id: ticket_id,
            },
            data: updatedData,
        });

        res.status(200).send({ message: "Update successful" });
    } catch (error) {
        // Return error
        res.status(500).send({ error: error.message });
    }
});

/* DELETE Endpoints */
//Delete Ticket
TicketsRouter.delete("/:ticket_id", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(403).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        // Get ticket_id from req.params
        const { ticket_id } = req.params;

        // Check if ticket exists
        if (!(await exists(ticket_id))) {
            throw new Error("Ticket does not exist");
        }

        // Delete record
        await prisma.Tickets.delete({
            where: {
                ticket_id: ticket_id,
            },
        });

        // Return ticket
        res.status(200).send({
            message:
                "Request with id '" + ticket_id + "' has been successfully deleted from the database",
        });
    } catch (error) {
        // Return error
        res.status(500).send({ error: error.message });
    }
});

// Export Router
export default TicketsRouter;
