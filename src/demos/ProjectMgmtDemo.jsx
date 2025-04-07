import React, { useState } from 'react';

const initialTasks = [
  { id: 't1', content: 'User Authentication Setup', status: 'todo' },
  { id: 't2', content: 'Dashboard UI Design', status: 'todo' },
  { id: 't3', content: 'API Integration - Phase 1', status: 'inprogress' },
  { id: 't4', content: 'Initial Database Schema', status: 'done' },
  { id: 't5', content: 'Client Feedback Session 1', status: 'done' },
];

const statuses = ['todo', 'inprogress', 'done'];
const statusLabels = { todo: 'To Do', inprogress: 'In Progress', done: 'Done' };
// Added Tailwind background/border colors for better visual distinction
const statusStyles = {
    todo: 'bg-gray-100 border-gray-300 text-gray-800',
    inprogress: 'bg-blue-100 border-blue-300 text-blue-800',
    done: 'bg-green-100 border-green-300 text-green-800'
};
const columnHeaderStyles = {
    todo: 'bg-gray-200 text-gray-700',
    inprogress: 'bg-blue-200 text-blue-700',
    done: 'bg-green-200 text-green-700'
};


const ProjectMgmtDemo = () => {
  const [tasks, setTasks] = useState(initialTasks);

   // Placeholder: In a real demo, this might use drag-and-drop
  const moveTask = (taskId, direction) => {
    setTasks(currentTasks => {
      const taskIndex = currentTasks.findIndex(t => t.id === taskId);
      if (taskIndex === -1) return currentTasks; // Task not found

      const task = currentTasks[taskIndex];
      const currentStatusIndex = statuses.indexOf(task.status);
      let nextStatusIndex = currentStatusIndex + direction;

      // Clamp index within bounds
      nextStatusIndex = Math.max(0, Math.min(statuses.length - 1, nextStatusIndex));

      if (nextStatusIndex !== currentStatusIndex) {
        const nextStatus = statuses[nextStatusIndex];
        const updatedTasks = [...currentTasks];
        updatedTasks[taskIndex] = { ...task, status: nextStatus };
        return updatedTasks;
      }
      return currentTasks; // No change if already at boundary
    });
  };


  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow p-4 border border-gray-200">
        <h4 className="text-lg font-semibold mb-4 text-center">Project Task Board (Simplified)</h4>
        <div className="grid grid-cols-3 gap-3">
            {statuses.map(status => (
                <div key={status} className="bg-gray-50 rounded border border-gray-200 flex flex-col"> {/* Flex column */}
                    <h5 className={`font-semibold text-sm p-2 text-center rounded-t ${columnHeaderStyles[status]}`}> {/* Column Header Styling */}
                        {statusLabels[status]}
                    </h5>
                    <div className="space-y-2 p-2 min-h-[150px] flex-grow"> {/* Content area */}
                        {tasks.filter(t => t.status === status).map(task => (
                            <div key={task.id} className={`p-2 rounded border text-xs shadow-sm ${statusStyles[status]}`}> {/* Task Card Styling */}
                                <p className="mb-1 font-medium">{task.content}</p>
                                {/* Simplified move buttons */}
                                <div className="flex justify-between mt-1">
                                     <button
                                        onClick={() => moveTask(task.id, -1)} // Move left
                                        disabled={status === 'todo'}
                                        className="text-xs px-1 disabled:opacity-30 text-gray-500 hover:text-blue-600"
                                        title="Move Left"
                                     >
                                        ◀ {/* Left arrow */}
                                    </button>
                                     <button
                                        onClick={() => moveTask(task.id, 1)} // Move right
                                        disabled={status === 'done'}
                                        className="text-xs px-1 disabled:opacity-30 text-gray-500 hover:text-blue-600"
                                        title="Move Right"
                                     >
                                        ▶ {/* Right arrow */}
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* Placeholder if column is empty */}
                        {tasks.filter(t => t.status === status).length === 0 && (
                            <div className="text-center text-xs text-gray-400 italic mt-4">(Empty)</div>
                        )}
                    </div>
                </div>
            ))}
        </div>
         <p className="text-xs text-gray-500 mt-3 text-center">
             (Demo showing a Kanban-style board. Click arrows to move tasks.)
         </p>
    </div>
  );
};

export default ProjectMgmtDemo; // Default export