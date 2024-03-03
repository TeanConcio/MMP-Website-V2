/* eslint-disable no-undef */
// Import functions to test
import {
    //checkIDExists,
    //checkEmailExists,
    generateAdminID
} from "../src/routes/AdminsRouter.js";



// Test Suite
describe("AdminRouter Helper Functions", () => {

    // Test getLatestIDSegments function
    describe('generateAdminID Function', () => {
        // Test case for a scenario where third is less than 999
        it('increment third when less than 999', async () => {
            const currentYear = '2024';
            const second = '123';
            const third = '998';

            const result = await generateAdminID(currentYear, second, third);

            expect(result).toBe('2024-123-999');
        });

        // Test case for a scenario where second is less than 999
        it('increment second when less than 999', async () => {
            const currentYear = '2024';
            const second = '998';
            const third = '999';

            const result = await generateAdminID(currentYear, second, third);

            expect(result).toBe('2024-999-000');
        });

        // Test case for an overflow scenario
        it('throw an error for ID overflow', async () => {
            const currentYear = '2024';
            const second = '999';
            const third = '999';

            await expect(generateAdminID(currentYear, second, third)).rejects.toThrowError('ID Overflow!');
        });
    });
});

/*
import {db as prisma} from '../src/utils/db.server.js';
import {jest} from '@jest/globals'

jest.mock('../src/utils/db.server', () => ({
    db: {
        Admins: {
            findUnique: jest.fn(),
        },
    },
}));

describe('Test AdmindsRouter Helper Functions', () => {

    describe('checkIDExists Function', () => {
        // Clear mock calls between test cases
        afterEach(() => {
            jest.clearAllMocks();
        });

        it("return true if admin entry is found for a specific admin ID", async () => {
            // Set up mock data and behavior for findUnique
            const existingAdminId = "2024-900-000";

            // Mocking the findUnique method to return a mock admin data for the specific admin ID
            jest.spyOn(prisma.Admins, 'findUnique').mockResolvedValue({
                admin_id: existingAdminId
            });

            const result = await checkIDExists(existingAdminId);

            // Assertions
            expect(result).toBe(true);
        });


        it("return false if admin entry is not found for a specific admin ID", async () => {
            // Set up mock data and behavior for findUnique
            const nonExistingAdminId = "2024-999-123";

            // Mocking the findUnique method to return null for any admin ID
            jest.spyOn(prisma.Admins, 'findUnique').mockResolvedValue(null);

            const result = await checkIDExists(nonExistingAdminId);

            // Assertions
            expect(result).toBe(false);
        });
    });

    describe('checkEmailExists Function', () => {
        // Clean up mocks after each test case
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        it('return true if email entry is found for a specific email', async () => {
            // Set up mock data and behavior for findUnique
            const existingEmail = 'john.doe@example.com';
            jest.spyOn(prisma.Admins, 'findUnique').mockResolvedValue({
                email: existingEmail,
            });
    
            // Call the function with the specific email
            const result = await checkEmailExists(existingEmail);
    
            // Assertions
            expect(result).toBe(true);
        });

        it('return false if email entry is not found for a specific email', async () => {
            // Set up mock data and behavior for findUnique
            const nonExistingEmail = 'nonexistent@example.com';
            jest.spyOn(prisma.Admins, 'findUnique').mockResolvedValue(null);
    
            // Call the function with the specific email
            const result = await checkEmailExists(nonExistingEmail);
    
            // Assertions
            expect(result).toBe(false);
        });
    });
});*/