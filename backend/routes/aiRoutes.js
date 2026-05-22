const express = require('express');
const router = express.Router();
const { 
    checkSymptoms, recommendDoctors, chatWithBot, 
    summarizeReport, getAppointmentPredictions, getNoShowRisk 
} = require('../controllers/aiController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public or optionally authenticated routes
router.post('/symptom-check', protect, checkSymptoms); // Assuming we want user context if available, can make protect optional using a different middleware
router.post('/recommend-doctors', recommendDoctors);
router.post('/chat', chatWithBot);

// Authenticated routes
router.post('/summarize-report', protect, upload.single('report'), summarizeReport);

// Admin/Doctor routes
router.get('/predict-appointments', protect, admin, getAppointmentPredictions);
router.get('/no-show-risk/:appointmentId', protect, getNoShowRisk);

module.exports = router;
