import React from 'react';
import TaskForm from '../components/TaskForm';
import { useTasks } from '~/hooks/useTasks';
import { Link } from 'react-router';


const NewTask: React.FC = () => {
  const { addTask } = useTasks();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Link to="/" className="text-blue-500 hover:underline mr-4">
          &larr; Back to Tasks
        </Link>
        <h1 className="text-3xl font-bold">Create New Task</h1>
      </div>

      <TaskForm onSubmit={addTask} submitButtonText="Create Task" />
    </div>
  );
};

export default NewTask;