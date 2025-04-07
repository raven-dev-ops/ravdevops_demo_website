import React, { useState } from 'react';

const questions = [
  { id: 'q1', text: 'Is your team frequently frustrated by slow computers or network issues?', options: ['Yes', 'No', 'Sometimes'] },
  { id: 'q2', text: 'Do you have a reliable, tested backup system for your critical business data?', options: ['Yes', 'No', 'Unsure'] },
  { id: 'q3', text: 'Are you confident your business data is protected against cybersecurity threats (like ransomware)?', options: ['Yes', 'No', 'Somewhat'] },
];

const recommendations = {
  slow: "Consider performance optimization, hardware upgrades, or network analysis.",
  backup: "Implementing a robust, automated backup and recovery plan is crucial.",
  security: "A cybersecurity assessment and multi-layered protection (firewall, antivirus, training) is recommended.",
  general: "An IT assessment can identify key areas for improvement in efficiency and security."
}

const ITConsultingDemo = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer) => {
    const currentQuestionId = questions[currentQuestionIndex].id;
    const newAnswers = { ...answers, [currentQuestionId]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
      // Calculate results based on the final set of answers
      // (moved calculation logic to getResultText for clarity)
    }
  };

  const getResultText = (finalAnswers) => {
      // Base recommendation
      let result = [recommendations.general];
      // Add specific recommendations based on answers
      if (finalAnswers.q1 === 'Yes' || finalAnswers.q1 === 'Sometimes') result.push(recommendations.slow);
      if (finalAnswers.q2 === 'No' || finalAnswers.q2 === 'Unsure') result.push(recommendations.backup);
      if (finalAnswers.q3 === 'No' || finalAnswers.q3 === 'Somewhat') result.push(recommendations.security);
      // Return unique recommendations joined by a space or newline for better readability
      return [...new Set(result)].join('\n\n'); // Use newline for separation
  }

  const resetQuiz = () => {
      setCurrentQuestionIndex(0);
      setAnswers({});
      setShowResults(false);
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6 border border-gray-200 min-h-[250px] flex flex-col justify-between"> {/* Ensure min height and flex */}
        <h4 className="text-lg font-semibold mb-4 text-center">Mini IT Health Check</h4>

        {!showResults ? (
            <div className="flex-grow flex flex-col justify-center"> {/* Center content vertically */}
                <p className="text-sm text-gray-700 mb-4 text-center">
                    {questions[currentQuestionIndex].text}
                </p>
                <div className="flex justify-center space-x-3">
                    {questions[currentQuestionIndex].options.map(option => (
                         <button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            className="bg-blue-100 hover:bg-blue-200 text-raven-blue font-medium py-2 px-4 rounded text-sm transition duration-200"
                         >
                            {option}
                         </button>
                    ))}
                </div>
            </div>
        ) : (
            <div className="flex-grow flex flex-col justify-center"> {/* Center content vertically */}
                <h5 className="font-semibold text-center mb-2">Sample Recommendations:</h5>
                <p className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-line">
                    {getResultText(answers)} {/* Pass final answers here */}
                </p>
                <p className="text-xs text-gray-500 mb-3 text-center">
                    This is a simplified demo. A full consultation provides in-depth analysis.
                </p>
            </div>
        )}

        {/* Footer area for progress/reset */}
        <div className="mt-auto pt-4">
            {!showResults ? (
                 <p className="text-xs text-gray-500 text-center">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </p>
            ) : (
                <button onClick={resetQuiz} className="block mx-auto text-sm text-blue-600 hover:underline">
                    Start Over
                 </button>
            )}
        </div>
    </div>
  );
};

export default ITConsultingDemo; // Default export