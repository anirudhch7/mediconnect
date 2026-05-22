import { useState } from 'react';
import axios from 'axios';
import SymptomCheckerForm from '../components/SymptomCheckerForm';
import SymptomResultCard from '../components/SymptomResultCard';

const SymptomChecker = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (symptoms) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const token = localStorage.getItem('token');
      // If user is logged in, pass token, otherwise can be guest (if backend allows)
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      
      const { data } = await axios.post('http://localhost:5000/api/ai/symptom-check', { symptoms }, config);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm border border-blue-200">
            Powered by AI
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">AI Symptom Checker</h1>
          <p className="text-xl text-gray-600">
            Describe how you are feeling, and our advanced medical AI will help identify possible conditions and guide you to the right specialist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div>
            <SymptomCheckerForm onSubmit={handleAnalyze} loading={loading} />
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                {error}
              </div>
            )}
          </div>
          
          <div>
            {result ? (
              <SymptomResultCard result={result} />
            ) : (
              <div className="h-full bg-white border border-gray-100 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-gray-400 min-h-[400px]">
                <div className="text-6xl mb-4">🩺</div>
                <p className="text-center text-lg">Your analysis results will appear here once you submit your symptoms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
