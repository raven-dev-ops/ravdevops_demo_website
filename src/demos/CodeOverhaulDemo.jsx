// components/CodeOverhaul.jsx

import React, { useState, useEffect } from 'react';

const overhaulTasks = [
    { id: 1, name: 'Initial Code Audit', status: 'pending' },
    { id: 2, name: 'Modularize Components', status: 'pending' },
    { id: 3, name: 'Refactor Legacy Logic', status: 'pending' },
    { id: 4, name: 'Upgrade Dependencies', status: 'pending' },
    { id: 5, name: 'Improve Documentation', status: 'pending' },
    { id: 6, name: 'Review & QA', status: 'pending' },
    { id: 7, name: 'Deploy Updated Codebase', status: 'pending' },
];

const CodeOverhaul = () => {
    const [taskResults, setTaskResults] = useState(overhaulTasks);
    const [isRunning, setIsRunning] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && currentTaskIndex < overhaulTasks.length) {
            interval = setInterval(() => {
                setTaskResults(prev =>
                    prev.map((task, idx) =>
                        idx === currentTaskIndex ? { ...task, status: 'done' } : task
                    )
                );
                setCurrentTaskIndex(idx => idx + 1);
            }, 900); // Simulate longer "project" steps
        } else if (currentTaskIndex >= overhaulTasks.length && isRunning) {
            setIsRunning(false);
            setIsComplete(true);
        }
        return () => clearInterval(interval);
    }, [isRunning, currentTaskIndex]);

    const startOverhaul = () => {
        setTaskResults(overhaulTasks.map(t => ({ ...t, status: 'pending' })));
        setCurrentTaskIndex(0);
        setIsComplete(false);
        setIsRunning(true);
    };

    const getStatusColor = (status) =>
        status === 'done' ? 'text-green-700' : 'text-gray-500';

    const getStatusIcon = (status) =>
        status === 'done' ? '✔️' : '…';

    const progress = isComplete ? 100 : (isRunning ? Math.round((currentTaskIndex / overhaulTasks.length) * 100) : 0);
    const buttonText = isComplete ? 'Restart Overhaul' : (isRunning ? `Working... (${progress}%)` : 'Start Overhaul');

    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow p-6 border border-gray-200">
            <h4 className="text-lg font-semibold mb-4 text-center">Code Overhaul Project Management Demo</h4>
            <button
                onClick={startOverhaul}
                disabled={isRunning}
                className={`w-full mb-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {buttonText}
            </button>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>
            <ul className="space-y-1 text-sm max-h-[180px] overflow-y-auto pr-2">
                {taskResults.map(task => (
                    <li key={task.id} className={`flex justify-between items-center p-1 border-b border-gray-100 ${getStatusColor(task.status)}`}>
                        <span>{task.name}</span>
                        <span className="font-mono font-bold text-lg">{getStatusIcon(task.status)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CodeOverhaul;
