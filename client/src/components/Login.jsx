import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { LogIn, ShieldAlert } from 'lucide-react';

const Login = ({ onLogin }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/login', { username, password });
      onLogin(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-sec-blue/10 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-sec-blue/10 p-4 rounded-full mb-4">
            <LogIn className="w-10 h-10 text-sec-blue" />
          </div>
          <h2 className="text-2xl font-bold text-sec-blue">Sign In</h2>
          <p className="text-gray-500 text-sm mt-2 text-center">Enter your Ghazlan Power Station credentials</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 flex items-center gap-2 text-sm border border-red-100">
            <ShieldAlert className="w-5 h-5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">User Name / ID</label>
            <input 
              required
              type="text" 
              className="w-full border-2 border-sec-gray p-3 rounded-xl outline-none focus:border-sec-blue transition-colors"
              placeholder="e.g. 86758 or admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input 
              required
              type="password" 
              className="w-full border-2 border-sec-gray p-3 rounded-xl outline-none focus:border-sec-blue transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-sec-orange text-white py-4 rounded-xl font-bold hover:bg-sec-orange/90 transition-all shadow-lg shadow-sec-orange/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
