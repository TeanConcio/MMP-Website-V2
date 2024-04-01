/* eslint-disable no-undef */
// Import functions to test
import {
    exists
} from "../src/routes/ModulesRouter.js";

// Test Suite
// Tests exists function
describe("Test exists Functions", () => {
    // Test case for existing module name and school year
    test("existing module name and school year", async () => {
        const module = "Child and Development";
        const year = 2023;
        const result = await exists(module, year);
        expect(result).toBe(true);
    }, 30000);

    // Test case for existing module name but wrong school year
    test("existing module name, wrong school year", async () => {
        const module = "Child and Development";
        const year = 2000;
        const result = await exists(module, year);
        expect(result).toBe(false);
    }, 30000);

    // Test case for both wrong module name and school year
    test("both wrong module name and school year", async () => {
        const module = "placeholder";
        const year = 2000;
        const result = await exists(module, year);
        expect(result).toBe(false);
    }, 30000);
});