// src/types/index.ts
export interface TaskFile {
  mimetype: any;  // Renamed from File
  id: string;
  filename: string;
  taskId: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

// Keep other interfaces the same
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: 'pending' | 'completed';
}