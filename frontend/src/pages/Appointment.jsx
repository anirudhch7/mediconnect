import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState('');
  
  // Date and Time selection state
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Generate next 7 days for selection
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      fullDate: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate()
    });
  }

  // Generate some dummy time slots if doctor doesn't have specific ones
  const timeSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '05:30 PM'];

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/doctors');
        const doc = data.find(d => d._id === docId);
        if (doc) setDoctor(doc);
        else setError('Doctor not found');
      } catch (err) {
        setError('Failed to load doctor details');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [docId]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select both a date and time.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setBooking(true);
    setError('');

    try {
      // 1. Book Appointment in DB
      const { data: appointment } = await axios.post('http://localhost:5000/api/appointments/book', 
        { docId, date: selectedDate, time: selectedTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2. Initialize Payment
      const res = await loadRazorpay();
      if (!res) {
        throw new Error('Razorpay SDK failed to load');
      }

      const { data: orderData } = await axios.post('http://localhost:5000/api/appointments/payment/create-order', 
        { appointmentId: appointment._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: 'rzp_test_placeholder_key', // Needs real key
        amount: orderData.order.amount,
        currency: "INR",
        name: "MediConnect AI",
        description: `Appointment with Dr. ${doctor.name}`,
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            await axios.post('http://localhost:5000/api/appointments/payment/verify', 
              { ...response, appointmentId: appointment._id },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/my-appointments');
          } catch (err) {
            setError('Payment verification failed');
          }
        },
        theme: { color: "#2563EB" }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading doctor details...</div>;
  if (!doctor) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Doctor Info Header */}
        <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start border-b border-gray-100">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-blue-50 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-blue-100">
            {doctor.image ? (
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl text-blue-200">👨‍⚕️</span>
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-3xl font-bold text-gray-900">{doctor.name}</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">⭐ 4.8</span>
            </div>
            <p className="text-lg text-blue-600 font-medium mb-4">{doctor.specialization} &bull; {doctor.experience}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{doctor.about || 'A dedicated medical professional committed to providing the best patient care.'}</p>
            <p className="font-semibold text-gray-800">Consultation Fee: <span className="text-green-600 text-xl">${doctor.fees}</span></p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="p-8 md:p-10 bg-gray-50">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Appointment</h3>
          
          {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">{error}</div>}

          {/* Date Selection */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Select Date</h4>
            <div className="flex space-x-4 overflow-x-auto pb-4 custom-scrollbar">
              {days.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(day.fullDate)}
                  className={`flex-shrink-0 w-20 py-4 rounded-2xl border flex flex-col items-center justify-center transition-all ${selectedDate === day.fullDate ? 'bg-blue-600 text-white border-blue-600 shadow-md transform -translate-y-1' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
                >
                  <span className="text-xs uppercase font-medium opacity-80">{day.dayName}</span>
                  <span className="text-2xl font-bold mt-1">{day.dateNum}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-10">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Select Time</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map((time, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-xl border font-medium transition-colors ${selectedTime === time ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBook}
            disabled={booking}
            className="w-full py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:bg-blue-400 flex items-center justify-center"
          >
            {booking ? 'Processing...' : `Pay $${doctor.fees} & Book Appointment`}
          </button>
          <p className="text-center text-xs text-gray-500 mt-4">Payments are secured by Razorpay 🔒</p>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
