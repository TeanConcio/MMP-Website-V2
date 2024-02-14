// Imports Modules
import express from "express";
import { validationResult } from "express-validator";
import { validateBillReqBody, cleanBillObject } from "../validators/BillsValidator.js";
import { db as prisma } from "../utils/db.server.js";
import { allowed } from "../utils/helpers.js";

// Express Router
const BillsRouter = express.Router();

/* Helper Functions */
// Check if bill exists
const exists = async (bill_no) => {
    const billEntry = await prisma.Bills.findUnique({
        where: {
            bill_no: bill_no,
        },
    });

    if (billEntry == null) {
        return false;
    } else {
        return true;
    }
};

const parser = (object) => {
    object["issued_on"] = new Date(object["issued_on"]);

    return object;
};

/* Controllers */

/* GET Endpoints */
// Get Bill
BillsRouter.get("/:bill_no", async (req, res) => {
    if (!allowed(req.permission, [1, 2, 3])) {
        res.status(403).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        // Get bill_no from req.params
        const { bill_no } = req.params;

        // Check if bill exists
        if (!(await exists(bill_no))) {
            throw new Error("Bill does not exist");
        }

        // Get bill from database
        const bill = await prisma.Bills.findUnique({
            where: {
                bill_no: bill_no,
            },
            select: {
                bill_no: true,
                fee: true,
                deductions: true,
                billed_to: true,
                status: true,
                remarks: true,
                issued_on: true,
            },
        });

        // Return bill
        res.status(200).send(bill);
    } catch (error) {
        // Return error
        res.status(404).send({ error: error.message });
    }
});

// Get All Bills
BillsRouter.get("/", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(403).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        // Get all bills from database
        const bills = await prisma.Bills.findMany({
            select: {
                bill_no: true,
                fee: true,
                deductions: true,
                billed_to: true,
                status: true,
                remarks: true,
                issued_on: true,
            },
        });

        // Return bills
        res.status(200).send(bills);
    } catch (error) {
        // Return error
        res.status(500).send({ error: error.message });
    }
});

// Get All Bills that are not fully paid
BillsRouter.get("/unpaid", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(403).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        // Get all bills from database
        const bills = await prisma.Bills.findMany({
            where: {
                status: {
                    not: "FULLY_PAID",
                },
            },
            select: {
                bill_no: true,
                fee: true,
                deductions: true,
                billed_to: true,
                status: true,
                remarks: true,
                issued_on: true,
            },
        });

        // Return bills
        res.status(200).send(bills);
    } catch (error) {
        // Return error
        res.status(500).send({ error: error.message });
    }
});

// Get all bills of a module
BillsRouter.get("/module/:module_name", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(403).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        // Get module_name from req.params
        const { module_name } = req.params;

        // Get all bills from database
        const bills = await prisma.Bills.findMany({
            where: {
                enrollments: {
                    module_name: module_name,
                },
            },
            select: {
                bill_no: true,
                fee: true,
                deductions: true,
                billed_to: true,
                status: true,
                remarks: true,
                issued_on: true,
                enrollments: {
                    select: {
                        student_id: true,
                        grade: true,
                        student: {
                            select: {
                                first_name: true,
                                last_name: true,
                                middle_name: true,
                            },
                        },
                    },
                },
            }
        });

        // Return bills
        res.status(200).send(bills);
    } catch (error) {
        // Return error
        res.status(500).send({ error: error.message });
    }
});

/* POST Endpoints */
// Create Bill
BillsRouter.post("/", validateBillReqBody(), async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(403).send({ error: "You are not authorized to access this" });
        return;
    }

    // Validate Bill Info
    const result = validationResult(req);
    if (!result.isEmpty()) {
        // Return errors if any
        return res.status(400).send({ errors: result.array() });
    }

    try {
        // Get bill from req.body
        const bill = parser(cleanBillObject(req.body));

        // Check if bill_no exists
        if (await exists(bill.bill_no)) {
            throw new Error("Bill number already exists");
        }

        // Create bill in database
        await prisma.Bills.create({ data: bill });

        res.status(200).send({ message: "Create successful" });
    } catch (error) {
        // Return error
        res.status(500).send({ error: error.message });
    }
});

/* PATCH Endpoints */
// Update Bill
BillsRouter.patch("/:bill_no", validateBillReqBody(), async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(403).send({ error: "You are not authorized to access this" });
        return;
    }

    // Validate Bill Info
    const result = validationResult(req);
    if (!result.isEmpty()) {
        // Return errors if any
        return res.status(400).send({ errors: result.array() });
    }

    try {
        // Get bill_no from req.params
        const { bill_no } = req.params;

        // Get updated info from req.body
        const updatedData = parser(cleanBillObject(req.body));

        // Update bill in database
        await prisma.Bills.update({
            where: {
                bill_no: bill_no,
            },
            data: updatedData,
        });

        res.status(200).send({ message: "Update successful" });
    } catch (error) {
        // Return error
        res.status(500).send({ error: error.message });
    }
});

// Delete Bill
BillsRouter.delete("/:bill_no", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(403).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        // Get bill_no from req.params
        const { bill_no } = req.params;

        // Check if bill_no exists
        if (!(await exists(bill_no))) {
            throw new Error("Bill number does not exist");
        }

        //Delete the bill
        await prisma.Bills.delete({
            where: {
                bill_no: bill_no,
            },
        });

        // Return response
        res.status(200).send({
            message: "Bill " + bill_no + " successfully deleted from database",
        });
    } catch (error) {
        // Return error
        res.status(404).send({ error: error.message });
    }
});

// Export Router
export default BillsRouter;
