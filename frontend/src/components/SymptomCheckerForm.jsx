import { useState } from 'react';

const SymptomCheckerForm = ({ onSubmit, loading }) => {
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symptoms.trim()) {
      onSubmit(symptoms);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">How are you feeling?</h2>
      <p className="text-gray-600 mb-6">Describe your symptoms in detail so our AI can assist you better.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px] resize-none transition-colors"
            placeholder="E.g., I have been experiencing a mild fever, headache, and a dry cough for the past 2 days..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={loading || !symptoms.trim()}
          className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors flex items-center justify-center space-x-2"
        >
          {loading ? (
            <span>Analyzing...</span>
          ) : (
            <>
              <span>Analyze Symptoms</span>
              <span>✨</span>
            </>
          )}
        </button>
      </form>
      
      <p className="text-xs text-gray-400 mt-4 text-center">
        *Disclaimer: This tool provides AI-generated suggestions and is not a substitute for professional medical advice, diagnosis, or treatment.
      </p>
    </div>
  );
};

export default SymptomCheckerForm;
