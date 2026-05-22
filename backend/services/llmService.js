const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI;
if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

const callLLM = async (prompt, systemInstruction = "") => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            // Mock response if no API key is provided for testing
            console.log("No GEMINI_API_KEY provided. Returning mock response.");
            return `{"mock": "response", "message": "Please configure API key"}`;
        }
        
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: systemInstruction || undefined
        });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("LLM Error:", error);
        throw new Error("Failed to communicate with AI provider");
    }
};

module.exports = { callLLM };
