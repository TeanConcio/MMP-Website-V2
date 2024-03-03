/* eslint-disable no-undef */
// Import functions to test
import {
    generateTicketID
} from "../src/routes/TicketsRouter.js";

// Test Suite
describe("TicketsRouter Helper Functions", () => {

    // Test generateTicketID Function
    describe('generateTicketID Function', () => {

        // Test case to ensure the function generates a new ticket ID with an incremented segment
        it('generate a new ticket ID with incremented segment', async () => {
            const currentYear = '2024';
            const lastTicketIDSegment = 99998;
    
            const result = await generateTicketID(currentYear, lastTicketIDSegment);
    
            expect(result).toMatch(/^2024-\d{5}$/); 
        });
        
        // Test case to ensure the function generates a new ticket ID when last segment is null
        it('handle the case when the last ticket ID segment is null', async () => {
            const currentYear = '2024';
            const lastTicketIDSegment = -1;
    
            const result = await generateTicketID(currentYear, lastTicketIDSegment);
    
            // Assertions
            expect(result).toBe('2024-00000');
        });

        // Test case to ensure the function correctly sends overflow message when last segment is in limit
        it('handle rollover to the next 1-digit segment', async () => {
            const currentYear = '2024';
            const lastTicketIDSegment = 99999;
    
            await expect(generateTicketID(currentYear, lastTicketIDSegment)).rejects.toThrow('ID Overflow');
        });
    });

});