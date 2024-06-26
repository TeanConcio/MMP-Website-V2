// Imports Modules
import express from "express";
import { db as prisma } from "../utils/db.server.js";
import { exclude, allowed } from "../utils/helpers.js";

// Import JSZip and json2csv
import JSZip from "jszip";
import { parse as parseToCSV } from "json2csv";

// Import PDF Generator
import pkg from '../utils/pdf_generator.cjs';
const generatePDF = pkg;

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

        res.status(200).send(blob);
    } catch (error) {
        // Return error
        res.status(500).send({ error: error.message });
    }
});

// Download All Module Data as Zipped CSVs
DownloadRouter.get("/modules", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(401).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        const zip = new JSZip();

        // Get All Combinations of Module Names and School Years
        const modules = await prisma.Modules.findMany({
            select: {
                module_name: true,
                school_year: true,
            },
            orderBy: {
                school_year: "desc",
            },
        });

        // Empty enrollment object for modules with no enrollments
        const empty_enrollment = {
            student_id: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "",
            grade: "",
            no_of_absences: "",
            remarks: "",
        };
        
        // For each module, get all enrollments
        await Promise.all(
            modules.map(async (module) => {
                let enrollments = await prisma.Module_Enrollments.findMany({
                    where: {
                        module_name: module.module_name,
                        school_year: module.school_year,
                    },
                    select: {
                        student: {
                            select: {
                                student_id: true,
                                first_name: true,
                                middle_name: true,
                                last_name: true,
                                email: true,
                            },
                        },
                        grade: true,
                        no_of_absences: true,
                        remarks: true,
                    },
                    orderBy: {
                        student: {
                            student_id: "asc",
                        },
                    },
                });

                // Format Module Enrollments
                enrollments.forEach((enrollment) => {
                    enrollment.student_id = enrollment.student.student_id;
                    enrollment.first_name = enrollment.student.first_name;
                    enrollment.middle_name = enrollment.student.middle_name;
                    enrollment.last_name = enrollment.student.last_name;
                    enrollment.email = enrollment.student.email;
                    delete enrollment.student;
                });

                // Reorder Module Enrollment Columns
                enrollments = enrollments.map((enrollment) => {
                    return {
                        student_id: enrollment.student_id,
                        first_name: enrollment.first_name,
                        middle_name: enrollment.middle_name,
                        last_name: enrollment.last_name,
                        email: enrollment.email,
                        grade: enrollment.grade,
                        no_of_absences: enrollment.no_of_absences,
                        remarks: enrollment.remarks,
                    };
                });

                // For each table, export as CSV
                try {
                    // Check if enrollments array is not empty
                    if (enrollments.length > 0) {
                        // Parse json to csv and add to zip
                        zip.file(
                            `${module.module_name} ${module.school_year}.csv`,
                            parseToCSV(enrollments)
                        );
                    } else {
                        // Add csv with only keys to zip
                        zip.file(
                            `${module.module_name} ${module.school_year}.csv`,
                            parseToCSV([empty_enrollment])
                        );
                    }
                } catch (err) {
                    console.error(
                        "Problem exporting " +
                            module.module_name +
                            " " +
                            module.school_year +
                            ": " +
                            err
                    );
                }
            })
        );

        const blob = await zip.generateAsync({ type: "base64" });
        console.log(`ADMIN [${req.user.user_id}] EXPORTED all module data`);

        res.status(200).send(blob);
    } catch (error) {
        // Return error
        res.status(404).send({ error: error.message });
    }
});

// Download Year Module Data as Zipped CSVs
DownloadRouter.get("/modules/:school_year", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(401).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        const school_year = parseInt(req.params.school_year);
        const zip = new JSZip();

        // Get All Combinations of Module Names in the Year
        const modules = await prisma.Modules.findMany({
            where: {
                school_year: school_year,
            },
            select: {
                module_name: true,
                school_year: true,
            },
            orderBy: {
                school_year: "desc",
            },
        });

        // Empty enrollment object for modules with no enrollments
        const empty_enrollment = {
            student_id: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "",
            grade: "",
            no_of_absences: "",
            remarks: "",
        };
        
        // For each module, get all enrollments
        await Promise.all(
            modules.map(async (module) => {
                let enrollments = await prisma.Module_Enrollments.findMany({
                    where: {
                        module_name: module.module_name,
                        school_year: module.school_year,
                    },
                    select: {
                        student: {
                            select: {
                                student_id: true,
                                first_name: true,
                                middle_name: true,
                                last_name: true,
                                email: true,
                            },
                        },
                        grade: true,
                        no_of_absences: true,
                        remarks: true,
                    },
                    orderBy: {
                        student: {
                            student_id: "asc",
                        },
                    },
                });

                // Format Module Enrollments
                enrollments.forEach((enrollment) => {
                    enrollment.student_id = enrollment.student.student_id;
                    enrollment.first_name = enrollment.student.first_name;
                    enrollment.middle_name = enrollment.student.middle_name;
                    enrollment.last_name = enrollment.student.last_name;
                    enrollment.email = enrollment.student.email;
                    delete enrollment.student;
                });

                // Reorder Module Enrollment Columns
                enrollments = enrollments.map((enrollment) => {
                    return {
                        student_id: enrollment.student_id,
                        first_name: enrollment.first_name,
                        middle_name: enrollment.middle_name,
                        last_name: enrollment.last_name,
                        email: enrollment.email,
                        grade: enrollment.grade,
                        no_of_absences: enrollment.no_of_absences,
                        remarks: enrollment.remarks,
                    };
                });

                // For each table, export as CSV
                try {
                    // Check if enrollments array is not empty
                    if (enrollments.length > 0) {
                        // Parse json to csv and add to zip
                        zip.file(
                            `${module.module_name} ${module.school_year}.csv`,
                            parseToCSV(enrollments)
                        );
                    } else {
                        // Add csv with only keys to zip
                        zip.file(
                            `${module.module_name} ${module.school_year}.csv`,
                            parseToCSV([empty_enrollment])
                        );
                    }
                } catch (err) {
                    console.error(
                        "Problem exporting " +
                            module.module_name +
                            " " +
                            module.school_year +
                            ": " +
                            err
                    );
                }
            })
        );

        const blob = await zip.generateAsync({ type: "base64" });
        console.log(`ADMIN [${req.user.user_id}] EXPORTED the module data for ${school_year}`);

        res.status(200).send(blob);
    } catch (error) {
        // Return error
        res.status(404).send({ error: error.message });
    }
});

// Download All Data of a Student as Zipped CSVs
DownloadRouter.get("/student/:student_id", async (req, res) => {
    if (!allowed(req.permission, [3])) {
        res.status(401).send({ error: "You are not authorized to access this" });
        return;
    }

    try {
        const student_id = req.params.student_id;

        const zip = new JSZip();

        // Get All Tables
        let student_data = {
            student: await prisma.Students.findUnique({
                where: {
                    student_id: student_id,
                },
            }),
            module_enrollments: await prisma.Module_Enrollments.findMany({
                where: {
                    student_id: student_id,
                },
                select: {
                    status: true,
                    grade: true,
                    no_of_absences: true,
                    remarks: true,
                    module: {
                        select: {
                            school_year: true,
                            session_1: true,
                            session_2: true,
                            teacher: {
                                select: {
                                    first_name: true,
                                    middle_name: true,
                                    last_name: true,
                                },
                            },
                            details: {
                                select: {
                                    module_name: true,
                                    program: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    module: {
                        module_name: "asc",
                    },
                },
            }),
            bills: await prisma.Bills.findMany({
                where: {
                    billed_to: student_id,
                },
                select: {
                    bill_no: true,
                    fee: true,
                    deductions: true,
                    status: true,
                    remarks: true,
                    issued_on: true,
                },
                orderBy: {
                    issued_on: "asc",
                },
            }),
            payments: await prisma.Payments.findMany({
                where: {
                    payee: student_id,
                },
                select: {
                    or_no: true,
                    bill_no: true,
                    payment: true,
                    remarks: true,
                    paid_on: true,
                },
                orderBy: {
                    paid_on: "asc",
                },
            }),
        };

        // Format Student Data
        student_data.student = exclude(student_data.student, [
            "password",
            "created_at",
            "updated_at",
        ]);

        // Format Module Enrollments
        student_data.module_enrollments.forEach((enrollment) => {
            enrollment.module_name = enrollment.module.details.module_name;
            enrollment.school_year = enrollment.module.school_year;
            enrollment.program = enrollment.module.details.program;
            enrollment.teacher_first_name = enrollment.module.teacher.first_name;
            enrollment.teacher_middle_name = enrollment.module.teacher.middle_name;
            enrollment.teacher_last_name = enrollment.module.teacher.last_name;
            enrollment.session_1 = enrollment.module.session_1;
            enrollment.session_2 = enrollment.module.session_2;
            delete enrollment.module;
        });
        // Reorder Module Enrollment Columns
        student_data.module_enrollments = student_data.module_enrollments.map((enrollment) => {
            return {
                module_name: enrollment.module_name,
                school_year: enrollment.school_year,
                program: enrollment.program,
                teacher_first_name: enrollment.teacher_first_name,
                teacher_middle_name: enrollment.teacher_middle_name,
                teacher_last_name: enrollment.teacher_last_name,
                session_1: enrollment.session_1,
                session_2: enrollment.session_2,
                status: enrollment.status,
                grade: enrollment.grade,
                no_of_absences: enrollment.no_of_absences,
                remarks: enrollment.remarks,
            };
        });

        // For each table, export as CSV
        for (const [key, value] of Object.entries(student_data)) {
            try {
                // If value is an array and is empty
                if (Array.isArray(value) && value.length === 0) {
                    console.log(`No ${key} for ${student_id}`);
                    zip.file(`${key}.csv`, `No ${key} for ${student_id}`);
                } else {
                    // Check if value array is not empty
                    zip.file(`${key}.csv`, parseToCSV(value));
                }
            } catch (err) {
                console.error("Problem exporting " + key + ": " + err);
            }
        }

        const blob = await zip.generateAsync({ type: "base64" });
        console.log(`ADMIN [${req.user.user_id}] EXPORTED the data of Student ${student_id}`);

        res.status(200).send(blob);
    } catch (error) {
        // Return error
        res.status(404).send({ error: error.message });
    }
});

// Download Student Registration PDF
DownloadRouter.get("/student/pdf/:student_id", async (req, res) => {
    if (!allowed(req.permission, [1, 3])) {
        res.status(401).send({ error: "You are not authorized to access this" });
        return;
    }

    try {

        // Get student_id from req.params
        const student_id = req.params.student_id;

        //Check if ID Exists
        const checkIDExists = async (student_id) => {
            const studentEntry = await prisma.Students.findUnique({
                where: {
                    student_id: student_id,
                },
            });

            if (studentEntry == null) {
                return false;
            } else {
                return true;
            }
        };
        // Check if student exists
        if (!(await checkIDExists(student_id))) {
            throw new Error("Student does not exist");
        }

        // Get student from database
        let studentData = null;
        studentData = await prisma.Students.findUnique({
            where: {
                student_id: student_id,
            },
            select: {
                student_id: true,
                first_name: true,
                last_name: true,
                middle_name: true,
                address: true,
                mobile_number: true,
                landline: true,
                email: true,
                birthdate: true,
                birthplace: true,
                nationality: true,
                gender: true,
                civil_status: true,
                no_of_children: true,
                school: true,
                occupation: true,
                admin: true,
                church: true,
                pastor: true,
                is_partner_school: true,
                gradeschool: true,
                highschool: true,
                college: true,
                college_course: true,
                graduate_course: true,
                graduate: true,
                others: true,
                essay: true,
                emergency_name: true,
                emergency_address: true,
                emergency_mobile_number: true,
            },
        });

        // Format Student Data
        studentData["school_year"] = new Date().getFullYear().toString();
        studentData["full_name"] = `${studentData.first_name} ${studentData.middle_name} ${studentData.last_name}`;
        studentData["college_w_course"] = `${studentData.college} (${studentData.college_course})`;
        studentData["graduate_w_course"] = `${studentData.graduate} (${studentData.graduate_course})`;
        let date = studentData["birthdate"] // use your date here
        studentData["birthdate"] = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        studentData["no_of_children"] = studentData["no_of_children"].toString();
        switch (studentData["is_partner_school"]) {
            case true:
                studentData["is_partner_school"] = "YES";
                break;
            case false:
                studentData["is_partner_school"] = "NO";
                break;
            default:
                studentData["is_partner_school"] = "NO";
                break;
        }

        console.log(`ADMIN [${req.user.user_id}] PRINTED the data of Student ${student_id}`);

        // Generate PDF as buffer
        const buffer = await generatePDF(studentData);

        // Set Headers
        res.setHeader('Content-Type', 'application/pdf');

        //console.log(buffer instanceof Buffer)
        //console.log(buffer)

        // Convert buffer to base64
        let bufferFromAB = Buffer.from(buffer);
        const base64 = bufferFromAB.toString('base64');

        // Send response
        res.status(200).send(base64);

    } catch (error) {
        // Return error
        console.log(`Error: ${error}`);
        res.status(404).send({ error: error.message });
    }
});

// Export Router
export default DownloadRouter;
