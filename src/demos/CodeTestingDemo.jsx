// demos/CodeTestingDemo.jsx

import React, { useState } from 'react';

const auditSteps = [
    {
        id: 1,
        name: 'Static Code Analysis',
        prompt: 'Name a tool for static code analysis in JavaScript:',
        answer: 'ESLint, JSHint, SonarQube, etc.',
    },
    {
        id: 2,
        name: 'Identify Risk Areas',
        prompt: 'What kind of code poses the highest risk for bugs?',
        answer: 'Complex, untested, or duplicated code.',
    },
    {
        id: 3,
        name: 'Generate Test Cases',
        prompt: 'What is a good test case example for a login function?',
        answer: 'Test with valid and invalid credentials.',
    },
    {
        id: 4,
        name: 'Run Automated Tests',
        prompt: 'Which npm command commonly runs tests?',
        answer: '`npm test` or `yarn test`',
    },
    {
        id: 5,
        name: 'Generate Coverage Report',
        prompt: 'What does code coverage measure?',
        answer: 'How much of your codebase is tested by automated tests.',
    },
];

const reviewQuiz = [
    {
        question: "Which is more important: code coverage percentage, or meaningful tests?",
        options: [
            "High code coverage percentage",
            "Meaningful, well-designed tests",
            "Neither matters",
        ],
        correct: 1,
    },
    {
        question: "If a test fails, what should you do first?",
        options: [
            "Ignore it",
            "Investigate the cause and fix the issue",
            "Delete the test",
        ],
        correct: 1,
    },
];

const fakeCoverage = () => 75 + Math.round(Math.random() * 20); // 75-95%

const CodeTesting = () => {
    const [step, setStep] = useState(0); // 0 = not started
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [coverage, setCoverage] = useState(null);
    const [reviewStep, setReviewStep] = useState(0);
    const [reviewAnswers, setReviewAnswers] = useState([]);
    const complete = step > auditSteps.length;

    const startAudit = () => {
        setStep(1);
        setUserInput('');
        setFeedback('');
        setCoverage(null);
        setReviewStep(0);
        setReviewAnswers([]);
    };

    const handleAdvance = () => {
        if (userInput.trim().length < 2) {
            setFeedback('Type a quick answer to continue!');
            return;
        }
        setFeedback(`✅ Example: ${auditSteps[step - 1].answer}`);
        setTimeout(() => {
            setFeedback('');
            setUserInput('');
            setStep(prev => prev + 1);
            if (step === auditSteps.length) {
                setTimeout(() => setCoverage(fakeCoverage()), 600);
            }
        }, 1200);
    };

    const handleReview = (idx) => {
        setReviewAnswers([...reviewAnswers, idx]);
        setTimeout(() => setReviewStep(prev => prev + 1), 600);
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow p-6 border border-gray-200 flex flex-col min-h-[420px]">
            <h4 className="text-lg font-semibold mb-2 text-center">Code Testing & Audit Demo</h4>
            <div className="mb-4 w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all"
                    style={{
                        width: `${Math.min(100, Math.round((step - 1) / auditSteps.length * 100))}%`,
                        transition: 'width 0.6s cubic-bezier(.4,2,.6,1)',
                    }}
                />
            </div>
            {step === 0 && (
                <button
                    onClick={startAudit}
                    className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                    Start Audit
                </button>
            )}

            {/* Steps: */}
            {step > 0 && step <= auditSteps.length && (
                <div>
                    <div className="mb-2 text-md font-medium text-blue-800">
                        <span className="font-bold">{auditSteps[step - 1].name}</span>
                    </div>
                    <div className="flex flex-col mb-2">
                        <span className="mb-1 text-gray-700">{auditSteps[step - 1].prompt}</span>
                        <input
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="border rounded px-3 py-1 mt-1 mb-2 text-sm"
                            placeholder="Type your answer here…"
                            disabled={feedback !== ''}
                        />
                        <button
                            onClick={handleAdvance}
                            className="self-end bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-60"
                            disabled={feedback !== ''}
                        >
                            Complete Step
                        </button>
                        {feedback && (
                            <div className="mt-2 text-sm text-green-700">{feedback}</div>
                        )}
                    </div>
                    <ul className="space-y-1 text-sm max-h-[120px] overflow-y-auto pr-2 mt-2">
                        {auditSteps.map((stepObj, idx) => (
                            <li
                                key={stepObj.id}
                                className={`flex justify-between items-center p-1 border-b border-gray-100 ${
                                    idx < step - 1
                                        ? 'text-blue-700'
                                        : idx === step - 1
                                        ? 'text-blue-800'
                                        : 'text-gray-400'
                                }`}
                            >
                                <span>{stepObj.name}</span>
                                <span className="font-mono font-bold text-lg">
                                    {idx < step - 1
                                        ? '✔️'
                                        : idx === step - 1
                                        ? '🟦'
                                        : '…'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Show coverage report */}
            {complete && coverage && (
                <div className="mt-6 text-center">
                    <div className="text-sm text-gray-500 mb-1">Coverage Report</div>
                    <span className={`text-3xl font-bold ${coverage > 85 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {coverage}%
                    </span>
                    <div className="text-xs text-gray-400 mt-1">Unit test coverage achieved</div>
                </div>
            )}

            {/* Code Quality Review Quiz */}
            {complete && coverage && reviewStep < reviewQuiz.length && (
                <div className="mt-6">
                    <div className="text-blue-800 font-semibold mb-2">
                        Code Quality Review
                    </div>
                    <div className="mb-2 text-gray-700">{reviewQuiz[reviewStep].question}</div>
                    <div className="space-y-2">
                        {reviewQuiz[reviewStep].options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleReview(idx)}
                                className="w-full bg-gray-100 hover:bg-blue-600 hover:text-white px-3 py-2 rounded text-left transition"
                                disabled={reviewAnswers.length > reviewStep}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* End Summary */}
            {complete && coverage && reviewStep >= reviewQuiz.length && (
                <div className="mt-8 text-center">
                    <div className="mb-3 text-xl text-green-800 font-semibold">Audit Complete!</div>
                    <div className="mb-2 text-sm">
                        {reviewAnswers.filter(
                            (ans, idx) => ans === reviewQuiz[idx].correct
                        ).length === reviewQuiz.length
                            ? "Great job! You understand the basics of code audits and testing."
                            : "Nice try! For more advanced code audit and testing, reach out to our experts."}
                    </div>
                    <button
                        onClick={startAudit}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default CodeTesting;
