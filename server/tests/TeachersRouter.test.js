/* eslint-disable no-undef */
// Import functions to test
import { generateTeacherID } from "../src/routes/TeachersRouter.js";

// Test Suite
describe("TeachersRouter Helper Functions", () => {

    // Test generateTeacherID Function
    describe('generateTeacherID Function', () => {

        // Test case for incrementing the ID number within the limit
        it('increment the third parameter', async () => {
            const input = { second: "000", third: "123" };

            const currentYear = new Date().getFullYear().toString();

            const result = await generateTeacherID(input);

            expect(result).toMatch(currentYear+'-000-124'); // Expects the format to be YYYY-AAA-III
          });

        // Test case for incrementing the ID number within the maximum limit
        it('increment second part of ID when third part exceeds 999', async () => {
            const input = { second: "000", third: "999" };

            const currentYear = new Date().getFullYear().toString();

            const result = await generateTeacherID(input);
            
            expect(result).toMatch(currentYear+'-001-000'); // Expects the format to be YYYY-AAA-III
        });

        // Test case for ID overflow
        it('throws an error when the ID overflows', async () => {
            const input = { second: "899", third: "999" };

            await expect(generateTeacherID(input)).rejects.toThrow('ID Overflow!');
        });

    });

});