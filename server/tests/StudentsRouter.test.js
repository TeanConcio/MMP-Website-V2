/* eslint-disable no-undef */
// Import functions to test
import { generateStudentID } from "../src/routes/StudentsRouter.js";

// Test Suite
describe("StudentsRouter Helper Functions", () => {

    // Test generateStudentID Function
    describe('generateStudentID Function', () => {

        // Test case for incrementing the ID number within the limit
        it('increment the third parameter when less than 999', async () => {
            const input = { second: "000", third: "123" };

            const currentYear = new Date().getFullYear().toString();

            const result = await generateStudentID(input);

            expect(result).toMatch(currentYear+'-000-124'); // Expects the format to be YYYY-AAA-III
          });

        // Test case for incrementing the ID number within the maximum limit
        it('increment second part of ID when third part exceeds 999', async () => {
            const input = { second: "000", third: "999" };

            const currentYear = new Date().getFullYear().toString();

            const result = await generateStudentID(input);
            
            expect(result).toMatch(currentYear+'-001-000'); // Expects the format to be YYYY-AAA-III
        });

        // Test case for ID overflow
        it('throws an error when the ID overflows', async () => {
            const input = { second: "599", third: "999" };

            await expect(generateStudentID(input)).rejects.toThrow('ID Overflow!');
        });

    });

});

import express from 'express';
import session from 'supertest-session';
import AuthRouter from '../src/routes/AuthRouter';
import StudentsRouter from '../src/routes/StudentsRouter';

describe('StudentsRouter /module/:module_name endpoint', () => {
    // Test case for logged in with correct account type and the information uploaded is not empty
    it('All details inputted were correctly', async () => {
        // This simulates logging in
        const app = express();
        app.use(express.json())
        app.use(AuthRouter)

        const adminSession = session(app);
        const moduleName = "Philosophical Foundations in ECE"

        const response = await adminSession.post('/login')
            .set('Content-Type', 'application/json')
            .send({
                user_id: '2024-900-000', //admin ID
                password: 'password'
            });
        
        // Successful Connection
        expect(response.statusCode).toBe(200);

        const initializePermission = (req, res, next) => {
            if (response.body.account_type == 'admin')
                req.permission = 3;
            else if (response.body.account_type == 'teacher')
                req.permission = 2;
            else if (response.body.account_type == 'student')
                req.permission = 1;
            else
                req.permission = 0; // guest

            next();
        };
        
        app.use(initializePermission);
        app.use(StudentsRouter);

        const responseStudents = await adminSession.get(`/module/${moduleName}`);

        // Successful Connection
        expect(responseStudents.statusCode).toBe(200);
    });

    // Test case for invalid student account type
    it('Invalid account type permission - Student', async () => {
        const app = express();
        app.use(express.json())
        app.use(AuthRouter)

        const studentSession = session(app);
        const moduleName = "Child and Development"

        const response = await studentSession.post('/login')
            .set('Content-Type', 'application/json')
            .send({
                user_id: '2024-000-000', //student ID
                password: 'password'
            });
        
        //successful connection
        expect(response.statusCode).toBe(200);

        const initializePermission = (req, res, next) => {
            if (response.body.account_type == 'admin')
                req.permission = 3;
            else if (response.body.account_type == 'teacher')
                req.permission = 2;
            else if (response.body.account_type == 'student')
                req.permission = 1;
            else
                req.permission = 0; // guest

            next();
        };
        
        app.use(initializePermission);
        app.use(StudentsRouter);

        const responseStudents = await studentSession.get(`/module/${moduleName}`);

        // Unsuccessful Connection due to wrong account type
        expect(responseStudents.statusCode).toBe(403);
        expect(responseStudents.body.error).toBe("You are not authorized to access this");
    });

    // Test case for invalid teacher account type
    it('Invalid account type permission - Teacher', async () => {
        const app = express();
        app.use(express.json())
        app.use(AuthRouter)

        const teacherSession = session(app);
        const moduleName = "Child and Development"

        const response = await teacherSession.post('/login')
            .set('Content-Type', 'application/json')
            .send({
                user_id: '2024-600-000', //teacher ID
                password: 'password'
            });
        
        //successful connection
        expect(response.statusCode).toBe(200);

        const initializePermission = (req, res, next) => {
            if (response.body.account_type == 'admin')
                req.permission = 3;
            else if (response.body.account_type == 'teacher')
                req.permission = 2;
            else if (response.body.account_type == 'student')
                req.permission = 1;
            else
                req.permission = 0; // guest

            next();
        };
        
        app.use(initializePermission);
        app.use(StudentsRouter);

        const responseStudents = await teacherSession.get(`/module/${moduleName}`);

        // Unsuccessful Connection due to wrong account type
        expect(responseStudents.statusCode).toBe(403);
        expect(responseStudents.body.error).toBe("You are not authorized to access this");
    });
});

describe('StudentsRouter / validateStudentReqBody() endpoint', () => {
    // Test case for logged in with correct account type and the information uploaded is not empty
    it('All details inputted were correctly', async () => {
        const app = express();
        app.use(express.json());
        app.use(AuthRouter);
    
        const adminSession = session(app);
    
        // mock student data
        const studentData = {
            student_id: '2024-112-112',
            first_name: 'Emma',
            last_name: 'Miller',
            middle_name: 'Louise',
            address: '789 Cedar Street',
            mobile_number: '09109876543',
            landline: '65432109',
            email: 'emma.miller@example.com',
            birthdate: '1996-12-10',
            birthplace: 'Village',
            nationality: 'American',
            gender: 'FEMALE',
            civil_status: 'MARRIED',
            no_of_children: 2,
            school: 'XYZ College',
            occupation: 'Accountant',
            admin: 'Admin Adminson',
            church: 'City Community Church',
            pastor: 'Pastor Sarah',
            is_partner_school: false,
            gradeschool: 'Riverbank Elementary',
            highschool: 'Mountaintop High',
            college: 'Valleyview University',
            college_course: 'Accounting',
            graduate: 'Skyline Graduate School',
            graduate_course: 'Finance',
            others: 'Other details',
            gradeschool_completed: true,
            highschool_completed: true,
            college_completed: true,
            graduate_completed: true,
            essay: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            emergency_name: 'James Johnson',
            emergency_address: '123 Elm Street',
            emergency_mobile_number: '09123456789',
            password: 'password', // All passwords are 'password'
            status: 'ACTIVE',
            track: 'TEACHER'
        };
    
        const response = await adminSession.post('/login')
            .set('Content-Type', 'application/json')
            .send({
                user_id: '2024-900-000', // admin ID
                password: 'password'
            });
    
        expect(response.statusCode).toBe(200);
    
        const initializePermission = (req, res, next) => {
            if (response.body.account_type == 'admin')
                req.permission = 3;
            else if (response.body.account_type == 'teacher')
                req.permission = 2;
            else if (response.body.account_type == 'student')
                req.permission = 1;
            else
                req.permission = 0; // guest
    
            next();
        };
    
        app.use(initializePermission);
        app.use(StudentsRouter);

    
        const createStudentResponse = await adminSession.post('/')
            .set('Content-Type', 'application/json')
            .send(studentData);
    
        // success
        expect(createStudentResponse.statusCode).toBe(200);
        expect(createStudentResponse.body.message).toBe('Create successful');

        // // Delete mock student
        // const deleteStudentResponse = await adminSession.delete(`/:${studentData.student_id}`);
        // expect(deleteStudentResponse.statusCode).toBe(200);
    });

    // Test case for invalid teacher account type
    it('Invalid account type permission - Teacher', async () => {
        const app = express();
        app.use(express.json());
        app.use(AuthRouter);
    
        const teacherSession = session(app);
    
        // mock student data
        const studentData = {
            first_name: 'John',
            last_name: 'Doe',
            middle_name: 'Middle',
            address: '123 Main St',
            mobile_number: '09123456789',
            landline: '12345678',
            email: 'john.doe@example.com',
            birthdate: '1990-01-01',
            birthplace: 'City',
            nationality: 'Nationality',
            gender: 'MALE',
            civil_status: 'SINGLE',
            no_of_children: 0,
            school: 'University',
            occupation: 'Occupation',
            admin: 'Admin Name',
            church: 'Church Name',
            pastor: 'Pastor Name',
            is_partner_school: true,
            gradeschool: 'Grade School',
            highschool: 'High School',
            college: 'College',
            college_course: 'Course',
            graduate: 'Graduate',
            graduate_course: 'Graduate Course',
            others: 'Others',
            gradeschool_completed: true,
            highschool_completed: true,
            college_completed: true,
            graduate_completed: true,
            essay: 'Essay content',
            emergency_name: 'Emergency Name',
            emergency_address: 'Emergency Address',
            emergency_mobile_number: '09123456789',
            password: 'password',
            status: 'ACTIVE',
            track: 'ADMIN'
        };
    
        const response = await teacherSession.post('/login')
            .set('Content-Type', 'application/json')
            .send({
                user_id: '2024-600-000', // teacher ID
                password: 'password'
            });
    
        expect(response.statusCode).toBe(200);
    
        const initializePermission = (req, res, next) => {
            if (response.body.account_type == 'admin')
                req.permission = 3;
            else if (response.body.account_type == 'teacher')
                req.permission = 2;
            else if (response.body.account_type == 'student')
                req.permission = 1;
            else
                req.permission = 0; // guest
    
            next();
        };
    
        app.use(initializePermission);
        app.use(StudentsRouter);
    
        const createStudentResponse = await teacherSession.post('/')
            .set('Content-Type', 'application/json')
            .send(studentData);
    
        // success
        expect(createStudentResponse.statusCode).toBe(403);
        expect(createStudentResponse.body.error).toBe("You are not authorized to access this");
       
    });

    // Test case for empty content
    it('Empty Content', async () => {
        const app = express();
        app.use(express.json());
        app.use(AuthRouter);
    
        const adminSession = session(app);
    
        // mock student data
        const studentData = {};
    
        const response = await adminSession.post('/login')
            .set('Content-Type', 'application/json')
            .send({
                user_id: '2024-900-000', // admin ID
                password: 'password'
            });
    
        expect(response.statusCode).toBe(200);
    
        const initializePermission = (req, res, next) => {
            if (response.body.account_type == 'admin')
                req.permission = 3;
            else if (response.body.account_type == 'teacher')
                req.permission = 2;
            else if (response.body.account_type == 'student')
                req.permission = 1;
            else
                req.permission = 0; // guest
    
            next();
        };
    
        app.use(initializePermission);
        app.use(StudentsRouter);
    
        const createStudentResponse = await adminSession.post('/')
            .set('Content-Type', 'application/json')
            .send(studentData);
    
        // unsuccessful
        expect(createStudentResponse.statusCode).toBe(400);
    });
});