import { Link } from 'react-router-dom';
import { Sparkles, Brain, Star, Briefcase } from 'lucide-react';

const DoctorRecommendationCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-[24px] border border-border overflow-hidden relative group transition-all duration-500 hover:shadow-[var(--shadow-glow-ai)] hover:-translate-y-2">
      {/* AI Badge */}
      <div className="absolute top-4 right-4 bg-ai/10 text-ai text-xs font-bold px-3 py-1.5 rounded-full z-10 flex items-center space-x-1.5 backdrop-blur-sm border border-ai/20">
        <Sparkles className="w-3.5 h-3.5" />
        <span>AI Match</span>
      </div>

      <div className="p-8">
        <div className="flex items-center space-x-5 mb-6">
          <div className="w-20 h-20 rounded-[20px] bg-hero-gradient p-0.5 shadow-sm flex-shrink-0">
            <div className="w-full h-full bg-white rounded-[18px] flex items-center justify-center overflow-hidden">
              {doctor.image ? (
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl">👨‍⚕️</span>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-text-primary leading-tight mb-1">{doctor.name}</h3>
            <p className="text-brand font-semibold text-sm tracking-wide">{doctor.specialization}</p>
          </div>
        </div>

        <div className="bg-surface rounded-2xl p-4 border border-border mb-6 group-hover:bg-ai/5 group-hover:border-ai/20 transition-colors">
          <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-2 flex items-center">
            <Brain className="w-3.5 h-3.5 mr-1 text-ai" /> Why this doctor?
          </p>
          <p className="text-sm text-text-primary font-medium flex items-start leading-snug">
            {doctor.matchReason}
          </p>
        </div>

        <div className="flex justify-between items-center mb-6 pt-2">
          <div className="flex items-center text-text-secondary font-medium">
            <Star className="w-4 h-4 mr-1.5 text-yellow-500 fill-yellow-500" /> 4.8
          </div>
          <div className="flex items-center text-text-secondary font-medium">
            <Briefcase className="w-4 h-4 mr-1.5" /> {doctor.experience}
          </div>
          <div className="text-secondary font-bold text-lg">
            ${doctor.fees}
          </div>
        </div>

        <Link 
          to={`/appointment/${doctor._id}`} 
          className="block w-full py-3.5 bg-hero-gradient text-white text-center font-bold rounded-xl shadow-md hover:shadow-glow transition-all duration-300"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
};

export default DoctorRecommendationCard;
