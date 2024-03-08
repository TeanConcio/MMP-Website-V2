/* eslint-disable no-undef */
// Import functions to test
import { generateStudentID } from "../src/routes/StudentsRouter.js";

// Test Suite
describe("StudentsRouter Helper Functions", () => {

    // Test generateStudentID Function
    describe('generateStudentID Function', () => {

        // Test case for incrementing the ID number within the limit
        it('increments the ID number within the limit', async () => {
            const input = { second: "100", third: "123" };

            const result = await generateStudentID(input);

            expect(result).toMatch(/^\d{4}-\d{3}-\d{3}$/); // Matches the format YYYY-AAA-III
        });

        // Test case for incrementing the ID number within the maximum limit
        it('increments the ID number within the limit', async () => {
            const input = { second: "100", third: "998" };

            const result = await generateStudentID(input);

            expect(result).toMatch(/^\d{4}-\d{3}-\d{3}$/); // Matches the format YYYY-AAA-III
        });

        // Test case for ID overflow
        it('throws an error when the ID overflows', async () => {
            const input = { second: "599", third: "999" };

            await expect(generateStudentID(input)).rejects.toThrow('ID Overflow!');
        });

    });

});