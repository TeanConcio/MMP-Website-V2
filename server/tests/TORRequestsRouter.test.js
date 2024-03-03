/* eslint-disable no-undef */
// Import functions to test
import {
    generateRequestID
} from "../src/routes/TORRequestsRouter.js";

// Test Suite
describe("TORREquestsRouter Helper Functions", () => {

    // Test generateRequestID function
    describe('generateRequestID Function', () => {

        // Test case for generating request ID when lastRequestIDSegment is null
        it('returns the correct request ID when lastRequestIDSegment is null', async () => {
            const currentYear = '2024';
            const lastRequestIDSegment = -1;

            const result = await generateRequestID(currentYear, lastRequestIDSegment);

            expect(result).toBe(`${currentYear}-00000`);
        });

        // Test case for generating request ID when lastRequestIDSegment is less than 99999
        it('returns the correct request ID when lastRequestIDSegment is less than 99999', async () => {
            const currentYear = '2024';
            const lastRequestIDSegment = 12345;

            const result = await generateRequestID(currentYear, lastRequestIDSegment);

            expect(result).toBe(`${currentYear}-12346`);
        });

        // Test case for handling ID overflow when lastRequestIDSegment exceeds 99999
        it('throws an error for ID overflow when lastRequestIDSegment exceeds 99999', async () => {
            const currentYear = '2024';
            const lastRequestIDSegment = 99999;

            await expect(generateRequestID(currentYear, lastRequestIDSegment)).rejects.toThrowError('ID Overflow!');
        });
        });
});