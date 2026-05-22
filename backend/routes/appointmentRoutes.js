const express = require('express');
const router = express.Router();
const { 
    bookAppointment, getPatientAppointments, getDoctorAppointments,
    getAllAppointments, cancelAppointment, createOrder, verifyPayment
} = require('../controllers/appointmentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/book', protect, bookAppointment);
router.get('/user', protect, getPatientAppointments);
router.get('/doctor', protect, getDoctorAppointments);
router.get('/admin', protect, admin, getAllAppointments);
router.put('/cancel/:id', protect, cancelAppointment);

// Payment routes
router.post('/payment/create-order', protect, createOrder);
router.post('/payment/verify', protect, verifyPayment);

module.exports = router;
