// Convert import to require
const { BLANK_PDF } = require('@pdfme/common');
const { generate } = require('@pdfme/generator');
// const fs = require('fs');
// const path = require('path');


async function generatePDF() {
    
    const template = {
        basePdf: BLANK_PDF,
        schemas: [
            {
                a: {
                    type: 'text',
                    position: { x: 0, y: 0 },
                    width: 10,
                    height: 10,
                    },
                    b: {
                    type: 'text',
                    position: { x: 10, y: 10 },
                    width: 10,
                    height: 10,
                    },
                    c: {
                    type: 'text',
                    position: { x: 20, y: 20 },
                    width: 10,
                    height: 10,
                },
            },
        ],
    };
    
    const inputs = [{ a: 'a1', b: 'b1', c: 'c1' }];

    try {
        const pdf = await generate({ template, inputs });

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