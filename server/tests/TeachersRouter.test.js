/* eslint-disable no-undef */
// Import functions to test
import { generateTeacherID } from "../src/routes/TeachersRouter.js";

// Test Suite
describe("TeachersRouter Helper Functions", () => {

    // Test generateTeacherID Function
    describe('generateTeacherID Function', () => {

        // Test case for incrementing the ID number within the limit
        it('increment the third parameter when less than 999', async () => {
            const input = { second: "600", third: "123" };

            const currentYear = new Date().getFullYear().toString();

            const result = await generateTeacherID(input);

            expect(result).toMatch(currentYear+'-600-124'); // Expects the format to be YYYY-AAA-III
          });

        // Test case for incrementing the ID number within the maximum limit
        it('increment second part of ID when third part exceeds 999', async () => {
            const input = { second: "600", third: "999" };

            const currentYear = new Date().getFullYear().toString();

            const result = await generateTeacherID(input);
            
            expect(result).toMatch(currentYear+'-601-000'); // Expects the format to be YYYY-AAA-III
        });

        // Test case for ID overflow for generateTeacherID function
        it('throws an error when the ID overflows for teachers', async () => {
            const input = { second: "899", third: "999" };

            await expect(() => generateTeacherID(input)).toThrow('ID Overflow!');
        });

    });

});

import express from 'express';
import session from 'supertest-session';
import AuthRouter from '../src/routes/AuthRouter';
import TeachersRouter from '../src/routes/TeachersRouter';

function generateRandomEmail() {
    // Define a list of possible characters for the random string part of the email
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8;
    let randomString = '';
    // Generate the random string part by randomly selecting characters from the list
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const email = `${randomString}@example.com`;
    return email;
}

describe('TeachersRouter /all/:status endpoint', () => {
    // Test case for logged in with correct account type and correct status
    it('All details inputted were correctly', async () => {
        // This simulates logging in
        const app = express();
        app.use(express.json())
        app.use(AuthRouter)

        const adminSession = session(app);
        const statusName = "ACTIVE"

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
        app.use(TeachersRouter);

        const responseTeachers = await adminSession.get(`/all/${statusName}`);

        // Successful Connection
        expect(responseTeachers.statusCode).toBe(200);
    });

    // Test case for invalid student account type
    it('Invalid account type permission - Student', async () => {
        const app = express();
        app.use(express.json())
        app.use(AuthRouter)

        const adminSession = session(app);
        const statusName = "FOR_APPROVAL"

        const response = await adminSession.post('/login')
            .set('Content-Type', 'application/json')
            .send({
                user_id: '2024-000-000', //student ID
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
        app.use(TeachersRouter);

        const responseTeachers = await adminSession.get(`/all/${statusName}`);

        // Unsuccessful Connection due to wrong account type
        expect(responseTeachers.statusCode).toBe(403);
        expect(responseTeachers.body.error).toBe("You are not authorized to access this");
    });

    // Test case for invalid teacher account type
    it('Invalid account type permission - Teacher', async () => {
        const app = express();
        app.use(express.json())
        app.use(AuthRouter)

        const adminSession = session(app);
        const statusName = "FOR_APPROVAL"

        const response = await adminSession.post('/login')
            .set('Content-Type', 'application/json')
            .send({
                user_id: '2024-600-000', //teacher ID
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
        app.use(TeachersRouter);

        const responseTeachers = await adminSession.get(`/all/${statusName}`);

        // Unsuccessful Connection due to wrong account type
        expect(responseTeachers.statusCode).toBe(403);
        expect(responseTeachers.body.error).toBe("You are not authorized to access this");
    });
});

describe('TeachersRouter / endpoint', () => {
    // Test case for logged in with correct account type and the information uploaded is not empty
    it('All details inputted were correctly', async () => {
        const app = express();
        app.use(express.json());
        app.use(AuthRouter);
    
        const adminSession = session(app);
    
        // mock teacher data
        const teacherData = {
            first_name: 'John',
            middle_name: 'Robert',
            last_name: 'Doe',
            email: generateRandomEmail(),
            status: 'ACTIVE',
            password: 'password'
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
        app.use(TeachersRouter);

    
        const responseTeachers = await adminSession.post('/')
            .set('Content-Type', 'application/json')
            .send(teacherData);
    
        // success
        expect(responseTeachers.statusCode).toBe(200);
        expect(responseTeachers.body.message).toBe('Create successful');
    });

    // Test case for existing email
    it('Email Already Exists', async () => {
        const app = express();
        app.use(express.json());
        app.use(AuthRouter);
    
        const adminSession = session(app);
    
        // mock teacher data
        const teacherData = {
            teacher_id: '2024-600-001',
            first_name: 'Benjamin',
            middle_name: 'James',
            last_name: 'Johnson',
            email: 'teacher2@cssweng.com',
            status: 'ACTIVE',
            password: '$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'
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
        app.use(TeachersRouter);
       
        const responseTeachers = await adminSession.post('/')
            .set('Content-Type', 'application/json')
            .send(teacherData);
    
        // unsuccessful since it exists
        expect(responseTeachers.statusCode).toBe(500);
    });

    // Test case for empty content
    it('Empty Content', async () => {
        const app = express();
        app.use(express.json());
        app.use(AuthRouter);
    
        const teacherSession = session(app);
    
        // empty teacher data
        const teacherData = {};
    
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
        app.use(TeachersRouter);
    
        const responseTeachers = await teacherSession.post('/')
            .set('Content-Type', 'application/json')
            .send(teacherData);
    
        // success
        expect(responseTeachers.statusCode).toBe(500);
    });
});