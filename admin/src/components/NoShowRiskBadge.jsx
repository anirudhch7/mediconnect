import { useState, useEffect } from 'react';
import axios from 'axios';

const NoShowRiskBadge = ({ appointmentId }) => {
  const [riskScore, setRiskScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRisk = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const { data } = await axios.get(`http://localhost:5000/api/ai/no-show-risk/${appointmentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRiskScore(data.riskScore);
      } catch (error) {
        console.error('Error fetching no-show risk', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRisk();
  }, [appointmentId]);

  if (loading) return <span className="text-xs text-gray-400">Analyzing...</span>;
  if (riskScore === null) return null;

  let colorClass = 'bg-green-100 text-green-700 border-green-200';
  let label = 'Low Risk';

  if (riskScore >= 0.7) {
    colorClass = 'bg-red-100 text-red-700 border-red-200';
    label = 'High Risk';
  } else if (riskScore >= 0.4) {
    colorClass = 'bg-yellow-100 text-yellow-700 border-yellow-200';
    label = 'Medium Risk';
  }

  return (
    <div className="flex items-center space-x-1" title={`AI Risk Score: ${(riskScore * 100).toFixed(0)}%`}>
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${colorClass}`}>
        {label}
      </span>
      <span className="text-[10px] text-gray-400">🤖</span>
    </div>
  );
};

export default NoShowRiskBadge;
