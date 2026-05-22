import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">M</div>
            <span className="text-xl font-bold">MediConnect AI</span>
          </div>
          <p className="text-gray-400 max-w-sm mb-6">
            Your trusted AI-powered platform for seamless doctor appointments, medical report analysis, and predictive healthcare insights.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link to="/doctors" className="text-gray-400 hover:text-blue-400 transition-colors">All Doctors</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            <li><Link to="/doctor/login" className="text-gray-400 hover:text-blue-400 transition-colors">Doctor Portal</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} MediConnect AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
