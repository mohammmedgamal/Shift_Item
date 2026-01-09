import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Edit2 } from 'lucide-react';

const Admin = () => {
  const [duties, setDuties] = useState([]);
  const [newDuty, setNewDuty] = useState({
    title_en: '', title_ar: '', frequency: 'daily', shift_type: 'Morning', day_of_week: '', day_of_month: ''
  });

  useEffect(() => {
    fetchDuties();
  }, []);

  const fetchDuties = async () => {
    const res = await axios.get('http://localhost:5001/api/duties');
    setDuties(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/admin/duties', newDuty);
    setNewDuty({ title_en: '', title_ar: '', frequency: 'daily', shift_type: 'Morning', day_of_week: '', day_of_month: '' });
    fetchDuties();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`http://localhost:5001/api/admin/duties/${id}`);
      fetchDuties();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-sec-blue mb-8">Management Panel</h2>
      
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
    </div>
  );
};

export default Admin;

