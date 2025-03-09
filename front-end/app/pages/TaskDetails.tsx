import React, { useEffect, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useFiles } from '../hooks/useFiles';
import LoadingSpinner from '../components/LoadingSpinner';
import FileUpload from '../components/FileUpload';
import { Link, useNavigate, useParams } from 'react-router';
import type { Task } from '~/types';
import TaskFileList from '~/components/TaskFileList';


const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getTask, deleteTask } = useTasks();
  const { files, loading: filesLoading, error: filesError, uploadFile, deleteFile } = useFiles(id || '');

 useEffect(() => {
  const fetchTaskDetail = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const taskData = await getTask(id);
      setTask(taskData);
    } catch (err) {
      setError('Failed to fetch task details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchTaskDetail();
}, [id]);

  const handleDeleteTask = async () => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this task?')) {
      const success = await deleteTask(id);
      if (success) {
        navigate('/');
      }
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Link to="/" className="text-blue-500 hover:underline mr-4">
          &larr; Back to Tasks
        </Link>
        <h1 className="text-3xl font-bold flex-grow">{task.title}</h1>
        <div className="flex space-x-2">
          <Link 
            to={`/tasks/${id}/edit`} 
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
          >
            Edit
          </Link>
          <button 
            onClick={handleDeleteTask} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4 flex items-center">
          <span 
            className={`px-3 py-1 text-sm rounded-full ${
              task.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {task.status === 'completed' ? 'Completed' : 'Pending'}
          </span>
          <span className="ml-4 text-sm text-gray-500">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </span>
          {task.updatedAt !== task.createdAt && (
            <span className="ml-4 text-sm text-gray-500">
              Updated: {new Date(task.updatedAt).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="text-gray-700 whitespace-pre-line">
          {task.description || <em className="text-gray-400">No description provided</em>}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Attached Files</h2>
        
        <TaskFileList
          files={files}
          loading={filesLoading} 
          error={filesError} 
          onDelete={deleteFile} 
        />
        
        <FileUpload taskId={id || ''} onUpload={uploadFile} />
      </div>
    </div>
  );
};

export default TaskDetail;