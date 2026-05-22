import { useState } from 'react';
import axios from 'axios';

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: 'General Physician',
    experience: '1 Year',
    fees: '',
    about: '',
    address: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (image) data.append('image', image);

      const token = localStorage.getItem('adminToken');
      await axios.post('http://localhost:5000/api/admin/add-doctor', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setMessage('Doctor added successfully!');
      setFormData({ name: '', email: '', password: '', specialization: 'General Physician', experience: '1 Year', fees: '', about: '', address: '' });
      setImage(null);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding doctor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">Add New Doctor</h2>
        <p className="text-text-secondary mt-1">Register a new healthcare professional to the platform</p>
      </div>

      {message && <div className={`p-4 mb-4 rounded-xl ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>{message}</div>}

      <div className="bg-white rounded-[32px] shadow-sm border border-border p-10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="flex items-center space-x-6 pb-6 border-b border-border">
            <div className="w-24 h-24 bg-surface rounded-[24px] border border-dashed border-slate-300 flex items-center justify-center overflow-hidden group-hover:border-brand/50 transition-colors">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">📸</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-text-primary mb-2">Upload Profile Photo</label>
              <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" className="block w-full text-sm text-text-secondary file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand/10 file:text-brand hover:file:bg-brand/20 transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-text-primary">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none" placeholder="Dr. John Doe" />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-text-primary">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none" placeholder="doctor@example.com" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-text-primary">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-text-primary">Specialization</label>
              <select name="specialization" value={formData.specialization} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none font-medium">
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
              <select name="experience" value={formData.experience} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none font-medium">
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
              <input type="number" name="fees" value={formData.fees} onChange={handleChange} required className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none" placeholder="100" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-text-primary">Clinic Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none" placeholder="123 Medical Center, City" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-text-primary">About</label>
            <textarea name="about" value={formData.about} onChange={handleChange} rows="4" className="w-full px-4 py-3 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none resize-none" placeholder="Brief description about the doctor..."></textarea>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button type="submit" disabled={loading} className="px-8 py-3.5 bg-hero-gradient text-white font-bold rounded-xl shadow-md hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Adding Doctor...' : 'Save Doctor Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
