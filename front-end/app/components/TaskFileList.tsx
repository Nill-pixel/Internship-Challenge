import React from 'react';
import type {TaskFile } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface TaskFileListProps {
  files: TaskFile[];  // Updated type
  loading: boolean;
  error: string | null;
  onDelete: (fileId: string) => Promise<boolean>;
}


const TaskFileList: React.FC<TaskFileListProps> = ({ files, loading, error, onDelete }) => {
  // Component implementation remains the same
  const handleDelete = async (fileId: string) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      await onDelete(fileId);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const getFileIcon = (type: string): string => {
    if (type.includes('image')) return '🖼️';
    if (type.includes('pdf')) return '📄';
    if (type.includes('word')) return '📝';
    return '📎';
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
        Error: {error}
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-4 bg-gray-50 rounded text-gray-500 text-sm">
        No files attached to this task
      </div>
    );
  }

  return (
    <div className="mt-2">
      <ul className="divide-y divide-gray-200">
        {files.map((file) => (
          <li key={file.id} className="py-3 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xl mr-2">{getFileIcon(file.type)}</span>
              <div>
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {file.filename}
                </a>
                <div className="text-xs text-gray-500">
                  {formatFileSize(file.size)} • Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(file.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskFileList;