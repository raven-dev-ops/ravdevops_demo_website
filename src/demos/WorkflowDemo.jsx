import React, { useState } from 'react';

const WorkflowDemo = () => {
  const [status, setStatus] = useState('Before Automation');
  const [description, setDescription] = useState('Manual inventory checks taking hours.');
  const [showButton, setShowButton] = useState(true);

  const simulateAutomation = () => {
    setStatus('Processing...');
    setDescription('Running automated inventory update...');
    setShowButton(false); // Hide button during processing

    setTimeout(() => {
        setStatus('After Automation');
        setDescription('Inventory updated in real-time via custom app. Checks take minutes.');
    }, 1500); // Simulate processing time
  };

  return (
    <div className="text-center p-4">
      <h4 className="text-lg font-semibold mb-2">{status}</h4>
      <p className="text-gray-600 mb-4 min-h-[40px]">{description}</p> {/* Min height to prevent layout jump */}
      {showButton && (
        <button
          onClick={simulateAutomation}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Simulate Automation Tool
        </button>
      )}
       {status === 'After Automation' && (
           <p className="text-green-600 font-semibold text-xl">Process Streamlined!</p>
       )}
       {/* Add a reset button */}
        {status === 'After Automation' && (
            <button
             onClick={() => { setStatus('Before Automation'); setDescription('Manual inventory checks taking hours.'); setShowButton(true); }}
             className="mt-3 text-xs text-blue-600 hover:underline"
            >
                Reset Demo
            </button>
        )}
    </div>
  );
};

export default WorkflowDemo; // Default export