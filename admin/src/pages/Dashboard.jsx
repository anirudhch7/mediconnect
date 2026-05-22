import { useState, useEffect } from 'react';
import PredictionChart from '../components/PredictionChart';
import { Users, Calendar as CalendarIcon, Activity, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats] = useState({ doctors: 12, appointments: 145 });

  return (
    <div className="max-w-7xl mx-auto animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-border flex items-center space-x-4 hover:shadow-[var(--shadow-glow)] transition-all duration-300 transform hover:-translate-y-1">
          <div className="p-4 bg-ai/10 text-ai rounded-2xl">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Total Doctors</p>
            <p className="text-3xl font-extrabold text-text-primary">{stats.doctors}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-border flex items-center space-x-4 hover:shadow-[var(--shadow-glow)] transition-all duration-300 transform hover:-translate-y-1" style={{animationDelay: '0.1s'}}>
          <div className="p-4 bg-brand/10 text-brand rounded-2xl">
            <CalendarIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Appointments</p>
            <p className="text-3xl font-extrabold text-text-primary">{stats.appointments}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-border flex items-center space-x-4 hover:shadow-[var(--shadow-glow)] transition-all duration-300 transform hover:-translate-y-1" style={{animationDelay: '0.2s'}}>
          <div className="p-4 bg-secondary/10 text-secondary rounded-2xl">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">System Health</p>
            <p className="text-3xl font-extrabold text-text-primary">100%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-border flex items-center space-x-4 hover:shadow-[var(--shadow-glow)] transition-all duration-300 transform hover:-translate-y-1" style={{animationDelay: '0.3s'}}>
          <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Growth</p>
            <p className="text-3xl font-extrabold text-text-primary">+24%</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-8 rounded-[32px] shadow-sm border border-border relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="flex items-center space-x-3 mb-6 relative z-10">
          <div className="w-10 h-10 bg-ai/10 text-ai rounded-xl flex items-center justify-center">
            <span className="text-xl">✨</span>
          </div>
          <h3 className="text-2xl font-bold text-text-primary tracking-tight">AI Appointment Predictions</h3>
        </div>
        <div className="relative z-10">
          <PredictionChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
