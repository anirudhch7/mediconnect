import { LogOut } from 'lucide-react';

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
  };

  return (
    <header className="h-20 bg-glass border-b border-border flex items-center justify-between px-8 z-10 sticky top-0 transition-all duration-300">
      <div>
        <h2 className="text-xl font-bold text-text-primary tracking-tight">Overview</h2>
        <p className="text-sm text-text-secondary">Welcome back to the admin portal</p>
      </div>
      <button 
        onClick={handleLogout}
        className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-border text-text-primary rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm font-medium"
      >
        <span>Logout</span>
        <LogOut className="w-4 h-4" />
      </button>
    </header>
  );
};

export default Navbar;
