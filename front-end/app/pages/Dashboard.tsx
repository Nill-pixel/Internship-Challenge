import React from 'react';
import TaskList from '../components/TaskList';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      <TaskList />
    </div>
  );
};

export default Dashboard;