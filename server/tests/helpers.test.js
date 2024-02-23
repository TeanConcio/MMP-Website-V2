/* eslint-disable no-undef */
// Import functions to test
import {
    allowed,
    exclude,
    excludeFromArray,
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

    // Test excludeFromArray function
    describe('excludeFromArray function', () => {
        test('Excludes specified keys from each object in the array', () => {
            const inputArray = [
                { a: 1, b: 2, c: 3 },
                { a: 4, b: 5, c: 6 },
                { a: 7, b: 8, c: 9 },
            ];
    
            const keysToExclude = ['b'];
    
            const result = excludeFromArray(inputArray, keysToExclude);
    
            expect(result).toEqual([
                { a: 1, c: 3 },
                { a: 4, c: 6 },
                { a: 7, c: 9 },
            ]);
        });
    
        test('Handles an empty array', () => {
            const inputArray = [];
            const keysToExclude = ['b'];
    
            const result = excludeFromArray(inputArray, keysToExclude);
    
            expect(result).toEqual([]);
        });
    
        test('Handles an empty keys array', () => {
            const inputArray = [
                { a: 1, b: 2, c: 3 },
                { a: 4, b: 5, c: 6 },
            ];
    
            const keysToExclude = [];
    
            const result = excludeFromArray(inputArray, keysToExclude);
    
            expect(result).toEqual(inputArray);
        });
    
        test('Handles keys that do not exist in the objects', () => {
            const inputArray = [
                { a: 1, c: 3 },
                { a: 4, c: 6 },
            ];
    
            const keysToExclude = ['b'];
    
            const result = excludeFromArray(inputArray, keysToExclude);
    
            expect(result).toEqual(inputArray);
        });
    
        test('Does not modify the original array or objects', () => {
            const inputArray = [
                { a: 1, b: 2, c: 3 },
                { a: 4, b: 5, c: 6 },
            ];
    
            const keysToExclude = ['b'];
    
            const result = excludeFromArray(inputArray, keysToExclude);
    
            expect(result).not.toBe(inputArray);
            expect(result[0]).not.toBe(inputArray[0]);
            expect(result[1]).not.toBe(inputArray[1]);
        });
    });
});