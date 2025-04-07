import React, { useState } from 'react';

const initialSteps = [
  // Keep welcome separate if needed, or include in checklist
  // { id: 'welcome', title: 'Welcome Aboard!', content: 'Complete these steps for successful onboarding.' },
  { id: 'hr', title: 'HR Paperwork', content: 'Fill out W-4 and I-9 forms (link placeholder).', done: false },
  { id: 'policy', title: 'Company Policies', content: 'Review the Employee Handbook (link placeholder).', done: false },
  { id: 'safety', title: 'Safety Training Video', content: 'Watch the mandatory safety video (placeholder).', done: false },
  { id: 'team', title: 'Meet the Team', content: 'Schedule introductory meetings.', done: false },
];

const TrainingToolDemo = () => {
    const [checklist, setChecklist] = useState(initialSteps);

    const toggleDone = (id) => {
        setChecklist(prevList =>
            prevList.map(item =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        );
    };

    const completedCount = checklist.filter(item => item.done).length;
    const totalCount = checklist.length;
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6 border border-gray-200">
        <h4 className="text-lg font-semibold mb-1 text-center">New Employee Onboarding</h4>
        <p className="text-xs text-gray-500 mb-4 text-center">Complete these steps for successful onboarding.</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1 dark:bg-gray-700">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
        </div>
         <p className="text-xs text-center text-gray-600 mb-4">{completedCount} of {totalCount} tasks completed ({progress}%)</p>


        <ul className="space-y-2">
            {checklist.map(item => (
                <li key={item.id} className="flex items-center justify-between p-2 border rounded bg-gray-50 border-gray-200">
                     <label htmlFor={`task-${item.id}`} className={`text-sm cursor-pointer ${item.done ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {item.title}
                     </label>
                    {/* Using checkbox for better semantics */}
                     <input
                        id={`task-${item.id}`}
                        type="checkbox"
                        checked={item.done}
                        onChange={() => toggleDone(item.id)}
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                     />
                    {/* Or keep the button if preferred */}
                    {/* <button
                        onClick={() => toggleDone(item.id)}
                        className={`text-xs font-medium px-2 py-1 rounded transition duration-150 ${item.done ? 'bg-gray-200 hover:bg-gray-300 text-gray-600' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                    >
                        {item.done ? 'Undo' : 'Done'}
                    </button> */}
                </li>
             ))}
        </ul>
          <p className="text-xs text-gray-500 mt-3 text-center">
             (Demo showing an interactive onboarding checklist.)
         </p>
    </div>
  );
};

export default TrainingToolDemo; // Default export