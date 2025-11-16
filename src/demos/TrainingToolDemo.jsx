// demos/TrainingToolDemo.jsx

import React, { useState } from 'react';

const steps = [
  { id: 'hr', title: 'HR Paperwork', content: 'Complete the W-4 and I-9 forms in the HR portal.', tip: 'HR forms are required for payroll and tax purposes.' },
  { id: 'policy', title: 'Company Policies', content: 'Review the Employee Handbook in the company resource center.', tip: 'Understanding policies helps prevent workplace confusion.' },
  { id: 'safety', title: 'Safety Training Video', content: 'Watch the mandatory safety video in the training platform.', tip: 'Safety training reduces accidents and injuries.' },
  { id: 'team', title: 'Meet the Team', content: 'Schedule introductory meetings.', tip: 'Building relationships early boosts team success.' },
  { id: 'equipment', title: 'Equipment Setup', content: 'Set up your laptop, monitor, and log in to required software.', tip: 'Proper setup saves you headaches later.' },
  { id: 'first-task', title: 'First Task Assignment', content: 'Receive your first small project or assignment.', tip: 'Hands-on tasks help you learn by doing.' },
  { id: 'feedback', title: 'First Week Feedback', content: 'Attend a feedback/check-in session with your manager.', tip: 'Early feedback ensures you’re on the right track.' },
];

const TrainingToolDemo = () => {
    const [checklist, setChecklist] = useState(steps.map(step => ({ ...step, done: false, showTip: false })));
    const [showCongrats, setShowCongrats] = useState(false);

    const toggleDone = (id) => {
        setChecklist(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        done: !item.done,
                        showTip: !item.done // Show tip only when checking, not unchecking
                    }
                    : item
            )
        );
    };

    React.useEffect(() => {
        // Check if all are done
        if (checklist.every(item => item.done)) {
            // Delay a bit for last tip to show
            setTimeout(() => setShowCongrats(true), 600);
        } else {
            setShowCongrats(false);
        }
    }, [checklist]);

    const dismissTip = (id) => {
        setChecklist(prev =>
            prev.map(item =>
                item.id === id ? { ...item, showTip: false } : item
            )
        );
    };

    const resetDemo = () => {
        setChecklist(steps.map(step => ({ ...step, done: false, showTip: false })));
        setShowCongrats(false);
    };

    const completedCount = checklist.filter(item => item.done).length;
    const totalCount = checklist.length;
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6 border border-gray-200 min-h-[330px] flex flex-col">
            <h4 className="text-lg font-semibold mb-1 text-center">New Employee Onboarding</h4>
            <p className="text-xs text-gray-500 mb-4 text-center">Complete all steps to finish onboarding. Click each for a helpful tip!</p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>
            <p className="text-xs text-center text-gray-600 mb-4">{completedCount} of {totalCount} tasks completed ({progress}%)</p>

            {!showCongrats ? (
                <>
                    <ul className="space-y-2 mb-2">
                        {checklist.map(item => (
                            <li key={item.id} className="relative flex items-center justify-between p-2 border rounded bg-gray-50 border-gray-200">
                                <label
                                    htmlFor={`task-${item.id}`}
                                    className={`text-sm cursor-pointer ${item.done ? 'line-through text-gray-500' : 'text-gray-800'}`}
                                >
                                    {item.title}
                                </label>
                                <input
                                    id={`task-${item.id}`}
                                    type="checkbox"
                                    checked={item.done}
                                    onChange={() => toggleDone(item.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                                />
                                {/* Tip Popover */}
                                {item.showTip && (
                                    <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs px-3 py-2 rounded shadow z-10">
                                        <span>{item.tip}</span>
                                        <button
                                            onClick={() => dismissTip(item.id)}
                                            className="ml-2 text-yellow-700 underline text-xs"
                                        >
                                            Close
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                        (Demo showing a multi-step onboarding checklist with tips.)
                    </p>
                </>
            ) : (
                // Congratulations Screen
                <div className="flex flex-col flex-grow justify-center items-center">
                    <div className="text-green-700 font-bold text-lg mb-3 text-center">Congratulations!</div>
                    <div className="text-gray-700 text-center mb-3">
                        You’ve completed onboarding.<br />
                        Well-done! Early progress builds confidence and momentum for your new job.<br />
                        Need an onboarding app like this?
                    </div>
                    <button
                        onClick={resetDemo}
                        className="mt-1 text-sm text-blue-600 hover:underline block mx-auto"
                    >
                        Start Over
                    </button>
                </div>
            )}
        </div>
    );
};

export default TrainingToolDemo;
