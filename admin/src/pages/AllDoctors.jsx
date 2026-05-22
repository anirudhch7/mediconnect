import { useState, useEffect } from 'react';
import axios from 'axios';

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit modal state
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/api/admin/delete-doctor/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDoctors(doctors.filter(doc => doc._id !== id));
    } catch (error) {
      alert("Error deleting doctor");
      console.error(error);
    }
  };

  const handleEditClick = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      specialization: doctor.specialization,
      experience: doctor.experience,
      fees: doctor.fees,
      address: doctor.address,
      about: doctor.about,
      password: '' // Only filled if they want to change it
    });
    setImage(null);
    setMessage('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '') {
          data.append(key, formData[key]);
        }
      });
      if (image) data.append('image', image);

      const token = localStorage.getItem('adminToken');
      const res = await axios.put(`http://localhost:5000/api/admin/update-doctor/${editingDoctor._id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setDoctors(doctors.map(doc => doc._id === editingDoctor._id ? res.data : doc));
      setMessage('Doctor updated successfully!');
      setTimeout(() => setEditingDoctor(null), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating doctor');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in-up relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">All Doctors</h2>
          <p className="text-text-secondary mt-1">Manage and view all registered healthcare professionals</p>
        </div>
      </div>
      
      {loading ? (
        <p className="p-6 text-gray-500 text-center">Loading doctors...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white rounded-[24px] shadow-sm border border-border p-6 hover:shadow-[var(--shadow-glow)] transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-hero-gradient rounded-[20px] p-0.5">
                  <div className="w-full h-full bg-white rounded-[18px] flex items-center justify-center overflow-hidden">
                    {doctor.image ? (
                      <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl">👨‍⚕️</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary leading-tight">{doctor.name}</h3>
                  <p className="text-sm font-semibold text-brand tracking-wide">{doctor.specialization}</p>
                </div>
              </div>
              
              <div className="bg-surface rounded-2xl p-4 border border-border flex justify-between items-center group-hover:bg-brand/5 group-hover:border-brand/20 transition-colors">
                <div>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Fee</p>
                  <p className="font-bold text-text-primary">${doctor.fees}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Experience</p>
                  <p className="font-bold text-text-primary">{doctor.experience}</p>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button onClick={() => handleEditClick(doctor)} className="flex-1 py-2.5 bg-white text-brand font-semibold rounded-xl border border-brand/20 hover:bg-brand hover:text-white transition-all duration-300 shadow-sm">
                  Edit Profile
                </button>
                <button onClick={() => handleDelete(doctor._id)} className="w-12 flex items-center justify-center bg-white text-red-500 rounded-xl border border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingDoctor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] p-10 max-w-3xl w-full relative mt-10 shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-50 pointer-events-none"></div>
            
            <button onClick={() => setEditingDoctor(null)} className="absolute top-8 right-8 w-10 h-10 bg-surface rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors z-10">
              <span className="text-xl font-bold">&times;</span>
            </button>

            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold mb-8 text-text-primary tracking-tight">Edit Doctor Profile</h2>
              
              {message && (
                <div className={`p-4 mb-8 rounded-2xl ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-8">
                <div className="flex items-center space-x-8 pb-8 border-b border-border">
                  <div className="w-24 h-24 bg-surface rounded-[24px] border border-dashed border-slate-300 flex items-center justify-center overflow-hidden shadow-sm">
                    {image ? (
                      <img src={URL.createObjectURL(image)} alt="preview" className="w-full h-full object-cover" />
                    ) : editingDoctor.image ? (
                      <img src={editingDoctor.image} alt="current" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">📸</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-text-primary mb-2">Profile Photo</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" className="block w-full text-sm text-text-secondary file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand/10 file:text-brand hover:file:bg-brand/20 transition-colors" />
                    <p className="text-xs text-text-secondary mt-2">Recommended: Square image, max 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-text-primary">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-text-primary">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-text-primary">New Password</label>
                    <input type="password" name="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none" placeholder="Leave empty to keep current" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-text-primary">Specialization</label>
                    <select name="specialization" value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none font-medium">
                      <option value="General Physician">General Physician</option>
                      <option value="Gynecologist">Gynecologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Pediatricians">Pediatricians</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Gastroenterologist">Gastroenterologist</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-text-primary">Experience</label>
                    <select name="experience" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none font-medium">
                      <option value="1 Year">1 Year</option>
                      <option value="2 Years">2 Years</option>
                      <option value="3 Years">3 Years</option>
                      <option value="4 Years">4 Years</option>
                      <option value="5 Years">5 Years</option>
                      <option value="10+ Years">10+ Years</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-text-primary">Consultation Fees ($)</label>
                    <input type="number" name="fees" value={formData.fees} onChange={(e) => setFormData({...formData, fees: e.target.value})} required className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-text-primary">Clinic Address</label>
                  <input type="text" name="address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} required className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none" />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-text-primary">About</label>
                  <textarea name="about" value={formData.about} onChange={(e) => setFormData({...formData, about: e.target.value})} rows="4" className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none resize-none"></textarea>
                </div>

                <div className="pt-6 border-t border-border flex justify-end space-x-4">
                  <button type="button" onClick={() => setEditingDoctor(null)} className="px-8 py-3.5 bg-surface text-text-primary font-bold rounded-xl border border-border hover:bg-slate-100 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} className="px-8 py-3.5 bg-hero-gradient text-white font-bold rounded-xl shadow-md hover:shadow-glow transition-all duration-300 disabled:opacity-50">
                    {submitting ? 'Saving Changes...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDoctors;
