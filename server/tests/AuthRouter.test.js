/* eslint-disable no-undef */
// Import functions to test
import express from 'express';
import request from 'supertest';
import AuthRouter from '../src/routes/AuthRouter.js';

// Test Suite
// Test AuthorRouter POST
describe('AuthRouter /login endpoint', () => {
    // Test case for a scenario where both id and password is valid
    it('both correct user_id and password', async () => {
        const response = await request(express().use(AuthRouter))
            .post('/login')
            .set('Content-Type', 'application/json') // Set content type
            .send({
                user_id: '2024-600-000',
                password: 'password'
            });
        
        expect(response.statusCode).toBe(200);
    });

     // Test case for a scenario where id is valid but password isn;t
    it('correct user_id, wrong password', async () => {
        const response = await request(express().use(AuthRouter))
            .post('/login')
            .set('Content-Type', 'application/json') // Set content type
            .send({
                user_id: '2024-600-000',
                password: 'asdasd'
            });
        
        expect(response.body.error).toBe("INVALID_CREDENTIALS");
    });
});
