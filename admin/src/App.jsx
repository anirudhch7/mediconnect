import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddDoctor from './pages/AddDoctor';
import AllDoctors from './pages/AllDoctors';
import AllAppointments from './pages/AllAppointments';

function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');

  return (
    <BrowserRouter>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <div className="flex h-screen bg-surface">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* Background Decorative Blob */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand/5 blur-3xl mix-blend-multiply pointer-events-none"></div>
            
            <Navbar setToken={setToken} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-6 z-10 relative">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctors" element={<AllDoctors />} />
                <Route path="/appointments" element={<AllAppointments />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
