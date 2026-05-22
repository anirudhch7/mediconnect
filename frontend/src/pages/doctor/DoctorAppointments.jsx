import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('doctorToken');
        if (!token) {
          navigate('/doctor/login');
          return;
        }
        
        const { data } = await axios.get('http://localhost:5000/api/appointments/doctor', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [navigate]);

  const handleComplete = async (id) => {
    try {
      const token = localStorage.getItem('doctorToken');
      // For MVP, we'll hit an endpoint to mark complete if exists, else mock it
      // Let's assume the cancel endpoint can be reused or we just locally update for demonstration
      setAppointments(appointments.map(a => a._id === id ? { ...a, status: 'completed' } : a));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="text-center py-20">Loading appointments...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">All Appointments</h2>
        <button onClick={() => navigate('/doctor/dashboard')} className="text-blue-800 hover:underline font-medium">
          &larr; Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-medium text-gray-600">Patient</th>
                <th className="p-4 font-medium text-gray-600">Date & Time</th>
                <th className="p-4 font-medium text-gray-600">Payment</th>
                <th className="p-4 font-medium text-gray-600">Status</th>
                <th className="p-4 font-medium text-gray-600 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map(app => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{app.userId?.name || 'Patient'}</td>
                  <td className="p-4 text-gray-600">{app.date} at {app.time}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${app.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {app.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      app.status === 'booked' ? 'bg-blue-100 text-blue-700' : 
                      app.status === 'completed' ? 'bg-green-100 text-green-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {app.status === 'booked' && (
                      <button 
                        onClick={() => handleComplete(app._id)}
                        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Mark Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">No appointments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
