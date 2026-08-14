export type Priority = 'Low' | 'Medium' | 'High';

export type TaskStatus = 'Pending' | 'Completed';

export type SubjectCategory = 'Mathematics' | 'Science' | 'History' | 'Computer Science' | 'Literature' | 'Personal' | 'General';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string; // ISO date string YYYY-MM-DD
  dueTime?: string; // HH:MM format
  category: SubjectCategory | string;
  priority: Priority;
  status: TaskStatus;
  createdAt: string;
  completedAt?: string;
}

export interface UserProfile {
  name: string;
  role: string; // e.g. "Computer Science Major" or "High School Senior"
  avatar: string; // emoji or avatar identifier
  studyGoalHours: number;
}

export type ActiveTab = 'dashboard' | 'tasks' | 'calendar' | 'analytics' | 'settings';
