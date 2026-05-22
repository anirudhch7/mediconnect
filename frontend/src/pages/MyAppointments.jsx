import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const { data } = await axios.get('http://localhost:5000/api/appointments/user', {
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
  }, []);

  const handleCancel = async (id) => {
    setCanceling(id);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/appointments/cancel/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(appointments.map(a => a._id === id ? { ...a, status: 'cancelled' } : a));
    } catch (error) {
      console.error(error);
    } finally {
      setCanceling(null);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading your appointments...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">My Appointments</h2>
      
      {appointments.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No appointments yet</h3>
          <p className="text-gray-500 mb-6">You haven't booked any doctor appointments yet.</p>
          <Link to="/doctors" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Find a Doctor
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map(app => (
            <div key={app._id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-md transition-shadow">
              <div className="w-24 h-24 bg-blue-50 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                 {app.docId?.image ? (
                   <img src={app.docId.image} alt={app.docId.name} className="w-full h-full object-cover" />
                 ) : (
                   <span className="text-4xl text-blue-200">👨‍⚕️</span>
                 )}
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{app.docId?.name || 'Unknown Doctor'}</h3>
                <p className="text-blue-600 font-medium mb-3">{app.docId?.specialization || 'General'}</p>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-gray-600">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-lg">📅</span>
                    <span className="font-semibold">{app.date}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-lg">⏰</span>
                    <span className="font-semibold">{app.time}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-lg">💳</span>
                    <span className={`font-semibold ${app.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {app.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 min-w-[120px]">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  app.status === 'booked' ? 'bg-blue-100 text-blue-700' : 
                  app.status === 'completed' ? 'bg-green-100 text-green-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {app.status}
                </span>
                
                {app.status === 'booked' && (
                  <button 
                    onClick={() => handleCancel(app._id)}
                    disabled={canceling === app._id}
                    className="text-sm font-medium text-red-500 hover:text-red-700 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors w-full disabled:opacity-50"
                  >
                    {canceling === app._id ? 'Canceling...' : 'Cancel'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
