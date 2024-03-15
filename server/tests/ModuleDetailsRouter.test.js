/* eslint-disable no-undef */
// Import libraries to test
import express from 'express';
import session from 'supertest-session';
import AuthRouter from '../src/routes/AuthRouter';
import ModuleDetailsRouter from '../src/routes/ModuleDetailsRouter';

// Test Suite
describe('ModuleDetailsRouter /all Endpoint', () => {
    it('login as admin to view the modules', async () => {
        // Create an Express app instance
        const app = express();

        // Mount AuthRouter on the app
        app.use(express.json());
        app.use(AuthRouter);
        
        const adminSession = session(app); // Create a new session for admin


        // Make a request to log in and establish the session
        const response = await adminSession.post('/login')
            .set('Content-Type', 'application/json')
            .send({
                user_id: '2024-900-001', // Admin id
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
        //Successful Connection
        expect(responseModule.statusCode).toBe(200);
    });

    it('login as admin to view the modules', async () => {
        // Create an Express app instance
        const app = express();

        // Mount AuthRouter on the app
        app.use(express.json());
        app.use(AuthRouter);

        const adminSession = session(app); // Create a new session for admin

        // Make a request to log in and establish the session
        const response = await adminSession.post('/login')
            .set('Content-Type', 'application/json')
            .send({
                user_id: '2024-000-000', // Admin id
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
        
        //Successful Connection
        expect(responseModule.statusCode).toBe(403);
    });
});
