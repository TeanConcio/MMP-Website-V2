/* eslint-disable no-undef */
// Import functions to test
import { generateStudentID } from "../src/routes/StudentsRouter.js";

// Test Suite
describe("StudentsRouter Helper Functions", () => {

    // Test generateStudentID Function
    describe('generateStudentID Function', () => {

        // Test case for incrementing the ID number within the limit
        it('increment the third parameter when less than 999', async () => {
            const input = { second: "000", third: "123" };

            const currentYear = new Date().getFullYear().toString();

            const result = await generateStudentID(input);

            expect(result).toMatch(currentYear+'-000-124'); // Expects the format to be YYYY-AAA-III
          });

        // Test case for incrementing the ID number within the maximum limit
        it('increment second part of ID when third part exceeds 999', async () => {
            const input = { second: "000", third: "999" };

            const currentYear = new Date().getFullYear().toString();

            const result = await generateStudentID(input);
            
            expect(result).toMatch(currentYear+'-001-000'); // Expects the format to be YYYY-AAA-III
        });

        // Test case for ID overflow
        it('throws an error when the ID overflows', async () => {
            const input = { second: "599", third: "999" };

            await expect(generateStudentID(input)).rejects.toThrow('ID Overflow!');
        });

    });

});