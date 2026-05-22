import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-hero-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:shadow-glow transition-all">
            M
          </div>
          <span className="text-2xl font-bold text-text-primary tracking-tight">MediConnect <span className="text-ai">AI</span></span>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-text-secondary hover:text-brand font-medium transition-colors">Home</Link>
          <Link to="/doctors" className="text-text-secondary hover:text-brand font-medium transition-colors">Doctors</Link>
          <Link to="/symptom-checker" className="text-text-secondary hover:text-ai font-medium transition-colors flex items-center gap-1.5">
            <span className="text-ai">✨</span> Symptom Checker
          </Link>
          <Link to="/report-summarizer" className="text-text-secondary hover:text-secondary font-medium transition-colors flex items-center gap-1.5">
            <span className="text-secondary">📄</span> Report Summary
          </Link>
          {!token && (
            <Link to="/doctor/login" className="text-text-secondary hover:text-secondary font-medium transition-colors flex items-center gap-1.5">
              <span className="text-secondary">👨‍⚕️</span> Doctors Login
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {token ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 font-medium hover:text-blue-600 transition-colors focus:outline-none">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 overflow-hidden">
                  👤
                </div>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 hidden group-hover:block transition-all duration-200">
                <Link to="/profile" className="block px-4 py-2 text-sm text-text-primary hover:bg-slate-50 hover:text-brand">My Profile</Link>
                <Link to="/my-appointments" className="block px-4 py-2 text-sm text-text-primary hover:bg-slate-50 hover:text-brand">My Appointments</Link>
                <div className="border-t border-border my-1"></div>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="px-6 py-2.5 bg-hero-gradient text-white font-medium rounded-full shadow-md hover:shadow-glow transition-all duration-300 transform hover:-translate-y-0.5">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
