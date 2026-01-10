import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const [stats, setStats] = useState([]);
  const COLORS = ['#005596', '#00A3E0', '#EF4444', '#9CA3AF'];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await axios.get('/api/stats/completion');
    setStats(res.data);
  };

  const groupData = stats.reduce((acc, curr) => {
    const group = acc.find(g => g.name === curr.shift_group);
    if (group) {
      group[curr.status] = curr.count;
    } else {
      acc.push({ name: curr.shift_group, [curr.status]: curr.count });
    }
    return acc;
  }, []);

  const statusTotals = stats.reduce((acc, curr) => {
    const status = acc.find(s => s.name === curr.status);
    if (status) {
      status.value += curr.count;
    } else {
      acc.push({ name: curr.status, value: curr.count });
    }
    return acc;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-sec-blue mb-8">Operational Performance Analytics</h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Bar Chart: Group Comparison */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-xl font-bold mb-6">Shift Group Comparison</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={groupData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Done" fill="#005596" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Partly Done" fill="#00A3E0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Skipped" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Status Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-xl font-bold mb-6">Overall Task Status</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusTotals}
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusTotals.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

