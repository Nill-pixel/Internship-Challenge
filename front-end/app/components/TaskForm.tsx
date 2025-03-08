import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { Task, TaskFormData } from '~/types';


interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: TaskFormData) => Promise<boolean>;
  submitButtonText: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  initialData, 
  onSubmit, 
  submitButtonText 
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'pending'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        status: initialData.status
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      const success = await onSubmit(formData);
      
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError('An error occurred while saving the task');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Saving...' : submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;