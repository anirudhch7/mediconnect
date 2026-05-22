import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-blue max-w-none text-gray-600">
            <p className="text-lg mb-6">Last updated: May 21, 2026</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Introduction</h2>
            <p className="mb-6">
              Welcome to MediConnect AI. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. The Data We Collect About You</h2>
            <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, and date of birth.</li>
              <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
              <li><strong>Health Data</strong> includes symptom descriptions, uploaded medical reports, appointment history, and diagnoses generated via our AI tools.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, and operating system.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. How We Use Your Personal Data</h2>
            <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., booking an appointment).</li>
              <li>To provide our AI symptom checking and report summarization services.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Data Security</h2>
            <p className="mb-6">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. Health data, in particular, is encrypted both in transit and at rest. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about this privacy policy or our privacy practices, please contact our data privacy manager at privacy@mediconnect.ai.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
