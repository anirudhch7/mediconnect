import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import DoctorRecommendationCard from '../components/DoctorRecommendationCard';

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const location = useLocation();

  const specialties = ['General Physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'];

  useEffect(() => {
    // If redirected from symptom checker with a specialty parameter
    const params = new URLSearchParams(location.search);
    const spec = params.get('specialty');
    if (spec) setFilter(spec);

    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(data);

        // Fetch AI recommendations if symptoms were passed via state or if they are a returning patient
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const recRes = await axios.post('http://localhost:5000/api/ai/recommend-doctors', { symptoms: spec || 'general checkup' }, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setRecommendations(recRes.data.recommendations || []);
          } catch (e) {
            console.error("Failed to load recommendations");
          }
        }
      } catch (error) {
        console.error("Error fetching doctors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = filter ? doctors.filter(doc => doc.specialization === filter) : doctors;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {recommendations.length > 0 && !filter && (
        <div className="mb-12 animate-fade-in-up">
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-2xl">✨</span>
            <h2 className="text-2xl font-bold text-gray-900">AI Recommended For You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(0, 3).map(doc => (
              <DoctorRecommendationCard key={`rec-${doc._id}`} doctor={doc} />
            ))}
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse All Doctors</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <button 
            onClick={() => setFilter('')} 
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${filter === '' ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            All Specialties
          </button>
          {specialties.map(spec => (
            <button 
              key={spec}
              onClick={() => setFilter(spec)} 
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${filter === spec ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading doctors...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map(doctor => (
                <div key={doctor._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col">
                  <div className="h-48 bg-blue-50 flex items-center justify-center overflow-hidden">
                    {doctor.image ? (
                      <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <span className="text-6xl text-blue-200">👨‍⚕️</span>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-500">Available</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                    <p className="text-gray-600 mb-4">{doctor.specialization}</p>
                    <div className="mt-auto">
                      <Link to={`/appointment/${doctor._id}`} className="block w-full py-2.5 bg-blue-50 text-blue-600 text-center font-medium rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {filteredDoctors.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100">
                  No doctors found for this specialty.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;
