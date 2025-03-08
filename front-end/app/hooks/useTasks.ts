import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService';
import type { Task, TaskFormData } from '~/types';

export const useTasks = (filter?: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAllTasks(filter);
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const getTask = async (id: string): Promise<Task | null> => {
    try {
      return await taskService.getTaskById(id);
    } catch (err) {
      setError('Failed to fetch task');
      console.error(err);
      return null;
    }
  };

  const addTask = async (taskData: TaskFormData): Promise<boolean> => {
    try {
      await taskService.createTask(taskData);
      await fetchTasks();
      return true;
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
      return false;
    }
  };

  const updateTask = async (id: string, taskData: TaskFormData): Promise<boolean> => {
    try {
      await taskService.updateTask(id, taskData);
      await fetchTasks();
      return true;
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
      return false;
    }
  };

  const deleteTask = async (id: string): Promise<boolean> => {
    try {
      await taskService.deleteTask(id);
      await fetchTasks();
      return true;
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
      return false;
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask
  };
};