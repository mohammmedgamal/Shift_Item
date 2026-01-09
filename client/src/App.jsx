import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import Analytics from './components/Analytics';
import './i18n';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/settings');
      setSettings(res.data);
    } catch (err) {
      console.error('Failed to fetch settings', err);
    }
  };

  return (
    <div className="min-h-screen bg-sec-gray flex flex-col font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow">
        {activeTab === 'home' && <Home settings={settings} />}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'admin' && <Admin />}
        {activeTab === 'analytics' && <Analytics />}
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
