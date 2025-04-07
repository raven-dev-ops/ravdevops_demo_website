import React, { useState } from 'react';

const sections = [
  { id: 'intro', title: 'Introduction', content: 'Welcome to the user guide for the Awesome App! This guide helps you get started quickly.' },
  { id: 'setup', title: 'Setup Instructions', content: '1. Download the app.\n2. Create an account.\n3. Log in using your credentials.' }, // Added newline examples
  { id: 'usage', title: 'Basic Usage', content: 'Navigate using the sidebar.\nClick the "+" button to add new items.\nSave your work frequently.' },
];

const TechWritingDemo = () => {
    const [activeSection, setActiveSection] = useState(sections[0]); // Start with intro

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow p-6 border border-gray-200 flex gap-4 h-[250px]">
        {/* Sidebar Navigation */}
        <div className="w-1/3 border-r border-gray-200 pr-4 flex-shrink-0"> {/* Prevent shrinking */}
             <h5 className="font-semibold text-sm mb-2 text-gray-700">User Guide Sections</h5>
             <ul className="space-y-1">
                 {sections.map(section => (
                     <li key={section.id}>
                         <button
                            onClick={() => setActiveSection(section)}
                            className={`block w-full text-left text-sm px-2 py-1 rounded ${activeSection.id === section.id ? 'bg-blue-100 text-raven-blue font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                         >
                             {section.title}
                         </button>
                     </li>
                 ))}
             </ul>
        </div>
         {/* Content Area */}
        <div className="w-2/3 overflow-y-auto"> {/* Allow content scroll if needed */}
             <h4 className="text-lg font-semibold mb-2 text-raven-dark">{activeSection.title}</h4>
             <p className="text-sm text-gray-700 whitespace-pre-line">{activeSection.content}</p> {/* whitespace-pre-line respects newlines */}
        </div>
    </div>
  );
};

export default TechWritingDemo; // Default export