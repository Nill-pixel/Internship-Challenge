// src/pages/EditTask.tsx
import React, { useEffect, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link, useParams } from 'react-router';
import type { Task } from '~/types';

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getTask, updateTask } = useTasks();

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const taskData = await getTask(id);
        setTask(taskData);
      } catch (err) {
        setError('Failed to fetch task');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error || !task) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 p-4 rounded text-red-700">
          {error || 'Task not found'}
        </div>
        <div className="mt-4">
          <Link to="/" className="text-blue-500 hover:underline">
            &larr; Back to Tasks
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (formData: any) => {
    return updateTask(id!, formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Link to={`/tasks/${id}`} className="text-blue-500 hover:underline mr-4">
          &larr; Back to Task
        </Link>
        <h1 className="text-3xl font-bold">Edit Task</h1>
      </div>

      <TaskForm
        initialData={task}
        onSubmit={handleSubmit}
        submitButtonText="Update Task"
      />
    </div>
  );
};

export default EditTask;