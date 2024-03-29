// Imports Modules
import express from "express";
import { validationResult } from "express-validator";
import { validateBillReqBody, cleanBillObject } from "../validators/BillsValidator.js";
import { db as prisma } from "../utils/db.server.js";
import { allowed, generateFinancePKSegments } from "../utils/helpers.js";

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

const getLatestBillIDSegment = async () => {

    // Get all bill_no
    const billNoList = (
        await prisma.Bills.findMany({
            select: {
                bill_no: true,
            },
        })
    ).map((element) => {
        return element.bill_no;
    });

    // If no OR numbers are found
    if (billNoList.length === 0){
        return { first: "", second: "" }
    }

    const { first, second } = generateFinancePKSegments(billNoList);

    return {first, second};
}

export const generateBillNo = (first, second) => {

    // Bill Number Format: A-XXXXXXXXX
    // A: 1-digit segment
    // XXXXXXXXX: 9-digit segment

    //If last req id is null
    if (first === "" && second === "") {
        return "1-000000000"
    }

    if (parseInt(second) < 999999999) {
        return `${first.toString()}-${(parseInt(second) + 1).toString().padStart(9, "0")}`;
    }

    if (parseInt(first) < 9) {
        return `${(first + 1).toString()}-000000000`;
    }

    //Throw an error if the id number overflows. This happens when the number of requests exceeds 99999 per year
    throw new Error("Bill Number Overflow!");
};

/* Controllers */

/* GET Endpoints */
// Get Bill
BillsRouter.get("/:bill_no", async (req, res) => {
    if (!allowed(req.permission, [3])) {
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
                payments: {
                    select: {
                        payment: true,
                        remarks: true,
                        paid_on: true,
                    },
                },
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
            orderBy: {
                bill_no: "asc",
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
            orderBy: {
                bill_no: "asc",
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
                        module_name: true,
                        school_year: true,
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
                payments: {
                    select: {
                        or_no: true,
                        payment: true,
                    },
                },
            },
            orderBy: {
                bill_no: "asc",
            },
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
BillsRouter.post(
    "/bill/:module_name/:school_year/:student_id",
    validateBillReqBody(),
    async (req, res) => {
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

            //Add bill number
            const {first, second} = await getLatestBillIDSegment();
            bill.bill_no = generateBillNo(first, second);

            // Create bill in database
            await prisma.Bills.create({ data: bill });

            //Get module enrollment the bill is for from params
            const { module_name, student_id } = req.params;

            //Parse School Year
            const school_year = parseInt(req.params.school_year);

            //Append bill to correct enrollment
            await prisma.Module_Enrollments.update({
                where: {
                    student_id_module_name_school_year: { student_id, module_name, school_year },
                },
                data: { bill_no: bill.bill_no },
            });

            res.status(200).send({ message: "Create successful", bill: bill });
        } catch (error) {
            // Return error
            res.status(500).send({ error: error.message });
        }
    }
);

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
BillsRouter.delete("/delete/:bill_no/:module_name/:school_year/:student_id", async (req, res) => {
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

        //Delete all payments of the bill
        await prisma.Payments.deleteMany({
            where: {
                bill_no: bill_no,
            },
        });

        //Delete the bill
        await prisma.Bills.delete({
            where: {
                bill_no: bill_no,
            },
        });

        //Get module enrollment the bill is for from params
        const { module_name, student_id } = req.params;

        //Parse School Year
        const school_year = parseInt(req.params.school_year);

        //Remove bill from associated enrollment
        await prisma.Module_Enrollments.update({
            where: {
                student_id_module_name_school_year: { student_id, module_name, school_year },
            },
            data: { bill_no: null },
        });

        // Return response
        res.status(200).send({
            message: `Bill Number: ${bill_no} and its associated payments have been deleted from the database`,
        });
    } catch (error) {
        // Return error
        res.status(404).send({ error: error.message });
    }
});

// Export Router
export default BillsRouter;
