/* eslint-disable no-undef */
// Import functions to test
import {
    allowed,
    // exclude,
    // excludeFromArray,
    // generatePasswordHash,
    // getLatestIDSegments,
    // generateFinancePKSegments,
    // expformatEnum
} from "../src/utils/helpers";



// Test Suite
describe("Test Helper Functions", () => {

    // Test allowed function
    test("allowed - Test if allows access", () => {
        expect(allowed(0, [0, 2, 3])).toBe(true);
        expect(allowed(1, [0, 1, 3])).toBe(true);
        expect(allowed(2, [0, 1, 2])).toBe(true);
        expect(allowed(3, [1, 2, 3])).toBe(true);
    });
});