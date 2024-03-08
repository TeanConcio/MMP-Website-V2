/* eslint-disable no-undef */
// Import functions to test
import { generateTeacherID } from "../src/routes/TeachersRouter.js";

// Test Suite
describe("TeachersRouter Helper Functions", () => {

    // Test generateTeacherID Function
    describe('generateTeacherID Function', () => {

        // Test case for incrementing the ID number within the limit
        it('increments the ID number within the limit', async () => {
            const input = { second: "700", third: "123" };

            const result = await generateTeacherID(input);

            expect(result).toMatch(/^\d{4}-\d{3}-\d{3}$/); // Matches the format YYYY-AAA-III
        });

        // Test case for incrementing the ID number within the maximum limit
        it('increments the ID number within the limit', async () => {
            const input = { second: "700", third: "998" };

            const result = await generateTeacherID(input);

            expect(result).toMatch(/^\d{4}-\d{3}-\d{3}$/); // Matches the format YYYY-AAA-III
        });

        // Test case for ID overflow
        it('throws an error when the ID overflows', async () => {
            const input = { second: "899", third: "999" };

            await expect(generateTeacherID(input)).rejects.toThrow('ID Overflow!');
        });

    });

});