import React, { useState, useEffect } from 'react';
import { Task, UserProfile, ActiveTab } from './types';
import { getInitialSampleTasks, DEFAULT_USER_PROFILE } from './data/sampleTasks';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { TaskManager } from './components/TaskManager';
import { CalendarView } from './components/CalendarView';
import { AnalyticsView } from './components/AnalyticsView';
import { ProfileModal } from './components/ProfileModal';
import { TaskModal } from './components/TaskModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Load user profile from localStorage or default
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('digiplanner_user_profile');
      return stored ? JSON.parse(stored) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  });

  // Load tasks from localStorage or default
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem('digiplanner_student_tasks');
      return stored ? JSON.parse(stored) : getInitialSampleTasks();
    } catch {
      return getInitialSampleTasks();
    }
  });

  // Task modal states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [presetInitialDate, setPresetInitialDate] = useState<string | undefined>(undefined);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('digiplanner_student_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to persist tasks to localStorage:', e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('digiplanner_user_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.error('Failed to persist user profile:', e);
    }
  }, [userProfile]);

  const getTodayISO = () => new Date().toISOString().split('T')[0];

  // Handlers
  const handleToggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const isNowCompleted = t.status === 'Pending';
          return {
            ...t,
            status: isNowCompleted ? 'Completed' : 'Pending',
            completedAt: isNowCompleted ? getTodayISO() : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleSaveTask = (
    taskData: Omit<Task, 'id' | 'createdAt'>,
    editingId?: string
  ) => {
    if (editingId) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, ...taskData } : t))
      );
    } else {
      const newTask: Task = {
        ...taskData,
        id: `task-${Date.now()}`,
        createdAt: getTodayISO(),
      };
      setTasks((prev) => [newTask, ...prev]);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleClearCompletedTasks = () => {
    setTasks((prev) => prev.filter((t) => t.status !== 'Completed'));
  };

  const handleQuickAddTask = (
    title: string,
    category: string,
    priority: 'Low' | 'Medium' | 'High'
  ) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      dueDate: getTodayISO(),
      dueTime: '23:59',
      category,
      priority,
      status: 'Pending',
      createdAt: getTodayISO(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleOpenAddTask = (initialDate?: string) => {
    setEditingTask(null);
    setPresetInitialDate(initialDate);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setPresetInitialDate(undefined);
    setIsTaskModalOpen(true);
  };

  const handleResetSampleTasks = () => {
    if (window.confirm('Reset all task data to initial sample student coursework?')) {
      const samples = getInitialSampleTasks();
      setTasks(samples);
      localStorage.setItem('digiplanner_student_tasks', JSON.stringify(samples));
    }
  };

  const totalPendingCount = tasks.filter((t) => t.status === 'Pending').length;
  const totalCompletedCount = tasks.filter((t) => t.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-900 font-sans flex flex-col selection:bg-indigo-200">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
        totalPendingCount={totalPendingCount}
        totalCompletedCount={totalCompletedCount}
        onOpenAddTask={() => handleOpenAddTask()}
      />

      <main className="flex-1 pb-16">
        {activeTab === 'dashboard' && (
          <Dashboard
            tasks={tasks}
            userProfile={userProfile}
            onToggleTaskStatus={handleToggleTaskStatus}
            onOpenAddTask={() => handleOpenAddTask()}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onQuickAddTask={handleQuickAddTask}
          />
        )}

        {activeTab === 'tasks' && (
          <TaskManager
            tasks={tasks}
            onToggleTaskStatus={handleToggleTaskStatus}
            onOpenAddTask={() => handleOpenAddTask()}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onClearCompletedTasks={handleClearCompletedTasks}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView
            tasks={tasks}
            onToggleTaskStatus={handleToggleTaskStatus}
            onOpenAddTaskForDate={(dateStr) => handleOpenAddTask(dateStr)}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView tasks={tasks} userProfile={userProfile} />
        )}

        {activeTab === 'settings' && (
          <ProfileModal
            userProfile={userProfile}
            onUpdateProfile={(updated) => setUserProfile(updated)}
            onResetSampleTasks={handleResetSampleTasks}
          />
        )}
      </main>

      {/* Create / Edit Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
        initialDate={presetInitialDate}
      />

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-6 border-t border-stone-800 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Digi Planner — Student Digital Planning & Task Management System</p>
          <div className="flex space-x-4">
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-stone-200">
              Dashboard
            </button>
            <button onClick={() => setActiveTab('tasks')} className="hover:text-stone-200">
              Task Manager
            </button>
            <button onClick={() => setActiveTab('calendar')} className="hover:text-stone-200">
              Calendar
            </button>
            <button onClick={() => setActiveTab('analytics')} className="hover:text-stone-200">
              Analytics
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
