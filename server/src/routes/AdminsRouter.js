// Imports Modules
import express from "express";
//import { validationResult } from "express-validator";
import { 
    // validateAdminReqBody, 
    cleanAdminObject } from "../validators/AdminValidator.js";
import { 
    // validatePasswordBody,
    cleanPasswordObject } from "../validators/PasswordValidator.js";
import { db as prisma } from "../utils/db.server.js";
import { getLatestIDSegments, exclude, allowed, generatePasswordHash } from "../utils/helpers.js";

// Express Router
const AdminsRouter = express.Router();

/* Helper Functions */
// Check if ID Exists
export const checkIDExists = async (admin_id) => {
    const adminEntry = await prisma.Admins.findUnique({
        where: {
            admin_id,
        },
    });

    return adminEntry !== null;
};

// Check if Email Exists
export const checkEmailExists = async (email) => {
    const adminEntry = await prisma.Admins.findUnique({
        where: {
            email: email,
        },
    });

    return adminEntry !== null;
};

const getLatestAdminIDSegment = async (currentYear) => {
    // ID Format: YYYY-AAA-III
    // Year [0:4] - Account Type Code [5:8] ID Number [9:12]

    // Get all admin_ids
    const adminEntries = (
        await prisma.Admins.findMany({
            select: {
                admin_id: true,
            },
            where: {
                admin_id: {
                    startsWith: currentYear,
                },
            },
            orderBy: {
                admin_id: "asc",
            },
        })
    ).map((element) => {
        return element.admin_id;
    });

    //If last admin id is null
    if (adminEntries.length === 0) {
        return { second: "", third: "" };
    }

    //Get latest id segments
    const {second, third} = getLatestIDSegments(adminEntries);

    return second, third;
}

// Generate admin_id
export const generateAdminID = (currentYear, second, third) => {

    //If last req id is null
    if (second === "" && third === "") {
        return currentYear + "-000-000";
    }

    if (parseInt(third) < 999) {
        return currentYear + "-" + second + "-" + (parseInt(third) + 1).toString().padStart(3, "0");
    }

    if (parseInt(second) < 999) {
        return currentYear + "-" + (parseInt(second) + 1).toString().padStart(3, "0") + "-000";
    }

    //Throw an error if the id number overflows. This happens when the number of requests exceeds 99999 per year
    throw new Error("ID Overflow!");
};

/* Controllers */

/* GET Endpoints */
// Get Admin
AdminsRouter.get("/:admin_id", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(401).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        // Get admin_id from req.params
        const { admin_id } = req.params;

        // Check if admin exists
        if (!(await checkIDExists(admin_id))) {
            throw new Error("Admin does not exist");
        }

        // Get admin from database
        const admin = await prisma.Admins.findUnique({
            where: {
                admin_id: admin_id,
            },
            select: {
                admin_id: true,
                email: true,
            },
        });

        // Return admin
        res.status(200).send(admin);
    } catch (error) {
        // Return error
        res.status(404).send({ error: error.message });
    }
});

/* POST Endpoints */
// Create Admin
AdminsRouter.post("/", 
    // validateAdminReqBody(), 
    async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(401).send({ error: "You are not authorized to access this" });
        return;
    }

    // // Validate Admin Info
    // const result = validationResult(req);
    // if (!result.isEmpty()) {
    //     // Return errors if any
    //     return res.status(400).send({ errors: result.array() });
    // }

    try {
        // Get admin from req.body
        const admin = cleanAdminObject(req.body);

        // Check if email exists
        if (await checkEmailExists(admin.email)) {
            throw new Error("Email already exists");
        }

        // Generate admin_id
        const currentYear = new Date().getFullYear().toString();
        const { second, third } = await getLatestAdminIDSegment(currentYear);
        admin.admin_id = generateAdminID(currentYear, second, third);

        // Generate password hash
        admin.password = generatePasswordHash(admin.password);

        // Create admin in database
        await prisma.Admins.create({ data: admin });

        res.status(200).send({
            message: "Create successful, your id number is: " + admin.admin_id,
        });
    } catch (error) {
        // Return error
        res.status(500).send({ error: error.message });
    }
});

/* PATCH Endpoints */
// Update Admin Information
AdminsRouter.patch("/:admin_id", 
    // validateAdminReqBody(), 
    async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(401).send({ error: "You are not authorized to access this" });
        return;
    }

    // // Validate Admin Info
    // const result = validationResult(req);
    // if (!result.isEmpty()) {
    //     // Return errors if any
    //     return res.status(400).send({ errors: result.array() });
    // }

    try {
        // Get admin_id from req.params
        const { admin_id } = req.params;

        // Check if admin exists
        if (!(await checkIDExists(admin_id))) {
            throw new Error("Admin does not exist");
        }

        // Get updated info from req.body
        const updatedData = exclude(cleanAdminObject(req.body), ["password"]);

        // Update admin in database
        await prisma.Admins.update({
            where: {
                admin_id: admin_id,
            },
            data: updatedData,
        });

        res.status(200).send({ message: "Update successful" });
    } catch (error) {
        // Return error
        res.status(500).send({ error: error.message });
    }
});

// Update password
AdminsRouter.patch("/update_password/:admin_id", 
    // validatePasswordBody(), 
    async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(401).send({ error: "You are not authorized to access this" });
        return;
    }

    // // Validate Admin Info
    // const result = validationResult(req);
    // if (!result.isEmpty()) {
    //     // Return errors if any
    //     return res.status(400).send({ errors: result.array() });
    // }

    try {
        // Get admin_id from req.params
        const { admin_id } = req.params;

        // Check if admin exists
        if (!(await checkIDExists(admin_id))) {
            throw new Error("Admin does not exist");
        }

        if (admin_id !== req.user.user_id) {
            res.status(403).send({ error: "You are not authorized to access this" });
            return;
        }

        // Get updated info from req.body
        const updatedData = cleanPasswordObject(req.body);

        // Update password in database
        await prisma.Admins.update({
            where: {
                admin_id: admin_id,
            },
            data: updatedData,
        });

        res.status(200).send({ message: "Password successfully changed" });
    } catch (error) {
        // Return error
        res.status(500).send({ error: error.message });
    }
});

/* DELETE Endpoints */
// Delete Admin
AdminsRouter.delete("/:admin_id", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(401).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        // Get admin_id from req.params
        const { admin_id } = req.params;

        // Check if admin exists
        if (!(await checkIDExists(admin_id))) {
            throw new Error("Admin does not exist");
        }

        // Delete the admin from the database
        await prisma.Admins.delete({
            where: {
                admin_id: admin_id,
            },
        });

        // Return response message
        res.status(200).send({
            message: "Admin " + admin_id + " successfully deleted from database",
        });
    } catch (error) {
        // Return error
        res.status(404).send({ error: error.message });
    }
});

// Export Router
export default AdminsRouter;
