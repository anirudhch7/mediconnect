import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import AllDoctors from './pages/AllDoctors';
import Appointment from './pages/Appointment';
import MyAppointments from './pages/MyAppointments';
import Profile from './pages/Profile';
import SymptomChecker from './pages/SymptomChecker';
import ReportSummarizer from './pages/ReportSummarizer';
import ChatbotWidget from './components/ChatbotWidget';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Doctor Pages
import DoctorLogin from './pages/doctor/DoctorLogin';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorProfile from './pages/doctor/DoctorProfile';

const AppContent = () => {
  const location = useLocation();
  const isDoctorRoute = location.pathname.startsWith('/doctor/');

  return (
    <div className="flex flex-col min-h-screen">
      {!isDoctorRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<AllDoctors />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/report-summarizer" element={<ReportSummarizer />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          
          {/* Doctor Routes */}
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
        </Routes>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
