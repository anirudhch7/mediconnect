const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getPatientProfile, updatePatientProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile')
    .get(protect, getPatientProfile)
    .put(protect, updatePatientProfile);

module.exports = router;
