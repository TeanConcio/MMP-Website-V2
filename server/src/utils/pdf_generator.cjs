// Import the required modules

// PDF Generator
const { generate } = require('@pdfme/generator');

// PDF Template
const registrationPDFTemplate = require("../files/RegistrationPDFTemplate.cjs");

// Debugging
//const { BLANK_PDF } = require('@pdfme/common');
// const fs = require('fs');
// const path = require('path');


async function generatePDF(data) {

    const templateData = registrationPDFTemplate();

    try {
        const pdf = await generate({ 
            template: templateData.template, 
            plugins: templateData.plugins, 
            inputs: [data],
            options: templateData.options
        });

        // Save PDF to file
        //fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);

        // const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        // return blob;

        const buffer = pdf.buffer;
        return buffer;
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
}

// Export the function
module.exports = generatePDF;