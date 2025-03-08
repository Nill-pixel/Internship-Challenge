import type { TaskFile } from '~/types';
import api from './api';


export const fileService = {
  getTaskFiles: async (taskId: string): Promise<TaskFile[]> => {  // Updated return type
    const response = await api.get(`/tasks/${taskId}/files`);
    return response.data;
  },

  uploadFile: async (taskId: string, file: FormData): Promise<TaskFile> => {  // Updated return type
    const response = await api.post(`/tasks/${taskId}/upload`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteFile: async (taskId: string, fileId: string): Promise<void> => {
    await api.delete(`/tasks/${taskId}/files/${fileId}`);
  }
};