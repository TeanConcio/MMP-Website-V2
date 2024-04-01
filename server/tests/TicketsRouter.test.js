/* eslint-disable no-undef */
// Import functions to test
import express from 'express';
import session from 'supertest-session';
import {
    generateTicketID
} from "../src/routes/TicketsRouter.js";
import AuthRouter from '../src/routes/AuthRouter';
import TicketsRouter from '../src/routes/TicketsRouter.js';

let ticket_id;

// Test Suite
describe("TicketsRouter Helper Functions", () => {

    // Test generateTicketID Function
    describe('generateTicketID Function', () => {

        // Test case to ensure the function generates a new ticket ID with an incremented segment
        it('generate a new ticket ID with incremented segment', async () => {
            const currentYear = '2024';
            const lastTicketIDSegment = 99998;
    
            const result = await generateTicketID(currentYear, lastTicketIDSegment);

            expect(result).toBe('2024-99999'); 
        });
        
        // Test case to ensure the function generates a new ticket ID when last segment is null
        it('handle the case when the last ticket ID segment is null', async () => {
            const currentYear = '2024';
            const lastTicketIDSegment = -1;
    
            const result = await generateTicketID(currentYear, lastTicketIDSegment);
    
            expect(result).toBe('2024-00000');
        });

        // Test case for ID overflow when lastTicketIDSegment is within the limit
        it('throws an error when lastTicketIDSegment exceeds 99999', async () => {
            const currentYear = '2024';
            const lastTicketIDSegment = 99999;

            await expect(() => generateTicketID(currentYear, lastTicketIDSegment)).toThrow('ID Overflow!');
        });

    });

});
// Test TicketsRouter Endpoint
describe("TicketsRouter Endpoint", () => {
    // Test TicketsRouter /get Endpoint
    describe("TicketsRouter /:ticket_id Endpoint", () => {

        // Test case for having the permission with correct ticket id
        it('have the permission, correct ticket id', async () => {
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

            const ticket = {
                first_name: "Jonathan",
                last_name: "Mark",
                email: "jmark@example.com",
                mobile_number: "1234567890",
                title: "Ticket Title",
                description: "Ticket Description"
            };
            
            app.use(initializePermission);
            app.use(TicketsRouter);

            // if there is a 2024-00000 ticket (the first ticket which will be created to test), delete it
            //const deleteTicket = await adminSession.delete(`/2024-00000`);
            
            // Create ticket for testing
            let responseModule = await adminSession.post('/')
            .set('Content-Type', 'application/json')
            .send(ticket);

            ticket_id  = responseModule.body.ticket_id;
            
            responseModule = await adminSession.get(`/${ticket_id}`);

            expect(responseModule.statusCode).toBe(200);
            
        }, 30000);

        // Test case for not having the permission with correct ticket id
        it('invalid user permission', async () => {
            const app = express();

            app.use(express.json());
            app.use(AuthRouter);
            
            const adminSession = session(app);

            const response = await adminSession.post('/login')
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
            app.use(TicketsRouter);

            const responseModule = await adminSession.get(`/${ticket_id}`)

            expect(responseModule.body.error).toBe("You are not authorized to access this");
        }, 30000);

        // Test case for having the permission with incorrect ticket id
        it('have the permission, incorrect ticket id', async () => {
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
            app.use(TicketsRouter);

            const responseModule = await adminSession.get('/2024-012345')

            expect(responseModule.body.error).toBe("Ticket does not exist");

            const deleteTicket = await adminSession.delete(`/${ticket_id}`);

            // Delete the ticket create for testing at the end
            expect(deleteTicket.statusCode).toBe(200);
        }, 30000);
        
    });

    // Test TicketsRouter /post Endpoint
    describe("TicketsRouter / Endpoint", () => {
        // Test case for having the permission with a valid ticket
        it('have the permission, valid ticket data', async () => {
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

            const ticket = {
                first_name: "Jonathan",
                last_name: "Mark",
                email: "jmark@example.com",
                mobile_number: "1234567890",
                title: "Ticket Title",
                description: "Ticket Description"
            };
            
            app.use(initializePermission);
            app.use(TicketsRouter);

            // Create ticket for testing
            let responseModule = await adminSession.post('/')
            .set('Content-Type', 'application/json')
            .send(ticket);

            ticket_id  = responseModule.body.ticket_id;

            responseModule = await adminSession.get(`/${ticket_id}`);

            expect(responseModule.statusCode).toBe(200);

            const deleteTicket = await adminSession.delete(`/${ticket_id}`);

            // Delete the ticket create for testing at the end
            expect(deleteTicket.statusCode).toBe(200);

        }, 30000);

        // Test case for not having the permission
        it('dont have the permission', async () => {
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
                    // make invalid permission for admin for this test case
                    req.permission = 8;
                else if (response.body.account_type == 'teacher')
                    req.permission = 2;
                else 
                    req.permission = 1;

                next();
            };

            const ticket = {
                first_name: "Jonathan",
                last_name: "Mark",
                email: "jmark@example.com",
                mobile_number: "1234567890",
                title: "Ticket Title",
                description: "Ticket Description"
            };
            
            app.use(initializePermission);
            app.use(TicketsRouter);

            // Create ticket for testing
            let responseModule = await adminSession.post('/')
            .set('Content-Type', 'application/json')
            .send(ticket);

            ticket_id  = responseModule.body.ticket_id;
            
            responseModule = await adminSession.get(`/${ticket_id}`);

            expect(responseModule.body.error).toBe("You are not authorized to access this");
        }, 30000);
    });

    // Test TicketsRouter /patch Endpoint
    describe("TicketsRouter /:ticket_id Endpoint", () => {
        // Test case for having the permission with a valid ticket
        it('have the permission, valid ticket data', async () => {
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

            const ticket = {
                first_name: "Jonathan",
                last_name: "Mark",
                email: "jmark@example.com",
                mobile_number: "1234567890",
                title: "Ticket Title",
                description: "Ticket Description"
            };
            
            app.use(initializePermission);
            app.use(TicketsRouter);

            // Create ticket for testing
            let responseModule = await adminSession.post('/')
            .set('Content-Type', 'application/json')
            .send(ticket);

            ticket_id  = responseModule.body.ticket_id;

            responseModule = await adminSession.patch(`/${ticket_id}`)
            .set('Content-Type', 'application/json')
            .send({first_name: "Jake"});

            expect(responseModule.statusCode).toBe(200);

            const deleteTicket = await adminSession.delete(`/${ticket_id}`);

            // Delete the ticket create for testing at the end
            expect(deleteTicket.statusCode).toBe(200);

        }, 30000);

        // Test case for not having the permission with a valid ticket
        it('dont have the permission, valid ticket id', async () => {
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
                    req.permission = 8;
                else if (response.body.account_type == 'teacher')
                    req.permission = 2;
                else 
                    req.permission = 1;

                next();
            };

            const ticket = {
                first_name: "Jonathan",
                last_name: "Mark",
                email: "jmark@example.com",
                mobile_number: "1234567890",
                title: "Ticket Title",
                description: "Ticket Description"
            };
            
            app.use(initializePermission);
            app.use(TicketsRouter);

            // Create ticket for testing
            let responseModule = await adminSession.post('/')
            .set('Content-Type', 'application/json')
            .send(ticket);

            ticket_id  = responseModule.body.ticket_id;

            responseModule = await adminSession.patch(`/${ticket_id}`)
            .set('Content-Type', 'application/json')
            .send({first_name: "Jake"});

            expect(responseModule.body.error).toBe("You are not authorized to access this");

        }, 30000);

        // test case for having the permission with an invalid ticket
        it('have the permission, invalid ticket id', async () => {
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
            app.use(TicketsRouter);

            const responseModule = await adminSession.patch(`/2024-50000`)
            .set('Content-Type', 'application/json')
            .send({first_name: "Jake"});

            expect(responseModule.body.error).toBe("Ticket does not exist");

        }, 30000);
        
    });
});