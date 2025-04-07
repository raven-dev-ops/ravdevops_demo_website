import React, { useState } from 'react';

// Placeholder data
const initialData = { users: 125, revenue: 4500, growth: 15 };
const newData = { users: 138, revenue: 4950, growth: 18 };

const SaaSDashboardDemo = () => {
    const [data, setData] = useState(initialData);
    const [period, setPeriod] = useState('This Month');

    const toggleData = () => {
        if (period === 'This Month') {
            setData(newData);
            setPeriod('Next Month Projection');
        } else {
            setData(initialData);
            setPeriod('This Month');
        }
    };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow p-6 border border-gray-200 text-center">
        <h4 className="text-xl font-semibold mb-4 text-raven-dark">{period} Overview</h4>
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded text-center border border-blue-100">
                <div className="text-xs text-blue-600 uppercase font-semibold">Active Users</div>
                <div className="text-2xl font-bold text-raven-blue">{data.users}</div>
            </div>
             <div className="bg-green-50 p-3 rounded text-center border border-green-100">
                <div className="text-xs text-green-600 uppercase font-semibold">MRR</div>
                <div className="text-2xl font-bold text-green-700">${data.revenue}</div>
            </div>
             <div className="bg-purple-50 p-3 rounded text-center border border-purple-100">
                <div className="text-xs text-purple-600 uppercase font-semibold">Growth %</div>
                <div className="text-2xl font-bold text-purple-700">{data.growth}%</div>
            </div>
        </div>
         <button
            onClick={toggleData}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded text-sm transition duration-200"
         >
            Toggle Period View
         </button>
         <p className="text-xs text-gray-500 mt-4">
             (Demo showing basic SaaS metrics dashboard)
         </p>
    </div>
  );
};

export default SaaSDashboardDemo; // Default export