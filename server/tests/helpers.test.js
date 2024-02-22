/* eslint-disable no-undef */
// Import functions to test
import {
    allowed,
    exclude,
    //excludeFromArray,
    //generatePasswordHash,
    //getLatestIDSegments,
    //generateFinancePKSegments,
    //expformatEnum
} from "../src/utils/helpers";



// Test Suite
describe("Test Helper Functions", () => {

    // Test allowed function
    describe("allowed function", () => {
        test("allows access for valid access codes", () => {
            expect(allowed(0, [0, 2, 3])).toBe(true);
            expect(allowed(1, [0, 1, 3])).toBe(true);
            expect(allowed(2, [0, 1, 2])).toBe(true);
            expect(allowed(3, [1, 2, 3])).toBe(true);
        });

        test("denies access for invalid access codes", () => {
            expect(allowed(4, [0, 2, 3])).toBe(false);
            expect(allowed(1, [0, 2, 3])).toBe(false);
            expect(allowed(0, [1, 2, 3])).toBe(false);
            expect(allowed(3, [0, 1, 2])).toBe(false);
        });
    });

    // Test exclude function
    describe("exclude function", () => {
        test('excludes specified keys from object', () => {
            const inputObject = { a: 1, b: 2, c: 3, d: 4 };
            const keysToExclude = ['b', 'd'];
            const result = exclude(inputObject, keysToExclude);

            expect(result).toEqual({ a: 1, c: 3 });
        });

        test('handles an empty object', () => {
            const inputObject = {};
            const keysToExclude = ['b', 'd'];
            const result = exclude(inputObject, keysToExclude);

            expect(result).toEqual({});
        });

        test('handles an empty keys array', () => {
            const inputObject = { a: 1, b: 2, c: 3, d: 4 };
            const keysToExclude = [];
            const result = exclude(inputObject, keysToExclude);

            expect(result).toEqual(inputObject);
        });

        test('handles keys that do not exist in the object', () => {
            const inputObject = { a: 1, b: 2, c: 3, d: 4 };
            const keysToExclude = ['e', 'f'];
            const result = exclude(inputObject, keysToExclude);

            expect(result).toEqual(inputObject);
        });

        test('does not modify the original object', () => {
            const inputObject = { a: 1, b: 2, c: 3, d: 4 };
            const keysToExclude = ['b', 'd'];
            const result = exclude(inputObject, keysToExclude);

            expect(result).not.toBe(inputObject);
        });
    });
});