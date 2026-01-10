import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Edit2, History, Settings, Calendar, Search } from 'lucide-react';
import { getShiftForDate } from '../utils/shiftRotation';

const Admin = () => {
  const [activeSubTab, setActiveSubTab] = useState('manage'); // 'manage' or 'review'
  const [duties, setDuties] = useState([]);
  const [newDuty, setNewDuty] = useState({
    title_en: '', title_ar: '', frequency: 'daily', shift_type: 'Morning', day_of_week: '', day_of_month: ''
  });

  // Review Logs State
  const [reviewDate, setReviewDate] = useState(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  });
  const [reviewShiftType, setReviewShiftType] = useState('Morning');
  const [pastLogs, setPastLogs] = useState([]);
  const [isReviewLoading, setIsReviewLoading] = useState(false);

  useEffect(() => {
    if (activeSubTab === 'manage') {
      fetchDuties();
    }
  }, [activeSubTab]);

  const fetchDuties = async () => {
    const res = await axios.get('/api/duties');
    setDuties(res.data);
  };

  const handleFetchLogs = async () => {
    setIsReviewLoading(true);
    try {
      const group = getShiftForDate(reviewDate, reviewShiftType);
      const res = await axios.get('/api/tasks/today', {
        params: {
          date: reviewDate,
          shift_type: reviewShiftType,
          shift_group: group
        }
      });
      setPastLogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsReviewLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post('/api/admin/duties', newDuty);
    setNewDuty({ title_en: '', title_ar: '', frequency: 'daily', shift_type: 'Morning', day_of_week: '', day_of_month: '' });
    fetchDuties();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`/api/admin/duties/${id}`);
      fetchDuties();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done': return 'text-green-600 bg-green-50';
      case 'Partly Done': return 'text-yellow-600 bg-yellow-50';
      case 'Skipped': return 'text-red-600 bg-red-50';
      case 'Not Due': return 'text-gray-400 bg-gray-50';
      default: return 'text-gray-400 bg-gray-50 italic';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-sec-blue">Admin Panel</h2>
        
        <div className="flex bg-white rounded-xl p-1 shadow-sm border">
          <button 
            onClick={() => setActiveSubTab('manage')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSubTab === 'manage' ? 'bg-sec-orange text-white' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            Manage Duties
          </button>
          <button 
            onClick={() => setActiveSubTab('review')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSubTab === 'review' ? 'bg-sec-orange text-white' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <History className="w-4 h-4" />
            Review Past Logs
          </button>
        </div>
      </div>
      
      {activeSubTab === 'manage' ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Duty Form */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border h-fit sticky top-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-sec-blue" />
              Add New Duty
            </h3>
            <form onSubmit={handleAdd} className="space-y-4 text-gray-800">
              <input 
                required
                placeholder="English Title" 
                className="w-full border p-2 rounded-lg bg-white"
                value={newDuty.title_en}
                onChange={e => setNewDuty({...newDuty, title_en: e.target.value})}
              />
              <input 
                required
                placeholder="Arabic Title" 
                className="w-full border p-2 rounded-lg text-right bg-white"
                value={newDuty.title_ar}
                onChange={e => setNewDuty({...newDuty, title_ar: e.target.value})}
              />
              <select 
                className="w-full border p-2 rounded-lg bg-white"
                value={newDuty.frequency}
                onChange={e => setNewDuty({...newDuty, frequency: e.target.value})}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <select 
                className="w-full border p-2 rounded-lg bg-white"
                value={newDuty.shift_type}
                onChange={e => setNewDuty({...newDuty, shift_type: e.target.value})}
              >
                <option value="Morning">Morning</option>
                <option value="Night">Night</option>
                <option value="Both">Both</option>
              </select>
              <button type="submit" className="w-full bg-sec-orange text-white py-2 rounded-lg hover:bg-sec-orange/80 transition-colors">
                Add Duty
              </button>
            </form>
          </div>

          {/* Duty List */}
          <div className="lg:col-span-2 space-y-4">
            {duties.map(duty => (
              <div key={duty.id} className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-800">{duty.title_en}</h4>
                  <p className="text-gray-500 text-sm">{duty.frequency} - {duty.shift_type}</p>
                </div>
                <button 
                  onClick={() => handleDelete(duty.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Review Filter Bar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-wrap gap-6 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sec-blue" />
                Select Date
              </label>
              <input 
                type="date" 
                className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-sec-orange"
                value={reviewDate}
                onChange={(e) => setReviewDate(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-gray-700 mb-2">Shift Type</label>
              <select 
                className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-sec-orange"
                value={reviewShiftType}
                onChange={(e) => setReviewShiftType(e.target.value)}
              >
                <option value="Morning">Morning</option>
                <option value="Night">Night</option>
              </select>
            </div>
            <button 
              onClick={handleFetchLogs}
              className="bg-sec-blue text-white px-8 py-2 rounded-lg font-bold hover:bg-sec-lightBlue transition-all flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              View Logs
            </button>
          </div>

          {/* Past Logs Table */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <span className="font-bold text-gray-700">Logs for {reviewDate} ({reviewShiftType})</span>
              <span className="bg-sec-blue/10 text-sec-blue px-3 py-1 rounded-full text-xs font-bold">
                Shift Group: {getShiftForDate(reviewDate, reviewShiftType)}
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b text-gray-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Duty Title</th>
                    <th className="px-6 py-4">Operator</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Feedback</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {isReviewLoading ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-400">Loading historical data...</td>
                    </tr>
                  ) : pastLogs.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-400">No records found for this selection. Click "View Logs" to search.</td>
                    </tr>
                  ) : (
                    pastLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{log.title_en}</td>
                        <td className="px-6 py-4 text-gray-600">{log.operator_name || '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(log.status)}`}>
                            {log.status || 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 max-w-xs truncate" title={log.feedback}>
                          {log.feedback || '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
