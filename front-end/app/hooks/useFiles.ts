import { useState, useEffect, useCallback } from 'react';
import { fileService } from '../services/fileService';
import type { TaskFile } from '~/types';

export const useFiles = (taskId: string) => {
  const [files, setFiles] = useState<TaskFile[]>([]);  // Updated type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    if (!taskId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await fileService.getTaskFiles(taskId);
      setFiles(data);
    } catch (err) {
      setError('Failed to fetch files');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const uploadFile = async (file: Blob | File): Promise<boolean> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await fileService.uploadFile(taskId, formData);
      await fetchFiles();
      return true;
    } catch (err) {
      setError('Failed to upload file');
      console.error(err);
      return false;
    }
  };

  const deleteFile = async (fileId: string): Promise<boolean> => {
    try {
      await fileService.deleteFile(taskId, fileId);
      await fetchFiles();
      return true;
    } catch (err) {
      setError('Failed to delete file');
      console.error(err);
      return false;
    }
  };

  return {
    files,
    loading,
    error,
    fetchFiles,
    uploadFile,
    deleteFile
  };
};