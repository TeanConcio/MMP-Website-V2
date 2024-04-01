/* eslint-disable no-undef */
// Import libraries to test
import express from 'express';
import request from 'supertest';

import AuthRouter from '../src/routes/AuthRouter.js';

// Test Suite
// Test AuthRouter POST
describe('AuthRouter /login endpoint', () => {
    // Test case for a scenario where both id and password is valid
    it('both correct user_id and password', async () => {
        const response = await request(express().use(AuthRouter))
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({
                user_id: '2024-600-000',
                password: 'password'
            });
        
        expect(response.statusCode).toBe(200);
    }, 30000);

     // Test case for a scenario where id is valid but password isn't
    it('correct user_id, wrong password', async () => {
        const response = await request(express().use(AuthRouter))
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({
                user_id: '2024-600-000',
                password: 'asdasd'
            });
        
        expect(response.body.error).toBe("INVALID_CREDENTIALS");
    }, 30000);

    // Test case for a scenario where id and password valid but status is inactive
    it('correct user_id and password, status is not active', async () => {
        const response = await request(express().use(AuthRouter))
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({
                user_id: '2024-000-005',
                password: 'password'
            });
        
        expect(response.body.error).toBe("INACTIVE_ACCOUNT");
    }, 30000);
});
