import React, { useState } from 'react';
import TaskItem from './TaskItem';
import LoadingSpinner from './LoadingSpinner';
import { useTasks } from '../hooks/useTasks';
import { Link } from 'react-router';

const TaskList: React.FC = () => {
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const { tasks, loading, error, deleteTask } = useTasks(filter);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <label htmlFor="filter" className="mr-2 text-gray-700">Filter:</label>
            <select
              id="filter"
              value={filter || ''}
              onChange={(e) => setFilter(e.target.value || undefined)}
              className="border rounded p-2"
            >
              <option value="">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <Link
            to="/tasks/new"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
          >
            Create New Task
          </Link>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded">
          <p className="text-gray-500">No tasks found. Create a new one!</p>
        </div>
      ) : (
        <div>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;