const Doctor = require('../models/Doctor');

const getDoctorRecommendations = async (specialty, patientHistory = []) => {
    // 1. Fetch doctors matching the specialty
    const doctors = await Doctor.find({ 
        specialization: new RegExp(specialty, 'i') 
    }).select('-password');
    
    // 2. Calculate scores (Simplified)
    // score = (rating / 5 * 0.4) + (availabilityScore * 0.3) + (historyMatchScore * 0.3)
    // Assuming mock rating of 4.5 for now
    
    const scoredDoctors = doctors.map(doc => {
        let score = (4.5 / 5 * 0.4);
        
        let availabilityScore = doc.availableSlots && doc.availableSlots.length > 0 ? 1 : 0;
        score += (availabilityScore * 0.3);
        
        let historyMatchScore = patientHistory.includes(doc._id.toString()) ? 1 : 0;
        score += (historyMatchScore * 0.3);
        
        return {
            ...doc.toObject(),
            recommendationScore: score.toFixed(2),
            matchReason: historyMatchScore > 0 ? "Previously visited" : "Top rated available specialist"
        };
    });
    
    // 3. Sort by score
    scoredDoctors.sort((a, b) => b.recommendationScore - a.recommendationScore);
    
    return scoredDoctors;
};

module.exports = { getDoctorRecommendations };
