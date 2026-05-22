import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ReportSummarizer = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError('');
      setSummary(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleAnalyze = async () => {
    if (!file) return;
    
    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('report', file);

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      };

      const { data } = await axios.post('http://localhost:5000/api/ai/summarize-report', formData, config);
      setSummary(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze the report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[80vh] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-green-100 text-green-700 font-semibold text-sm border border-green-200">
            AI Document Analysis
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Medical Report Summarizer</h1>
          <p className="text-xl text-gray-600">
            Upload your complex medical PDF reports and our AI will translate them into easy-to-understand summaries and actionable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Uploader Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Report</h3>
            
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-5xl mb-4">📄</div>
              {isDragActive ? (
                <p className="text-blue-600 font-medium">Drop the PDF here...</p>
              ) : (
                <div>
                  <p className="text-gray-700 font-medium mb-1">Drag & drop your medical report here</p>
                  <p className="text-gray-500 text-sm">or click to select a file (PDF only, max 10MB)</p>
                </div>
              )}
            </div>

            {file && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg flex justify-between items-center border border-blue-100">
                <div className="flex items-center space-x-3 truncate">
                  <span className="text-blue-600 text-xl">📎</span>
                  <span className="text-blue-800 font-medium truncate">{file.name}</span>
                </div>
                <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500 font-bold px-2">✕</button>
              </div>
            )}

            {error && <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">{error}</div>}

            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="w-full mt-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-blue-300 transition-colors flex justify-center items-center space-x-2"
            >
              {loading ? (
                <span>Extracting & Analyzing...</span>
              ) : (
                <>
                  <span>Generate Summary</span>
                  <span>✨</span>
                </>
              )}
            </button>
          </div>

          {/* Summary Output Section */}
          <div>
            {summary ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in-up">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-green-500 mr-2">✓</span> AI Summary
                </h3>
                
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">Key Observations</h4>
                  <ul className="space-y-2">
                    {summary.keyObservations?.map((obs, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{obs}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">Important Metrics</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600">
                          <th className="p-2 rounded-tl-lg">Metric</th>
                          <th className="p-2">Value</th>
                          <th className="p-2">Normal Range</th>
                          <th className="p-2 rounded-tr-lg">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {summary.importantMetrics?.map((metric, i) => (
                          <tr key={i}>
                            <td className="p-2 font-medium text-gray-800">{metric.metric}</td>
                            <td className="p-2 text-gray-700">{metric.value}</td>
                            <td className="p-2 text-gray-500">{metric.normalRange}</td>
                            <td className="p-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                metric.status?.toLowerCase() === 'normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {metric.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">Suggested Next Steps</h4>
                  <ul className="space-y-2">
                    {summary.suggestedNextSteps?.map((step, i) => (
                      <li key={i} className="flex items-start bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <span className="text-blue-600 mr-2 mt-0.5">👉</span>
                        <span className="text-blue-900">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <p className="text-xs text-gray-400 mt-6 text-center">
                  *Disclaimer: This summary is generated by AI and may contain errors. Always consult your doctor.
                </p>
              </div>
            ) : (
              <div className="h-full bg-white border border-gray-100 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-gray-400 min-h-[400px]">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-center text-lg">Your AI-generated summary will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSummarizer;
