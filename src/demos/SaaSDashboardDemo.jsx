// demos/SaaSDashboardDemo.jsx

import React, { useState } from 'react';

const initialData = { users: 125, revenue: 4500, growth: 15 };
const newData = { users: 138, revenue: 4950, growth: 18 };

const walkthroughSteps = [
  {
    title: "Welcome to the SaaS Dashboard Demo",
    text: "This dashboard tracks key SaaS metrics like Active Users, Monthly Recurring Revenue (MRR), and Growth Rate. Click 'Next' to explore!"
  },
  {
    title: "Toggle Between Periods",
    text: "Click the button to compare this month's stats to the next month's projection. Real dashboards make it easy to track trends over time."
  }
];

const insightsQuiz = [
  {
    question: "What is the projected increase in active users next month?",
    options: ["13 users", "15 users", "25 users"],
    correct: 0
  },
  {
    question: "Why does MRR matter for SaaS companies?",
    options: [
      "It tracks ongoing subscription income and predicts business health.",
      "It measures only one-time sales.",
      "It tracks how many emails were sent."
    ],
    correct: 0
  },
  {
    question: "If growth % goes up, what does that usually mean?",
    options: [
      "Your churn rate is increasing.",
      "The company is shrinking.",
      "The company is gaining users or revenue faster."
    ],
    correct: 2
  }
];

const SaaSDashboardDemo = () => {
  const [data, setData] = useState(initialData);
  const [period, setPeriod] = useState('This Month');
  const [walkthrough, setWalkthrough] = useState(0);
  const [viewedBoth, setViewedBoth] = useState(false);
  const [quizStep, setQuizStep] = useState(-1);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const handleNextWalkthrough = () => setWalkthrough(w => w + 1);

  const toggleData = () => {
    if (period === 'This Month') {
      setData(newData);
      setPeriod('Next Month Projection');
      setViewedBoth(true);
    } else {
      setData(initialData);
      setPeriod('This Month');
    }
  };

  const startQuiz = () => setQuizStep(0);

  const handleQuizAnswer = (idx) => {
    setQuizAnswers([...quizAnswers, idx]);
    setTimeout(() => setQuizStep(q => q + 1), 650);
  };

  const resetDemo = () => {
    setData(initialData);
    setPeriod('This Month');
    setWalkthrough(0);
    setViewedBoth(false);
    setQuizStep(-1);
    setQuizAnswers([]);
  };

  const quizComplete = quizStep >= insightsQuiz.length;

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow p-6 border border-gray-200 text-center min-h-[420px] flex flex-col">
      <h4 className="text-xl font-semibold mb-4 text-raven-dark">SaaS Metrics Dashboard Demo</h4>

      {/* Onboarding Walkthrough */}
      {walkthrough < walkthroughSteps.length ? (
        <div className="flex flex-col justify-center items-center flex-grow">
          <div className="mb-4 text-blue-700 text-lg font-semibold">{walkthroughSteps[walkthrough].title}</div>
          <div className="mb-6 text-gray-700 text-base max-w-sm">{walkthroughSteps[walkthrough].text}</div>
          <button
            onClick={handleNextWalkthrough}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded transition"
          >
            {walkthrough === walkthroughSteps.length - 1 ? 'Go to Dashboard' : 'Next'}
          </button>
        </div>
      ) : (
        <>
          {/* Dashboard */}
          <div className="mb-2 text-base text-gray-600 font-semibold">{period} Overview</div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded text-center border border-blue-100">
              <div className="text-xs text-blue-600 uppercase font-semibold">Active Users</div>
              <div className="text-2xl font-bold text-raven-blue">{data.users}</div>
            </div>
            <div className="bg-green-50 p-3 rounded text-center border border-green-100">
              <div className="text-xs text-green-600 uppercase font-semibold">MRR</div>
              <div className="text-2xl font-bold text-green-700">{'$' + data.revenue}</div>
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
          <p className="text-xs text-gray-500 mt-4 mb-2">
            (Click toggle to view both periods. After that, try the Insights Quiz!)
          </p>
          {viewedBoth && quizStep === -1 && (
            <button
              onClick={startQuiz}
              className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded shadow"
            >
              Take Insights Quiz →
            </button>
          )}
        </>
      )}

      {/* Insights Quiz */}
      {quizStep > -1 && !quizComplete && (
        <div className="mt-8 flex flex-col items-center">
          <div className="text-blue-800 font-semibold mb-2">{insightsQuiz[quizStep].question}</div>
          <div className="space-y-2 w-full max-w-xs">
            {insightsQuiz[quizStep].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuizAnswer(idx)}
                className="w-full bg-gray-100 hover:bg-blue-600 hover:text-white px-3 py-2 rounded text-left transition"
                disabled={quizAnswers.length > quizStep}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Complete Summary */}
      {quizComplete && (
        <div className="mt-8 flex flex-col items-center">
          <div className="text-green-700 font-bold text-xl mb-3">Quiz Complete!</div>
          <div className="text-gray-700 mb-2">
            {quizAnswers.filter((ans, idx) => ans === insightsQuiz[idx].correct).length === insightsQuiz.length
              ? "Great job! You know your SaaS dashboard metrics."
              : <>You answered <b>{quizAnswers.filter((ans, idx) => ans === insightsQuiz[idx].correct).length}</b> out of <b>{insightsQuiz.length}</b> correctly.<br />Keep learning!</>
            }
          </div>
          <ul className="mb-4 text-xs text-gray-600 text-left list-disc pl-5">
            <li>Active Users and MRR show your product’s health at a glance.</li>
            <li>Growth % tells you if your company is scaling up month-over-month.</li>
          </ul>
          <button
            onClick={resetDemo}
            className="mt-1 text-sm text-blue-600 hover:underline block mx-auto"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default SaaSDashboardDemo;
