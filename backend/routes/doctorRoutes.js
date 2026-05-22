const express = require('express');
const router = express.Router();
const { loginDoctor, getDoctorProfile, updateDoctorProfile, getAllDoctors } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginDoctor);
router.get('/', getAllDoctors);
router.route('/profile')
    .get(protect, getDoctorProfile)
    .put(protect, updateDoctorProfile);

module.exports = router;
