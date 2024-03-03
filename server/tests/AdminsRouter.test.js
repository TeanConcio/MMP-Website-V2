import {
    checkIDExists,
    checkEmailExists
} from "../src/routes/AdminsRouter.js";

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

        afterEach(() => {
            jest.clearAllMocks(); // Clear mock calls between test cases
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
});