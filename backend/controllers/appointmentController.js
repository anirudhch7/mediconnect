const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Book Appointment
const bookAppointment = async (req, res) => {
    try {
        const { docId, date, time } = req.body;
        const doctor = await Doctor.findById(docId);
        
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const appointment = new Appointment({
            userId: req.user.id,
            docId,
            date,
            time,
            amount: doctor.fees,
        });

        const savedAppointment = await appointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Patient Appointments
const getPatientAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user.id }).populate('docId', 'name specialization image');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Doctor Appointments
const getDoctorAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ docId: req.user.id }).populate('userId', 'name image');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Appointments (Admin)
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({}).populate('userId', 'name').populate('docId', 'name');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cancel Appointment
const cancelAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        
        // Ensure only the patient or admin can cancel
        if (appointment.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        appointment.status = 'cancelled';
        await appointment.save();
        res.json({ message: 'Appointment cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Payment endpoints
const createOrder = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointment = await Appointment.findById(appointmentId);
        
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: appointment.amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: `receipt_order_${appointmentId}`
        };

        const order = await instance.orders.create(options);
        res.json({ order, appointment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body;
        
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            const appointment = await Appointment.findById(appointmentId);
            appointment.paymentStatus = 'paid';
            await appointment.save();
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    bookAppointment, getPatientAppointments, getDoctorAppointments,
    getAllAppointments, cancelAppointment, createOrder, verifyPayment
};
