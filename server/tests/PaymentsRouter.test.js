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
            const castedSegments = [1, 999999998];

            const result = await generateOR(castedSegments);

            expect(result).toBe('1-999999999');
        });

        // Test case for rollover to the next 1-digit segment
        it('increments the 9-digit segment and rolls over to the next 1-digit segment', async () => {
            const castedSegments = [8, 999999999];

            const result = await generateOR(castedSegments);

            expect(result).toBe('9-000000000');
        });

        // Test case for exceeding the limits
        it('throws an error when both segments are at their limits', async () => {
            const castedSegments = [9, 999999999];

            await expect(generateOR(castedSegments)).rejects.toThrow('OR Number Overflow');
        });


        // jest.spyOn(prisma.payments, "findMany").mockResolvedValue([]);

        // // See if it matches the OR number format: A-XXXXXXXXX
        // it("generates a new OR number with incremented segment", async () => {
        //     const result = await generateOR();
        //     expect(result).toMatch(/^\d-\d{9}$/); 
        // });

        // // See if it handles having no existing OR numbers
        // it("handles the case when there are no existing OR numbers", async () => {
        //     jest.spyOn(prisma.payments, "findMany").mockResolvedValue([]);

        //     const result = await generateOR();
        //     expect(result).toBe("1-000000000");
        // });

        // // See if it overflows
        // it("throws an error for OR number overflow", async () => {
        //     jest.spyOn(prisma.payments, "findMany").mockResolvedValue([
        //         { or_no: "1-999999999" }, 
        //         { or_no: "9-999999999" }, 
        //     ]);

        //     await expect(generateOR()).rejects.toThrow("OR Number Overflow");
        // });
    });

});