import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import Analytics from './components/Analytics';
import Login from './components/Login';
import './i18n';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [settings, setSettings] = useState({});
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/settings');
      setSettings(res.data);
    } catch (err) {
      console.error('Failed to fetch settings', err);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setActiveTab('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setActiveTab('home');
  };

  // Logic to restrict access
  const canAccess = (tab) => {
    if (tab === 'home') return true;
    if (!user) return false;
    if (tab === 'admin') return user.role === 'admin';
    return true; // Dashboard and Analytics need any login
  };

  return (
    <div className="min-h-screen bg-sec-gray flex flex-col font-sans">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        onLogout={handleLogout} 
        canAccess={canAccess}
      />
      
      <main className="flex-grow">
        {activeTab === 'home' && <Home settings={settings} />}
        {!user && activeTab !== 'home' && <Login onLogin={handleLogin} />}
        {user && activeTab === 'dashboard' && <Dashboard />}
        {user && activeTab === 'admin' && user.role === 'admin' && <Admin />}
        {user && activeTab === 'analytics' && <Analytics />}
        {user && activeTab === 'admin' && user.role !== 'admin' && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
            <p className="text-gray-500">Only administrators can access this page.</p>
          </div>
        )}
      </main>

      <footer className="bg-sec-blue text-white py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-2xl font-bold">SEC</div>
            <div className="text-sec-lightBlue">GPP1 Shift Duties</div>
            <div className="text-sm opacity-60">© 2026 Saudi Electricity Company. All rights reserved.</div>
          </div>
          <div className="flex gap-8 text-sm opacity-80">
            <a href="#" className="hover:text-sec-lightBlue transition-colors">Contact Support</a>
            <a href="#" className="hover:text-sec-lightBlue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sec-lightBlue transition-colors">Internal Portal</a>
          </div>
      </div>
      </footer>
      </div>
  );
}

export default App;
