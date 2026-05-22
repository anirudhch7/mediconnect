import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
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
        console.error("Failed to fetch dashboard data");
        if (error.response?.status === 401) navigate('/doctor/login');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [navigate]);

  if (loading) return <div className="text-center py-20">Loading dashboard...</div>;

  const todayAppointments = appointments.filter(app => {
    // Basic logic to filter today's appointments. 
    // For MVP, assuming today's date matches app.date or we just show recent
    return app.status === 'booked'; 
  });
  
  const totalEarnings = appointments
    .filter(app => app.paymentStatus === 'paid' && app.status !== 'cancelled')
    .reduce((acc, curr) => acc + (curr.amount || curr.docId?.fees || 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h2>
        <div className="space-x-4">
          <Link to="/doctor/appointments" className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">All Appointments</Link>
          <Link to="/doctor/profile" className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 font-medium">My Profile</Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-blue-100 text-blue-800 rounded-xl text-3xl">📅</div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Upcoming</p>
            <p className="text-3xl font-bold text-gray-900">{todayAppointments.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-green-100 text-green-800 rounded-xl text-3xl">💰</div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Earnings</p>
            <p className="text-3xl font-bold text-gray-900">${totalEarnings}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-4 bg-purple-100 text-purple-800 rounded-xl text-3xl">👥</div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Patients</p>
            <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">Today's Appointments</h3>
        </div>
        {todayAppointments.length === 0 ? (
          <p className="p-8 text-center text-gray-500">No appointments scheduled for today.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {todayAppointments.map(app => (
              <div key={app._id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{app.userId?.name || 'Patient'}</h4>
                  <p className="text-sm text-gray-600">Time: {app.time} | Date: {app.date}</p>
                </div>
                <span className="px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">
                  Upcoming
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
