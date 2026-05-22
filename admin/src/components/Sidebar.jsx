import { NavLink } from 'react-router-dom';
import { Home, Users, CalendarPlus, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-glass-dark text-white flex flex-col border-r border-slate-700/50 shadow-2xl z-20">
      <div className="h-20 flex items-center justify-center border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center text-sm">M</div>
          Admin <span className="text-ai">AI</span>
        </h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink to="/" className={({isActive}) => `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive ? 'bg-hero-gradient text-white shadow-lg' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/add-doctor" className={({isActive}) => `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive ? 'bg-hero-gradient text-white shadow-lg' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
          <LogOut className="w-5 h-5" />
          <span>Add Doctor</span>
        </NavLink>
        <NavLink to="/doctors" className={({isActive}) => `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive ? 'bg-hero-gradient text-white shadow-lg' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
          <Users className="w-5 h-5" />
          <span>All Doctors</span>
        </NavLink>
        <NavLink to="/appointments" className={({isActive}) => `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive ? 'bg-hero-gradient text-white shadow-lg' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
          <CalendarPlus className="w-5 h-5" />
          <span>Appointments</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
