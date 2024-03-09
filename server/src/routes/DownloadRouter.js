// Imports Modules
import express from "express";
import { db as prisma } from "../utils/db.server.js";
import JSZip from "jszip";
import { parse as parseToCSV } from "json2csv";
import { exclude, allowed } from "../utils/helpers.js";

// Express Router
const DownloadRouter = express.Router();

/* Helpers */
const excludePasswordDates = (object) => {
    return exclude(object, ["password", "created_at", "updated_at"]);
};

/* Controllers */

/* GET Endpoints */

// Download All Tables as Zipped CSVs
DownloadRouter.get("/all", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(401).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        const zip = new JSZip();

        // Get All Tables
        let database = {
            students: await prisma.Students.findMany({}),
            bills: await prisma.Bills.findMany({}),
            admins: await prisma.Admins.findMany({}),
            teachers: await prisma.Teachers.findMany({}),
            payments: await prisma.Payments.findMany({}),
            modules: await prisma.Modules.findMany({}),
            module_enrollments: await prisma.Module_Enrollments.findMany({}),
            tor_requests: await prisma.TOR_Requests.findMany({}),
            module_details: await prisma.Module_Details.findMany({}),
            module_names: await prisma.Module_Names.findMany({}),
            tickets: await prisma.Tickets.findMany({}),
        };

        // Exclude password and dates
        database = Object.fromEntries(
            Object.entries(database).map(([key, value]) => [key, value.map(excludePasswordDates)])
        );

        // For each table, export as CSV
        for (const [key, value] of Object.entries(database)) {
            exclude(value, ["password", "created_at", "updated_at"]);
            try {
                if (value != null && value.length > 0) {
                    // Check if value array is not empty
                    zip.file(`${key}.csv`, parseToCSV(value));
                } else {
                    console.log(`No ${key} in the database`);
                    zip.file(`${key}.csv`, `No ${key} in the database`);
                }
            } catch (err) {
                console.error(`\nProblem exporting ${key} : ${err}\n`);
                console.log(`value: \n${value}\n`);
                res.status(500).send({ error: `Problem exporting ${key} : ${err}` });
            }
        }

        const blob = await zip.generateAsync({ type: "base64" });
        console.log(`ADMIN [${req.user.user_id}] EXPORTED the database`);

        res.send(blob);
    } catch (error) {
        // Return error
        res.status(500).send({ error: error.message });
    }
});

// Export Router
export default DownloadRouter;
