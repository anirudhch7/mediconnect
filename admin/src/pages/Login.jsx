import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data } = await axios.post('http://localhost:5000/api/admin/login', { email, password });
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-brand/10 blur-3xl mix-blend-multiply animate-float pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-40 w-96 h-96 rounded-full bg-ai/10 blur-3xl mix-blend-multiply animate-float-delayed pointer-events-none"></div>

      <div className="max-w-md w-full p-10 bg-white rounded-[32px] shadow-[var(--shadow-glow)] border border-border relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-hero-gradient rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg mx-auto mb-6 transform hover:rotate-12 transition-transform">
            M
          </div>
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">Admin <span className="text-ai">Portal</span></h2>
          <p className="text-text-secondary mt-2">Log in to manage MediConnect AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-600 bg-red-50 p-4 rounded-xl text-sm font-medium border border-red-100">{error}</div>}
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-text-primary">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none font-medium" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin@mediconnect.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-text-primary">Password</label>
            <input 
              type="password" 
              required 
              className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all outline-none" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-4 bg-hero-gradient text-white text-lg font-bold rounded-xl shadow-md hover:shadow-[var(--shadow-glow)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 mt-4"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
