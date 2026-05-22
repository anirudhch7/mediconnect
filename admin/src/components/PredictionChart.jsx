import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const PredictionChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('http://localhost:5000/api/ai/predict-appointments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Transform the upcomingDemandForecast array into recharts format
        if (res.data && res.data.upcomingDemandForecast) {
          const chartData = res.data.upcomingDemandForecast.map(item => ({
            name: item.specialty,
            volume: item.expectedVolume === 'High' ? 100 : item.expectedVolume === 'Medium' ? 50 : 20
          }));
          setData(chartData);
        }
      } catch (error) {
        console.error('Failed to fetch predictions', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPredictions();
  }, []);

  if (loading) return <div className="h-64 flex items-center justify-center text-gray-500">Loading AI Predictions...</div>;

  return (
    <div className="h-80 w-full mt-4">
      <h4 className="text-sm font-semibold text-gray-600 mb-4 text-center">Predicted Upcoming Demand by Specialty</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="name" tick={{fill: '#6B7280', fontSize: 12}} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip 
            cursor={{fill: '#F3F4F6'}} 
            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
          />
          <Bar dataKey="volume" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Expected Volume Index" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart;
