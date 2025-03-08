import type { Task, TaskFormData } from '~/types';
import api from './api';

export const taskService = {
  getAllTasks: async (filter?: string): Promise<Task[]> => {
    const params = filter ? { status: filter } : {};
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  getTaskById: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (task: TaskFormData): Promise<Task> => {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  updateTask: async (id: string, task: TaskFormData): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  }
};