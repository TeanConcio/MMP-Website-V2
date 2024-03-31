/* eslint-disable no-undef */
// Import libraries to test
import express from 'express';
import session from 'supertest-session';
import AuthRouter from '../src/routes/AuthRouter.js';
import ModuleEnrollmentsRouter from '../src/routes/ModuleEnrollmentsRouter.js';

// Test Suite
// Test ModuleEnrollmentsRouter EndPoint
describe('ModuleEnrollmentsRouter Endpoint Testing', () => {
    // Test ModuleEnrollmentsRouter /active/:student_id Endpoint
    describe('ModuleEnrollmentsRouter /active/:student_id endpoint', () => {
        it('correct user_id, session_id and password', async () => {
            // Will create each session for each test case
            const app = express();

            app.use(express.json());
            app.use(AuthRouter);
            
            const studentSession = session(app);

            const response = await studentSession.post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    // Student id
                    user_id: '2024-000-000',
                    password: 'password'
                });

            // Successful connection
            expect(response.statusCode).toBe(200);

            // Middleware to determine the req.permission of ModuleDetailsRouter from currently logged in user
            const initializePermission = (req, res, next) => {
                if (response.body.account_type == 'admin')
                    req.permission = 3;
                else if (response.body.account_type == 'teacher')
                    req.permission = 2;
                else 
                    req.permission = 1;
                
                req.user = {
                    user_id: "2024-000-000"
                };

                next();
            };
            
            app.use(initializePermission);
            app.use(ModuleEnrollmentsRouter);

            const responseModule = await studentSession.get('/active/2024-000-000');

            expect(responseModule.statusCode).toBe(200); 
        });
    });

    // Test incorrect session type
    it('incorrect session_id type', async () => {
        const app = express();

        app.use(express.json());
        app.use(AuthRouter);
        
        const teacherSession = session(app);

        const response = await teacherSession.post('/login')
            .set('Content-Type', 'application/json')
            .send({
                // Student id
                user_id: '2024-600-000',
                password: 'password'
            });

        // Successful connection
        expect(response.statusCode).toBe(200);

        // Middleware to determine the req.permission of ModuleDetailsRouter from currently logged in user
        const initializePermission = (req, res, next) => {
            if (response.body.account_type == 'admin')
                req.permission = 3;
            else if (response.body.account_type == 'teacher')
                req.permission = 2;
            else 
                req.permission = 1;
            
            req.user = {
                user_id: "2024-600-000"
            };

            next();
        };
        
        app.use(initializePermission);
        app.use(ModuleEnrollmentsRouter);

        const responseModule = await teacherSession.get('/active/2024-000-000');

        expect(responseModule.body.error).toBe("You are not authorized to access this"); 
    });

    // Test session_id not matching given id
    it('session_id not matching given id', async () => {
        const app = express();

            app.use(express.json());
            app.use(AuthRouter);
            
            const studentSession = session(app);

            const response = await studentSession.post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    // Student id
                    user_id: '2024-000-000',
                    password: 'password'
                });

            // Successful connection
            expect(response.statusCode).toBe(200);

            // Middleware to determine the req.permission of ModuleDetailsRouter from currently logged in user
            const initializePermission = (req, res, next) => {
                if (response.body.account_type == 'admin')
                    req.permission = 3;
                else if (response.body.account_type == 'teacher')
                    req.permission = 2;
                else 
                    req.permission = 1;
                
                // manually set user_id to not match
                req.user = {
                    user_id: "2024-500-000"
                };

                next();
            };
            
            app.use(initializePermission);
            app.use(ModuleEnrollmentsRouter);

            const responseModule = await studentSession.get('/active/2024-000-000');

            expect(responseModule.body.error).toBe('Invalid user ID');  
    });

    describe('ModuleEnrollmentsRouter /enrollments/:module_name/:school_year endpoint', () => {
        // Test login as a correct user with valid route parameters
        it('login as a correct user with valid route parameter', async () => {

            const app = express();

            app.use(express.json());
            app.use(AuthRouter);
            
            const adminSession = session(app);

            const response = await adminSession.post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    // Admin id
                    user_id: '2024-900-000',
                    password: 'password'
                });

            // Successful connection
            expect(response.statusCode).toBe(200);

            // Middleware to determine the req.permission of ModuleDetailsRouter from currently logged in user
            const initializePermission = (req, res, next) => {
                if (response.body.account_type == 'admin')
                    req.permission = 3;
                else if (response.body.account_type == 'teacher')
                    req.permission = 2;
                else 
                    req.permission = 1;
                
                next();
            };
            
            app.use(initializePermission);
            app.use(ModuleEnrollmentsRouter);

            // Valid module_name as a router parameter
            const responseModule = await adminSession.get('/enrollments/Assessment of Learning and Development/2024')

            expect(responseModule.statusCode).toBe(200);
        });

        // Test invalid account type permission
        it('invalid account type permission', async () => {

            const app = express();

            app.use(express.json());
            app.use(AuthRouter);
            
            const studentSession = session(app);

            const response = await studentSession.post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    // Admin id
                    user_id: '2024-000-000',
                    password: 'password'
                });

            // Successful connection
            expect(response.statusCode).toBe(200);

            // Middleware to determine the req.permission of ModuleDetailsRouter from currently logged in user
            const initializePermission = (req, res, next) => {
                if (response.body.account_type == 'admin')
                    req.permission = 3;
                else if (response.body.account_type == 'teacher')
                    req.permission = 2;
                else 
                    req.permission = 1;
                
                next();
            };
            
            app.use(initializePermission);
            app.use(ModuleEnrollmentsRouter);

            // Valid module_name as a router parameter
            const responseModule = await studentSession.get('/enrollments/Assessment of Learning and Development/2024')

            expect(responseModule.body.error).toBe("You are not authorized to access this");
        });

    // Test empty route parameters
    it('empty route parameters', async () => {

        const app = express();

        app.use(express.json());
        app.use(AuthRouter);
        
        const adminSession = session(app);

        const response = await adminSession.post('/login')
            .set('Content-Type', 'application/json')
            .send({
                // Admin id
                user_id: '2024-900-000',
                password: 'password'
            });

        // Successful connection
        expect(response.statusCode).toBe(200);

        // Middleware to determine the req.permission of ModuleDetailsRouter from currently logged in user
        const initializePermission = (req, res, next) => {
            if (response.body.account_type == 'admin')
                req.permission = 3;
            else if (response.body.account_type == 'teacher')
                req.permission = 2;
            else 
                req.permission = 1;
            
            next();
        };
        
        app.use(initializePermission);
        app.use(ModuleEnrollmentsRouter);

        // Valid module_name as a router parameter
        const responseModule = await adminSession.get('/enrollments/')

        expect(responseModule.statusCode).toBe(404);
        });

    });
});