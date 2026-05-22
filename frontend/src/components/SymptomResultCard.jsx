import { Link } from 'react-router-dom';

const SymptomResultCard = ({ result }) => {
  if (!result) return null;

  const getUrgencyColor = (urgency) => {
    switch(urgency?.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200 animate-pulse';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in-up">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Analysis Results</h3>
        <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getUrgencyColor(result.urgency)}`}>
          Urgency: {result.urgency}
        </span>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">🔬</span> Possible Conditions
        </h4>
        <div className="space-y-3">
          {result.conditions?.map((condition, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <span className="font-medium text-gray-800">{condition.name}</span>
              <div className="flex items-center">
                <div className="w-24 h-2 bg-gray-200 rounded-full mr-3 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${condition.likelihood}%` }}></div>
                </div>
                <span className="text-sm font-bold text-gray-600 w-12 text-right">{condition.likelihood}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
          <span className="mr-2">👨‍⚕️</span> Recommended Specialist
        </h4>
        <p className="text-blue-800 font-medium text-lg mb-4">{result.specialist}</p>
        
        <Link 
          to={`/doctors?specialty=${result.specialist}`}
          className="inline-block w-full text-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Find a {result.specialist}
        </Link>
      </div>
    </div>
  );
};

export default SymptomResultCard;
