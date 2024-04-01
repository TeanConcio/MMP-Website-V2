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

            await expect(() => generateStudentID(input)).toThrow('ID Overflow!');
        });

    });

});

import express from 'express';
import session from 'supertest-session';
import AuthRouter from '../src/routes/AuthRouter';
import StudentsRouter from '../src/routes/StudentsRouter';

// function generateRandomEmail() {
//     // Define a list of possible characters for the random string part of the email
//     const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
//     const length = 8;
//     let randomString = '';
//     // Generate the random string part by randomly selecting characters from the list
//     for (let i = 0; i < length; i++) {
//         randomString += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     const email = `${randomString}@example.com`;
//     return email;
// }

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
    }, 30000);

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
    }, 30000);

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
    }, 30000);
});

describe('StudentsRouter / endpoint', () => {
    // Test case for logged in with correct account type and the information uploaded is not empty
    it('All details inputted were correctly', async () => {
        const app = express();
        app.use(express.json());
        app.use(AuthRouter);
    
        const adminSession = session(app);
    
        // mock student data
        const studentData = {
            first_name: 'Sophie',
            last_name: 'Johnson',
            middle_name: 'Anne',
            address: '123 Maple Street',
            mobile_number: '09123456789',
            landline: '98765432',
            email: "sophiejohnson@email.com",
            birthdate: '2000-03-15',
            birthplace: 'City',
            nationality: 'American',
            gender: 'FEMALE',
            civil_status: 'SINGLE',
            no_of_children: 0,
            school: 'XYZ University',
            occupation: 'Student',
            admin: 'Admin User',
            is_partner_school: true,
            gradeschool: 'Sunrise Elementary',
            highschool: 'Sunset High',
            college: 'Starlight College',
            graduate: 'Moonrise Graduate School',
            others: 'Additional information',
            gradeschool_completed: true,
            highschool_completed: true,
            college_completed: true,
            graduate_completed: true,
            essay: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            church: 'Community Church',
            pastor: 'Pastor David',
            graduate_course: 'Computer Science',
            college_course: 'Information Technology',
            emergency_name: 'John Smith',
            emergency_address: '456 Oak Street',
            emergency_mobile_number: '09123456789',
            password: 'password',
            status: 'ACTIVE',
            track: 'ADMIN'
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

        // Delete the student created
        const createdStudentID = createStudentResponse.body.student.student_id;
        const deleteStudentResponse = await adminSession.delete(`/${createdStudentID}`);
        expect(deleteStudentResponse.statusCode).toBe(200);
        expect(deleteStudentResponse.body.message).toBe("Student " + createdStudentID + " has been successfully deleted from the database");
    }, 30000);

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
    }, 30000);

    // Test case for existing email
    it('Existing Email', async () => {
        const app = express();
        app.use(express.json());
        app.use(AuthRouter);
    
        const adminSession = session(app);
    
        // existing student email
        const studentData = {
            user_id: '2024-000-000',
            first_name: 'Samuel',
            middle_name: 'Joseph',
            last_name: 'Lee',
            address: 'Address',
            mobile_number: '09123456789',
            landline: '01234567',
            email: 'student1@cssweng.com',
            birthdate: '2000-03-15', 
            birthplace: 'Birthplace',
            nationality: 'Nationality',
            gender: 'MALE',
            civil_status: 'SINGLE',
            no_of_children: 0,
            school: 'School',
            occupation: 'Occupation',
            admin: 'Admin',
            church: 'Church',
            pastor: 'Pastor',
            is_partner_school: false,
            gradeschool: 'Gradeschool',
            highschool: 'Highschool',
            college: 'College',
            graduate: 'BS Biology',
            graduate_course: 'MS Biology',
            others: 'Others',
            gradeschool_completed: true,
            highschool_completed: true,
            college_completed: true,
            graduate_completed: true,
            essay: 'Essay',
            emergency_name: 'Emergency Name',
            emergency_address: 'Emergency Address',
            emergency_mobile_number: '09123456789',
            password: '$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m', // Assuming this is a hashed password
            status: 'ACTIVE',
            track: 'BOTH'
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
    
        // unsuccessful
        expect(createStudentResponse.statusCode).toBe(500);
        expect(createStudentResponse.body.error).toBe("Email already exists");
    }, 30000);
});