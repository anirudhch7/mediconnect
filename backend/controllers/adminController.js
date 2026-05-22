const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary');

const generateToken = (id, role = 'admin') => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    // Hardcoded admin for simplicity, usually stored in DB or environment
    if (email === 'admin@mediconnect.com' && password === 'admin123') {
        res.json({
            email,
            token: generateToken('admin_id', 'admin'),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, specialization, experience, fees, about, address, availableSlots } = req.body;
        
        let imageUrl = '';
        if (req.file) {
            // Upload to Cloudinary using buffer
            const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'mediconnect/doctors' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });
            const result = await uploadPromise;
            imageUrl = result.secure_url;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newDoctor = new Doctor({
            name,
            email,
            password: hashedPassword,
            specialization,
            experience,
            fees,
            about,
            address,
            availableSlots: availableSlots ? JSON.parse(availableSlots) : [],
            image: imageUrl,
        });

        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, specialization, experience, fees, about, address, availableSlots } = req.body;

        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        let imageUrl = doctor.image;
        if (req.file) {
            const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'mediconnect/doctors' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });
            const result = await uploadPromise;
            imageUrl = result.secure_url;
        }

        doctor.name = name || doctor.name;
        doctor.email = email || doctor.email;
        doctor.specialization = specialization || doctor.specialization;
        doctor.experience = experience || doctor.experience;
        doctor.fees = fees || doctor.fees;
        doctor.about = about || doctor.about;
        doctor.address = address || doctor.address;
        
        if (availableSlots) {
            doctor.availableSlots = JSON.parse(availableSlots);
        }
        doctor.image = imageUrl;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            doctor.password = await bcrypt.hash(password, salt);
        }

        const updatedDoctor = await doctor.save();
        res.json(updatedDoctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        await doctor.deleteOne();
        res.json({ message: 'Doctor removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { adminLogin, addDoctor, updateDoctor, deleteDoctor };
