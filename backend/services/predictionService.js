const Appointment = require('../models/Appointment');
const { callLLM } = require('./llmService');
const { appointmentPredictionPrompt } = require('../utils/promptTemplates');

const predictAppointments = async () => {
    const recentAppointments = await Appointment.find().sort({ createdAt: -1 }).limit(100).populate('docId', 'specialization');
    
    const historyData = recentAppointments.map(app => ({
        time: app.time,
        specialty: app.docId?.specialization || 'General',
        status: app.status
    }));

    const prompt = appointmentPredictionPrompt.replace('{history}', JSON.stringify(historyData));
    
    try {
        const llmResponse = await callLLM(prompt);
        let predictionData = JSON.parse(llmResponse.replace(/```json/g, '').replace(/```/g, '').trim());
        return predictionData;
    } catch (e) {
        console.log("LLM Prediction failed, using fallback logic");
        return {
            peakHours: ["10:00 AM", "11:00 AM"],
            upcomingDemandForecast: [
                { specialty: "General Physician", expectedVolume: "High" },
                { specialty: "Dermatologist", expectedVolume: "Medium" }
            ]
        };
    }
};

const calculateNoShowRisk = (appointment) => {
    // Simplified risk calculation logic
    let score = 0.2; // Base risk
    // E.g., if booked far in advance, risk is higher. If previously no-showed, risk is higher.
    return score;
};

module.exports = { predictAppointments, calculateNoShowRisk };
