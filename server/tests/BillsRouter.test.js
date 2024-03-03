/* eslint-disable no-undef */
// Import functions to test
import {
    generateBillNo
} from "../src/routes/BillsRouter.js";

// Test Suite
describe("BillsRouter Helper Functions", () => {

    // Test GenerateBillno Function
    describe('generateBillNo Function', () => {
        // Test case for normal increment of 9-digit segment
        it('increment the 9-digit segment within the limit', async () => {
          const castedSegments = [1, 999999998];

          const result = await generateBillNo(castedSegments);

          expect(result).toBe('1-999999999');
        });
        
        // Test case for rollover to the next 1-digit segment
        it('increment the 9-digit segment and rollover to the next 1-digit segment', async () => {
          const castedSegments = [8, 999999999];

          const result = await generateBillNo(castedSegments);

          expect(result).toBe('9-000000000');
        });
        
        // Test case for exceeding the limits
        it('throw an error when both segments are at their limits', async () => {
          const castedSegments = [9, 999999999];

          await expect(generateBillNo(castedSegments)).rejects.toThrow('Bill Number Overflow');
        });
    });
});