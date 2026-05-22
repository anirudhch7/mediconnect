const pdfParse = require('pdf-parse');

const extractTextFromPDF = async (buffer) => {
    try {
        const data = await pdfParse(buffer);
        // If pdfParse fails to extract text (e.g. image pdf), tesseract OCR could be used here.
        // For simplicity, we assume text-based PDFs.
        return data.text;
    } catch (error) {
        console.error("OCR Error:", error);
        throw new Error("Failed to extract text from PDF");
    }
};

module.exports = { extractTextFromPDF };
