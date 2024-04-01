/* eslint-disable no-undef */
// Import libraries to test
import express from 'express';
import session from 'supertest-session';
import AuthRouter from '../src/routes/AuthRouter';
import ModuleDetailsRouter, {module_exists} from '../src/routes/ModuleDetailsRouter';

// Test Suite
// Test ModuleDetailsRouter Endpoint
describe('ModuleDetailsRouter Endpoint Testing', () => {

    // Tests module_exists function
    describe("Test module_exists Functions", () => {
        // Test case for existing module
        test("checks for existing module", async () => {
            const module = "Child and Development";
            const result = await module_exists(module);
            expect(result).toBe(true);
        }, 30000);

        // Test case for non existing module 
        test("checks for non-existing module", async () => {
            const module = "Placeholder";
            const result = await module_exists(module);
            expect(result).toBe(false);
        }, 30000);

        // Test case for empty module name
        test("checks for empty module name", async () => {
            const module = "";
            const result = await module_exists(module);
            expect(result).toBe(false);
        }, 30000);
    });


    // Test ModuleDetailsRouter /all Endpoint
    describe('ModuleDetailsRouter /all Endpoint', () => {
        // Test case for admin
        it('login as admin to view the modules', async () => {
            // Will create each session for each test case
            const app = express();

            app.use(express.json());
            app.use(AuthRouter);
            
            const adminSession = session(app);

            const response = await adminSession.post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    // Admin id
                    user_id: '2024-900-001',
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
            app.use(ModuleDetailsRouter);

            const responseModule = await adminSession.get('/all');

            expect(responseModule.statusCode).toBe(200);
        }, 30000);

        // Test case for student
        it('login as student to view the modules', async () => {
            const app = express();

            app.use(express.json());
            app.use(AuthRouter);

            const studentSession = session(app);

            const response = await studentSession.post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    // student id
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
            app.use(ModuleDetailsRouter);

            const responseModule = await studentSession.get('/all');
            
            expect(responseModule.statusCode).toBe(403);
        }, 30000);

        // Test case for non-existing account
        it('login as non-existing account to view the modules', async () => {
            const app = express();

            app.use(express.json());
            app.use(AuthRouter);

            const invalidSession = session(app);

            const response = await invalidSession.post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    // invalid id
                    user_id: '',
                    password: ''
                });

            // invalid connection
            expect(response.statusCode).toBe(500);

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
            app.use(ModuleDetailsRouter);

            const responseModule = await invalidSession.get('/all');
            
            expect(responseModule.statusCode).toBe(403);
        }, 30000);
    });

    // Test ModuleDetailsRouter /:module_name Endpoint
    describe('ModuleDetailsRouter /:module_name Endpoint', () => {
        // Test case for admin and valid route parameter
        it('login as a correct user with valid route parameter', async () => {

            const app = express();

            app.use(express.json());
            app.use(AuthRouter);
            
            const adminSession = session(app);

            const response = await adminSession.post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    // Admin id
                    user_id: '2024-900-001',
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
            app.use(ModuleDetailsRouter);

            // Valid module_name as a router parameter
            const responseModule = await adminSession.get('/info/Child and Development')

            expect(responseModule.statusCode).toBe(200);
        }, 30000);

        // Test case for invalid user type
        it('login as a invalid user type', async () => {

            const app = express();

            app.use(express.json());
            app.use(AuthRouter);
            
            const studentSession = session(app);

            const response = await studentSession.post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    // student id
                    user_id: '2024-000-001',
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
            app.use(ModuleDetailsRouter);

            // Valid module_name as a router parameter
            const responseModule = await studentSession.get('/info/Child and Development')

            expect(responseModule.statusCode).toBe(403);
        }, 30000);

        // Test case for admin and invalid route parameter
        it('login as a correct user with invalid route parameter', async () => {

            const app = express();

            app.use(express.json());
            app.use(AuthRouter);
            
            const adminSession = session(app);

            const response = await adminSession.post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    // Admin id
                    user_id: '2024-900-001',
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
            app.use(ModuleDetailsRouter);

            // Invalid module_name as a router parameter
            const responseModule = await adminSession.get('/info/x')

            expect(responseModule.statusCode).toBe(404);
        }, 30000);

    });
});