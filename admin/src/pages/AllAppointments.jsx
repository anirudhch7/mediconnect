import { useState, useEffect } from 'react';
import axios from 'axios';
import NoShowRiskBadge from '../components/NoShowRiskBadge';

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const { data } = await axios.get('http://localhost:5000/api/appointments/admin', {
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
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:5000/api/appointments/cancel/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(appointments.map(a => a._id === id ? { ...a, status: 'cancelled' } : a));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">All Appointments</h2>
        <p className="text-text-secondary mt-1">Monitor platform-wide bookings and manage patient schedules</p>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-border overflow-hidden">
        {loading ? (
          <p className="p-8 text-text-secondary text-center">Loading appointments...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="p-5 font-bold text-xs uppercase tracking-wider text-text-secondary">Patient</th>
                  <th className="p-5 font-bold text-xs uppercase tracking-wider text-text-secondary">Doctor</th>
                  <th className="p-5 font-bold text-xs uppercase tracking-wider text-text-secondary">Date & Time</th>
                  <th className="p-5 font-bold text-xs uppercase tracking-wider text-text-secondary">Status</th>
                  <th className="p-5 font-bold text-xs uppercase tracking-wider text-text-secondary">AI Risk</th>
                  <th className="p-5 font-bold text-xs uppercase tracking-wider text-text-secondary text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {appointments.map(app => (
                  <tr key={app._id} className="hover:bg-brand/5 transition-colors group">
                    <td className="p-5 font-semibold text-text-primary">{app.userId?.name || 'Unknown Patient'}</td>
                    <td className="p-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-hero-gradient p-0.5">
                          <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                            {app.docId?.image ? <img src={app.docId.image} className="w-full h-full object-cover" /> : <span className="text-sm">👨‍⚕️</span>}
                          </div>
                        </div>
                        <span className="font-medium text-text-secondary group-hover:text-brand transition-colors">{app.docId?.name || 'Unknown Doctor'}</span>
                      </div>
                    </td>
                    <td className="p-5 text-sm font-medium text-text-secondary">{app.date} <span className="text-brand mx-1">•</span> {app.time}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${app.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-5">
                      {app.status === 'booked' && <NoShowRiskBadge appointmentId={app._id} />}
                    </td>
                    <td className="p-5 text-right">
                      {app.status !== 'cancelled' && (
                        <button onClick={() => handleCancel(app._id)} className="text-red-500 hover:text-red-700 font-bold text-sm bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors">
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-text-secondary font-medium">No appointments found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
