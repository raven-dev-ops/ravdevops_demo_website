// src/quiz/ITConsultingDemoQuiz.jsx

import React, { useState } from 'react';

const questions = [
  {
    id: 'performance',
    text: 'How often does your team struggle with slow computers or network issues?',
    options: [
      { value: 'often', label: 'Frequently' },
      { value: 'sometimes', label: 'Occasionally' },
      { value: 'rarely', label: 'Rarely' }
    ],
    match: { often: 1, sometimes: 0.5, rarely: 0 }
  },
  {
    id: 'backup',
    text: 'Do you have a reliable, tested backup system for critical data?',
    options: [
      { value: 'yes', label: 'Yes, tested regularly' },
      { value: 'partial', label: 'Backups exist but not well tested' },
      { value: 'no', label: 'No or unsure' }
    ],
    match: { yes: 0, partial: 0.5, no: 1 }
  },
  {
    id: 'security',
    text: 'How confident are you in your cybersecurity protections?',
    options: [
      { value: 'strong', label: 'Very confident – strong protections' },
      { value: 'some', label: 'Somewhat confident – there are gaps' },
      { value: 'weak', label: 'Not confident or unsure' }
    ],
    match: { strong: 0, some: 0.5, weak: 1 }
  },
  {
    id: 'inventory',
    text: 'Is your hardware and software inventory tracked and up to date?',
    options: [
      { value: 'yes', label: 'Yes, fully tracked' },
      { value: 'partial', label: 'Partially' },
      { value: 'no', label: 'Not at all' }
    ],
    match: { yes: 0, partial: 0.5, no: 1 }
  },
  {
    id: 'recovery',
    text: 'How quickly could you recover from a major IT outage?',
    options: [
      { value: 'hours', label: 'Within hours' },
      { value: 'day', label: 'Within a day' },
      { value: 'unsure', label: 'Not sure' }
    ],
    match: { hours: 0, day: 0.5, unsure: 1 }
  }
];

const recommendations = {
  high: 'Your answers show significant gaps. An in-depth IT assessment will help prioritise improvements and reduce risk.',
  medium: 'You have some strong areas but also opportunities to improve reliability and security.',
  low: 'Your IT environment appears healthy. Regular reviews will ensure it stays that way.'
};

const ITConsultingDemoQuiz = ({ onClose }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (val) => {
    setAnswers(prev => ({ ...prev, [questions[current].id]: val }));
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers({});
    setShowResult(false);
  };

  const getMatchScore = () => {
    let score = 0;
    questions.forEach(q => {
      const v = answers[q.id];
      score += q.match[v] || 0;
    });
    return score / questions.length;
  };

  const getResult = () => {
    const match = getMatchScore();
    if (match >= 0.7) return recommendations.high;
    if (match >= 0.4) return recommendations.medium;
    return recommendations.low;
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-2xl font-bold mb-3 text-center">IT Consulting Assessment</h3>
      {!showResult ? (
        <>
          <div className="mb-6">
            <p className="text-md font-medium text-gray-800 mb-2">
              {questions[current].text}
            </p>
            <div className="flex flex-col gap-2">
              {questions[current].options.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold py-2 px-4 rounded transition duration-200 text-left"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-500 text-center mt-2">
            Question {current + 1} of {questions.length}
          </div>
        </>
      ) : (
        <div>
          <div className="mb-4 text-lg text-center">
            <span className="font-bold text-blue-700">Your Result:</span>
            <p className="mt-2">{getResult()}</p>
          </div>
          <div className="flex flex-col items-center mt-4 gap-2">
            <button
              onClick={resetQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition font-medium"
            >
              Retake Quiz
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="text-xs text-gray-500 hover:underline mt-2"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ITConsultingDemoQuiz;
