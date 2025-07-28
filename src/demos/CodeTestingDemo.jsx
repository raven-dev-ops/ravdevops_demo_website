// components/CodeTesting.jsx

import React, { useState, useEffect } from 'react';

const auditSteps = [
    { id: 1, name: 'Static Code Analysis', status: 'pending' },
    { id: 2, name: 'Identify Risk Areas', status: 'pending' },
    { id: 3, name: 'Generate Test Cases', status: 'pending' },
    { id: 4, name: 'Run Automated Tests', status: 'pending' },
    { id: 5, name: 'Generate Coverage Report', status: 'pending' },
];

const fakeCoverage = () => {
    // Simulate random coverage for fun/demo
    return 75 + Math.round(Math.random() * 20); // 75-95%
};

const CodeTesting = () => {
    const [stepResults, setStepResults] = useState(auditSteps);
    const [isRunning, setIsRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [coverage, setCoverage] = useState(null);

    useEffect(() => {
        let interval;
        if (isRunning && currentStep < auditSteps.length) {
            interval = setInterval(() => {
                setStepResults(prev =>
                    prev.map((step, idx) =>
                        idx === currentStep ? { ...step, status: 'done' } : step
                    )
                );
                setCurrentStep(idx => idx + 1);
            }, 850);
        } else if (currentStep >= auditSteps.length && isRunning) {
            setIsRunning(false);
            setIsComplete(true);
            setCoverage(fakeCoverage());
        }
        return () => clearInterval(interval);
    }, [isRunning, currentStep]);

    const startAudit = () => {
        setStepResults(auditSteps.map(s => ({ ...s, status: 'pending' })));
        setCurrentStep(0);
        setIsComplete(false);
        setIsRunning(true);
        setCoverage(null);
    };

    const getStatusColor = (status) =>
        status === 'done' ? 'text-blue-700' : 'text-gray-500';

    const getStatusIcon = (status) =>
        status === 'done' ? '✔️' : '…';

    const progress = isComplete ? 100 : (isRunning ? Math.round((currentStep / auditSteps.length) * 100) : 0);
    const buttonText = isComplete ? 'Audit Again' : (isRunning ? `Auditing... (${progress}%)` : 'Start Audit');

    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow p-6 border border-gray-200">
            <h4 className="text-lg font-semibold mb-4 text-center">Code Testing & Audit Demo</h4>
            <button
                onClick={startAudit}
                disabled={isRunning}
                className={`w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {buttonText}
            </button>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>
            <ul className="space-y-1 text-sm max-h-[150px] overflow-y-auto pr-2">
                {stepResults.map(step => (
                    <li key={step.id} className={`flex justify-between items-center p-1 border-b border-gray-100 ${getStatusColor(step.status)}`}>
                        <span>{step.name}</span>
                        <span className="font-mono font-bold text-lg">{getStatusIcon(step.status)}</span>
                    </li>
                ))}
            </ul>
            {isComplete && (
                <div className="mt-6 text-center">
                    <div className="text-sm text-gray-500 mb-1">Coverage Report</div>
                    <span className={`text-3xl font-bold ${coverage > 85 ? 'text-green-600' : 'text-yellow-600'}`}>{coverage}%</span>
                    <div className="text-xs text-gray-400 mt-1">Unit test coverage achieved</div>
                </div>
            )}
        </div>
    );
};

export default CodeTesting;
