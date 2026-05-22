import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('doctorToken');
        if (!token) {
          navigate('/doctor/login');
          return;
        }
        
        const { data } = await axios.get('http://localhost:5000/api/doctors/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(data);
      } catch (error) {
        console.error(error);
        if (error.response?.status === 401) navigate('/doctor/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('doctorToken');
    navigate('/doctor/login');
  };

  if (loading) return <div className="text-center py-20">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Doctor Profile</h2>
        <div className="space-x-4">
          <button onClick={() => navigate('/doctor/dashboard')} className="text-blue-800 hover:underline font-medium">Dashboard</button>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">Logout</button>
        </div>
      </div>

      {profile && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-900 h-32"></div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-16 mb-8">
              <div className="w-32 h-32 bg-white rounded-full p-2">
                <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-4xl overflow-hidden border border-gray-100">
                  {profile.image ? <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" /> : '👨‍⚕️'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="font-medium text-gray-900 text-lg">{profile.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-medium text-gray-900 text-lg">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Specialization</p>
                <p className="font-medium text-gray-900 text-lg">{profile.specialization}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Experience</p>
                <p className="font-medium text-gray-900 text-lg">{profile.experience}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Consultation Fees</p>
                <p className="font-medium text-green-600 text-lg">${profile.fees}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">About</p>
                <p className="font-medium text-gray-900 text-lg">{profile.about || 'No description provided.'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
