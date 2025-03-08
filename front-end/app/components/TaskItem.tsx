import React from 'react';
import { Link } from 'react-router';
import type { Task } from '~/types';


interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600 mt-1 line-clamp-2">{task.description}</p>
          <div className="mt-2 flex items-center">
            <span 
              className={`px-2 py-1 text-xs rounded-full ${
                task.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {task.status === 'completed' ? 'Completed' : 'Pending'}
            </span>
            <span className="ml-2 text-xs text-gray-500">
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link 
            to={`/tasks/${task.id}`} 
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            View
          </Link>
          <Link 
            to={`/tasks/${task.id}/edit`} 
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            Edit
          </Link>
          <button 
            onClick={() => onDelete(task.id)} 
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;