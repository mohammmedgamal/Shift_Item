import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getCurrentShift } from '../utils/shiftRotation';
import { CheckCircle, Clock, AlertCircle, HelpCircle, Save } from 'lucide-react';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentShift, setCurrentShift] = useState(getCurrentShift());
  const [activeTab, setActiveTab] = useState('daily');
  const [operatorName, setOperatorName] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser).name : '';
  });

  useEffect(() => {
    fetchTasks();
  }, [currentShift, activeTab]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/tasks/today', {
        params: {
          date: currentShift.date,
          shift_type: currentShift.type,
          shift_group: currentShift.group
        }
      });
      // Filter by active tab (Daily/Weekly/Monthly)
      const filtered = res.data.filter(task => task.frequency === activeTab);
      setTasks(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, status) => {
    const task = tasks.find(t => t.id === taskId);
    try {
      await axios.post('/api/logs', {
        duty_id: taskId,
        date: currentShift.date,
        shift_group: currentShift.group,
        shift_type: currentShift.type,
        status: status,
        operator_name: operatorName || 'Operator',
        feedback: task.feedback || ''
      });
      // Refresh tasks
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFeedbackChange = (taskId, feedback) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, feedback } : t));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done': return 'text-green-600 bg-green-50 border-green-200';
      case 'Partly Done': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Skipped': return 'text-red-600 bg-red-50 border-red-200';
      case 'Not Due': return 'text-gray-400 bg-gray-50 border-gray-200';
      default: return 'text-gray-500 bg-white border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-sec-blue/10">
        <div>
          <h2 className="text-2xl font-bold text-sec-blue">{t('dashboard')}</h2>
          <div className="flex gap-4 mt-2 text-sm">
            <span className="bg-sec-blue/10 text-sec-blue px-3 py-1 rounded-full font-semibold">
              {t('shift_group')}: {currentShift.group}
            </span>
            <span className="bg-sec-orange/10 text-sec-orange px-3 py-1 rounded-full font-semibold">
              {t('shift_type')}: {t(currentShift.type.toLowerCase())}
            </span>
            <span className="text-gray-500">{currentShift.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input 
            readOnly
            type="text" 
            placeholder="Operator Name" 
            className="border p-2 rounded-lg text-sm outline-none bg-gray-50 text-gray-500 cursor-not-allowed"
            value={operatorName}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {['daily', 'weekly', 'monthly'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              activeTab === tab 
                ? 'bg-sec-orange text-white shadow-md transform scale-105' 
                : 'bg-white text-gray-500 hover:bg-sec-gray'
            }`}
          >
            {t(tab)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border-2 border-dashed">No duties assigned for this shift</div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">
                    {i18n.language === 'ar' ? task.title_ar : task.title_en}
                  </h4>
                  {task.description_en && (
                    <p className="text-gray-600 text-sm mt-1">
                      {i18n.language === 'ar' ? task.description_ar : task.description_en}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <select 
                    value={task.status || ''} 
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className={`px-4 py-2 rounded-lg border text-sm font-semibold outline-none ${getStatusColor(task.status)}`}
                  >
                    <option value="">Select Status</option>
                    <option value="Done">{t('done')}</option>
                    <option value="Partly Done">{t('partly_done')}</option>
                    <option value="Skipped">{t('skipped')}</option>
                    <option value="Not Due">{t('not_due')}</option>
                  </select>
                  
                  <div className="flex-1 min-w-[200px] flex items-center gap-2">
                    <input 
                      type="text" 
                      placeholder={t('feedback')}
                      className="w-full border p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-sec-blue"
                      value={task.feedback || ''}
                      onChange={(e) => handleFeedbackChange(task.id, e.target.value)}
                    />
                    <button 
                      onClick={() => handleStatusChange(task.id, task.status)}
                      className="p-2 text-sec-blue hover:bg-sec-blue/10 rounded-lg"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

