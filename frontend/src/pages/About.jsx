import React from 'react';
import { Activity, ShieldCheck, Zap, Brain, Users, FileText } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">About MediConnect AI</h1>
          <p className="text-xl text-gray-600">
            We are revolutionizing healthcare by combining advanced Artificial Intelligence with seamless patient-doctor connectivity, ensuring smarter, faster, and more accessible care for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Brain className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Symptom Checker</h3>
              <p className="text-gray-600">
                Describe your symptoms naturally, and our AI will triage your condition, providing potential causes and recommending the right specialist.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Report Summarizer</h3>
              <p className="text-gray-600">
                Upload complex medical reports and lab results. Our system extracts key metrics and translates medical jargon into easy-to-understand summaries.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Doctor Matching</h3>
              <p className="text-gray-600">
                Find the perfect specialist based on your AI diagnosis, location, and preferred appointment time. View verified reviews before booking.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center text-brand mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Seamless Booking</h3>
              <p className="text-gray-600">
                Book, reschedule, or cancel appointments in seconds. Say goodbye to long wait times on the phone.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Doctor Portal</h3>
              <p className="text-gray-600">
                A dedicated portal for doctors to manage their schedules, view patient history, and track their daily earnings securely.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Health Tracking</h3>
              <p className="text-gray-600">
                Keep all your past appointments, prescriptions, and medical history organized in one easily accessible dashboard.
              </p>
            </div>

          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-3xl p-10 lg:p-16 border border-gray-100 shadow-sm text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            "To democratize healthcare access by leveraging artificial intelligence, reducing friction in appointment booking, and empowering patients to take control of their own health journey."
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
