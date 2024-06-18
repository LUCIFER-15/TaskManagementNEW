// src/app/task.model.ts

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}