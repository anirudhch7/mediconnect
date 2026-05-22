const { callLLM } = require('../services/llmService');
const { symptomCheckerPrompt, reportSummarizerPrompt } = require('../utils/promptTemplates');
const { getDoctorRecommendations } = require('../services/recommendationService');
const { processChat } = require('../services/chatbotService');
const { extractTextFromPDF } = require('../services/ocrService');
const { predictAppointments, calculateNoShowRisk } = require('../services/predictionService');
const SymptomLog = require('../models/SymptomLog');
const ReportSummary = require('../models/ReportSummary');
const User = require('../models/User');

const checkSymptoms = async (req, res) => {
    try {
        const { symptoms } = req.body;
        const prompt = symptomCheckerPrompt.replace('{symptoms}', symptoms);
        const aiResponseRaw = await callLLM(prompt);
        
        let aiResponseJSON;
        try {
            aiResponseJSON = JSON.parse(aiResponseRaw.replace(/```json/g, '').replace(/```/g, '').trim());
        } catch (e) {
            aiResponseJSON = { conditions: [], specialist: "General Physician", urgency: "Medium" };
        }

        const log = new SymptomLog({
            patientId: req.user ? req.user.id : null,
            symptomsInput: symptoms,
            aiResponse: aiResponseJSON
        });
        await log.save();

        res.json(aiResponseJSON);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const recommendDoctors = async (req, res) => {
    try {
        const { symptoms } = req.body;
        // Step 1: Infer specialty from symptoms (reusing logic or simplified)
        const prompt = `Based on these symptoms: "${symptoms}", what ONE medical specialty is most appropriate? Answer with just the specialty name (e.g. Cardiologist, Dermatologist, General Physician).`;
        const specialty = await callLLM(prompt);
        
        let patientHistory = [];
        if (req.user) {
            const user = await User.findById(req.user.id);
            patientHistory = user.appointmentHistory || [];
        }

        const recommendations = await getDoctorRecommendations(specialty.trim(), patientHistory);
        res.json({ specialty: specialty.trim(), recommendations });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const chatWithBot = async (req, res) => {
    try {
        const { sessionId, message } = req.body;
        const patientId = req.user ? req.user.id : null;
        const aiResponse = await processChat(sessionId, patientId, message);
        res.json({ response: aiResponse });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const summarizeReport = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        
        const extractedText = await extractTextFromPDF(req.file.buffer);
        const prompt = reportSummarizerPrompt.replace('{text}', extractedText);
        
        const aiResponseRaw = await callLLM(prompt);
        let summaryOutput;
        try {
            summaryOutput = JSON.parse(aiResponseRaw.replace(/```json/g, '').replace(/```/g, '').trim());
        } catch (e) {
            summaryOutput = { keyObservations: ["Could not parse response"], importantMetrics: [], suggestedNextSteps: [] };
        }

        const reportSummary = new ReportSummary({
            patientId: req.user.id,
            summaryOutput
        });
        await reportSummary.save();

        res.json(summaryOutput);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAppointmentPredictions = async (req, res) => {
    try {
        const predictions = await predictAppointments();
        res.json(predictions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNoShowRisk = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const riskScore = calculateNoShowRisk(appointmentId);
        res.json({ appointmentId, riskScore });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    checkSymptoms,
    recommendDoctors,
    chatWithBot,
    summarizeReport,
    getAppointmentPredictions,
    getNoShowRisk
};
