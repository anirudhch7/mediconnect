import React from 'react';

const TermsOfService = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-blue max-w-none text-gray-600">
            <p className="text-lg mb-6">Last updated: May 21, 2026</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Agreement to Terms</h2>
            <p className="mb-6">
              By accessing or using MediConnect AI, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you do not have permission to access the Service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Medical Disclaimer</h2>
            <p className="mb-6 font-semibold text-red-600 bg-red-50 p-4 rounded-lg border border-red-100">
              The AI Symptom Checker and Report Summarizer provided by MediConnect AI are for informational purposes only and do not constitute professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified health provider with any questions you may have regarding a medical condition. In case of a medical emergency, call your doctor or emergency services immediately.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. User Accounts</h2>
            <p className="mb-4">When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>You are responsible for safeguarding the password that you use to access the Service.</li>
              <li>You agree not to disclose your password to any third party.</li>
              <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Appointment Booking and Cancellations</h2>
            <p className="mb-6">
              Through the platform, users can book appointments with healthcare providers. If you need to cancel or reschedule, you must do so at least 24 hours in advance. Repeated no-shows or late cancellations may result in a suspension of booking privileges.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Intellectual Property</h2>
            <p className="mb-6">
              The Service and its original content, features, and functionality are and will remain the exclusive property of MediConnect AI and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Changes to Terms</h2>
            <p className="mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
