import React, { useState, useEffect } from 'react';

const tests = [
    { id: 1, name: 'Login Flow Test', status: 'pending' },
    { id: 2, name: 'User Profile Update', status: 'pending' },
    { id: 3, name: 'Payment Gateway Integration', status: 'pending' },
    { id: 4, name: 'Admin Dashboard Access', status: 'pending' },
    { id: 5, name: 'Logout Functionality', status: 'pending' },
];

const TestingDemo = () => {
    const [testResults, setTestResults] = useState(tests.map(t => ({ ...t, status: 'pending' }))); // Initialize as pending
    const [isRunning, setIsRunning] = useState(false);
    const [currentTestIndex, setCurrentTestIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && currentTestIndex < tests.length) {
            interval = setInterval(() => {
                setTestResults(prevResults =>
                    prevResults.map((test, index) => {
                        if (index === currentTestIndex) {
                            // Simulate pass/fail (e.g., 80% pass rate)
                            return { ...test, status: Math.random() > 0.2 ? 'passed' : 'failed' };
                        }
                        return test;
                    })
                );
                setCurrentTestIndex(prevIndex => prevIndex + 1);
            }, 700); // Time per test
        } else if (currentTestIndex >= tests.length && isRunning) {
            // Ensure we set complete and stop running only once when done
            setIsRunning(false);
            setIsComplete(true);
        }

        return () => clearInterval(interval); // Cleanup interval on unmount or when stopping
    }, [isRunning, currentTestIndex]);

    const startTests = () => {
        // Reset tests before starting
        setTestResults(tests.map(t => ({ ...t, status: 'pending' })));
        setCurrentTestIndex(0);
        setIsComplete(false);
        setIsRunning(true);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'passed': return 'text-green-600';
            case 'failed': return 'text-red-600';
            default: return 'text-gray-500';
        }
    };
     const getStatusIcon = (status) => {
        switch (status) {
            case 'passed': return '✓';
            case 'failed': return '✕';
            default: return '…';
        }
    };

    const progress = isComplete ? 100 : (isRunning ? Math.round((currentTestIndex / tests.length) * 100) : 0);
    const buttonText = isComplete ? 'Run Again' : (isRunning ? `Running Tests... (${progress}%)` : 'Run Tests');

    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow p-6 border border-gray-200">
            <h4 className="text-lg font-semibold mb-4 text-center">Automated Test Suite Simulation</h4>
            <button
                onClick={startTests}
                disabled={isRunning}
                className={`w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {buttonText}
            </button>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>

            <ul className="space-y-1 text-sm max-h-[150px] overflow-y-auto pr-2"> {/* Max height and scroll */}
                {testResults.map(test => (
                    <li key={test.id} className={`flex justify-between items-center p-1 border-b border-gray-100 ${getStatusColor(test.status)}`}>
                        <span>{test.name}</span>
                        <span className="font-mono font-bold text-lg">{getStatusIcon(test.status)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TestingDemo; // Default export