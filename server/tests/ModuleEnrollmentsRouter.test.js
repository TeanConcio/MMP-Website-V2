/* eslint-disable no-undef */
// Import libraries to test
import express from 'express';
import session from 'supertest-session';
import AuthRouter from '../src/routes/AuthRouter.js';
import ModuleEnrollmentsRouter from '../src/routes/ModuleEnrollmentsRouter.js';

const app = express();
app.use(express.json())
app.use(AuthRouter)

// Test Suite
// Test ModuleEnrollmentsRouter GET
describe('ModuleEnrollmentsRouter /active/:student_id endpoint', () => {

    // Test case for unauthorized access
    it('should return 403 error for unauthorized access', async () => {
        const adminSession = session(app);

        const response = await adminSession.post('/login')
            .set('Content-Type', 'application/json')
            .send({
                user_id: '2024-900-001', //teacher ID
                password: 'password'
            });
        
        //successful connection
        expect(response.statusCode).toBe(200);
    });

    // // Test case for unauthorized access
    // it('should return 403 error for unauthorized access', async () => {
    //     const studentId = '2024-900-200'; 

    //     const response = await request(express().use(ModuleEnrollmentsRouter))
    //         .get(`/active/${studentId}`)
    //         .set('Content-Type', 'application/json')
    //         .set({ permission: 2 });

    //     expect(response.statusCode).toBe(403);
    //     expect(response.body).toEqual({ error: 'You are not authorized to access this' });
    // });

    // Test case for invalid student ID
    // it('should return 403 error for invalid student ID', async () => {
    //     const studentId = '2024-100-600'; 
        
    //     const req = {
    //         permission: 1
    //     };

    //     const response = await request(express().use(ModuleEnrollmentsRouter))
    //         .get(`/active/${studentId}`)
    //         .set('Content-Type', 'application/json')
    //         .set(req);

    //     expect(response.statusCode).toBe(403);
    //     expect(response.body).toEqual({ error: 'Invalid user ID' });
    // });

    // Test case for unauthorized access
    // it('should return 403 error for unauthorized access', async () => {
    //     const studentId = '2024-100-100';


    //     const response = await request(express().use(ModuleEnrollmentsRouter))
    //     .get(`/active/${studentId}`)
    //     .set('Content-Type', 'application/json') // Set content type
    //     .send({
    //         user_id: '2024-100-100',
    //         permission: 2
    //     });

    //     expect(response.statusCode).toBe(403);
    //     expect(response.body).toEqual({ error: 'You are not authorized to access this' });
    // });

    // Use actual db stuff

    // const mockEnrollments = [
    //     {
    //         grade: 85,
    //         no_of_absences: 2,
    //         module: {
    //             school_year: 2024,
    //             session_1: 'Mathematics',
    //             session_2: 'English',
    //             teacher: {
    //                 first_name: 'John',
    //                 last_name: 'Doe',
    //             },
    //             details: {
    //                 module_name: 'Algebra',
    //                 program: 'Advanced Mathematics',
    //             },
    //         },
    //     },
    // ];
    
    // // Test case for a scenario where a valid request is made with proper authentication and the correct student_id
    // it('should return enrollments for the specified student', async () => {
    //     const studentId = '2024-600-000'; // Replace with a valid student ID
    //     const permissions = [1, 3]; // Replace with appropriate permissions

    //     const response = await request(express().use(ModuleEnrollmentsRouter))
    //         .get(`/active/${studentId}`)
    //         .set('Content-Type', 'application/json')
    //         .set('permission', permissions.join(','));

    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toEqual(mockEnrollments);
    // });
});
