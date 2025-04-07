import React, { useState } from 'react';

const scenario = {
    question: "Scenario: A key project deadline is approaching, but a team member is struggling with their tasks and falling behind. What's the BEST first step?",
    options: [
        { id: 'a', text: 'Take over the tasks yourself to ensure the deadline is met.' },
        { id: 'b', text: 'Privately meet with the team member to understand the challenges and offer support/resources.' },
        { id: 'c', text: 'Announce in the team meeting that everyone needs to pick up the slack.' },
        { id: 'd', text: 'Reassign the tasks to a more capable team member immediately.' },
    ],
    correct: 'b',
    feedback: {
        a: 'While proactive, this doesn\'t address the root cause and can lead to burnout or demotivation.',
        b: 'Correct! Understanding the problem and offering support fosters trust and helps the team member grow.',
        c: 'This can create resentment and doesn\'t directly help the struggling individual.',
        d: 'This might be necessary later, but jumping to this step undermines trust and misses a coaching opportunity.',
    },
};

const LeadershipDemo = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleSelect = (optionId) => {
        setSelectedOption(optionId);
        setShowFeedback(true);
    };

    const resetDemo = () => {
        setSelectedOption(null);
        setShowFeedback(false);
    }

    const isCorrect = selectedOption === scenario.correct;

    return (
        <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow p-6 border border-gray-200">
            <h4 className="text-lg font-semibold mb-1 text-center">Leadership Training Snippet</h4>
             <p className="text-sm text-gray-600 mb-4 text-center italic">{scenario.question}</p>
             <div className="space-y-2 mb-4">
                 {scenario.options.map(option => (
                    <button
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        disabled={showFeedback}
                        className={`block w-full text-left text-sm px-3 py-2 border rounded transition duration-150 ${
                            showFeedback && option.id === scenario.correct ? 'bg-green-100 border-green-300 text-green-800 ring-2 ring-green-400' : // Highlight correct
                            showFeedback && option.id === selectedOption ? 'bg-red-100 border-red-300 text-red-800' : // Highlight incorrect selection
                            'border-gray-300 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed'
                        }`}
                    >
                        <span className="font-bold mr-2">{option.id.toUpperCase()}.</span> {option.text}
                    </button>
                 ))}
             </div>

             {showFeedback && (
                 <div className={`p-3 rounded text-sm mb-3 ${isCorrect ? 'bg-green-50 border-l-4 border-green-500 text-green-800' : 'bg-red-50 border-l-4 border-red-500 text-red-800'}`}>
                     <p><span className="font-bold">{isCorrect ? 'Correct!' : 'Consider this:'}</span> {scenario.feedback[selectedOption]}</p>
                 </div>
             )}

              {!showFeedback && <p className="text-xs text-gray-500 text-center">Select the best option.</p>}
               {showFeedback && (
                   <button onClick={resetDemo} className="mt-1 text-xs text-blue-600 hover:underline block mx-auto">
                    Try again
                   </button>
               )}
        </div>
    );
};

export default LeadershipDemo; // Default export