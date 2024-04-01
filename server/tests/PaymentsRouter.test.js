/* eslint-disable no-undef */
// Import functions to test
import { generateOR } from "../src/routes/PaymentsRouter.js";
// import { db as prisma } from "../src/utils/db.server.js";
// import {jest} from '@jest/globals'

// Test Suite
describe("PaymentsRouter Helper Functions", () => {

    // Test generateOR Function
    describe('generateOR Function', () => {

        // Test case for normal increment of 9-digit segment
        it('increments the 9-digit segment within the limit', async () => {

            const result = await generateOR(1, 999999998);

            expect(result).toBe('1-999999999');
        });

        // Test case for rollover to the next 1-digit segment
        it('increments the 9-digit segment and rolls over to the next 1-digit segment', async () => {

            const result = await generateOR(8, 999999999);

            expect(result).toBe('9-000000000');
        });

        // Test case for exceeding the limits of generateOR function
        it('throws an error when both segments are at their limits', async () => {
            await expect(() => generateOR(9, 999999999)).toThrow('OR Number Overflow');
        });
        
    });

});