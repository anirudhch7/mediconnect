const express = require('express');
const router = express.Router();
const { adminLogin, addDoctor, updateDoctor, deleteDoctor } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/login', adminLogin);
router.post('/add-doctor', protect, admin, upload.single('image'), addDoctor);
router.put('/update-doctor/:id', protect, admin, upload.single('image'), updateDoctor);
router.delete('/delete-doctor/:id', protect, admin, deleteDoctor);

module.exports = router;
