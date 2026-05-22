const Doctor = require('../models/Doctor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id, role = 'doctor') => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const loginDoctor = async (req, res) => {
    const { email, password } = req.body;
    try {
        const doctor = await Doctor.findOne({ email });
        if (doctor && (await bcrypt.compare(password, doctor.password))) {
            res.json({
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                token: generateToken(doctor._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.user.id).select('-password');
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.user.id);
        if (doctor) {
            doctor.name = req.body.name || doctor.name;
            doctor.email = req.body.email || doctor.email;
            doctor.specialization = req.body.specialization || doctor.specialization;
            doctor.experience = req.body.experience || doctor.experience;
            doctor.fees = req.body.fees || doctor.fees;
            doctor.about = req.body.about || doctor.about;
            doctor.address = req.body.address || doctor.address;
            doctor.availableSlots = req.body.availableSlots || doctor.availableSlots;
            
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                doctor.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedDoctor = await doctor.save();
            res.json({
                _id: updatedDoctor._id,
                name: updatedDoctor.name,
                email: updatedDoctor.email,
                token: generateToken(updatedDoctor._id),
            });
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select('-password');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginDoctor, getDoctorProfile, updateDoctorProfile, getAllDoctors };
