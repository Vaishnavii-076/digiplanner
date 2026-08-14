import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
  Calendar as CalendarIcon,
  BookOpen,
} from 'lucide-react';
import { Task, UserProfile, ActiveTab } from '../types';

interface DashboardProps {
  tasks: Task[];
  userProfile: UserProfile;
  onToggleTaskStatus: (taskId: string) => void;
  onOpenAddTask: () => void;
  onNavigateToTab: (tab: ActiveTab) => void;
  onQuickAddTask: (title: string, category: string, priority: 'Low' | 'Medium' | 'High') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  tasks,
  userProfile,
  onToggleTaskStatus,
  onOpenAddTask,
  onNavigateToTab,
  onQuickAddTask,
}) => {
  const [quickTitle, setQuickTitle] = useState('');
  const [quickCategory, setQuickCategory] = useState('Computer Science');
  const [quickPriority, setQuickPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const todayStr = new Date().toISOString().split('T')[0];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed');
  const pendingTasks = tasks.filter((t) => t.status === 'Pending');

  const todayTasks = tasks.filter((t) => t.dueDate === todayStr);
  const todayCompleted = todayTasks.filter((t) => t.status === 'Completed').length;

  const upcomingTasks = tasks.filter((t) => t.dueDate > todayStr && t.status === 'Pending');
  const overdueTasks = tasks.filter((t) => t.dueDate < todayStr && t.status === 'Pending');

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    onQuickAddTask(quickTitle.trim(), quickCategory, quickPriority);
    setQuickTitle('');
  };

  const getPriorityColor = (p: string) => {
    if (p === 'High') return 'bg-rose-100 text-rose-800 border-rose-200';
    if (p === 'Medium') return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-indigo-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-stone-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Academic Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Welcome back, {userProfile.name}! {userProfile.avatar}
            </h1>
            <p className="text-stone-300 text-sm max-w-xl">
              You have <strong className="text-indigo-300">{todayTasks.length - todayCompleted} tasks</strong> due today. Stay focused and keep building your streak!
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenAddTask}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Task</span>
            </button>
            <button
              onClick={() => onNavigateToTab('calendar')}
              className="px-4 py-2.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors flex items-center gap-2"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>View Calendar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Today's Tasks */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Today's Tasks</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            {todayCompleted} / {todayTasks.length}
          </div>
          <div className="text-[11px] text-stone-500">
            {todayTasks.length - todayCompleted === 0
              ? 'All due today finished!'
              : `${todayTasks.length - todayCompleted} remaining today`}
          </div>
        </div>

        {/* Card 2: Upcoming */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Upcoming Tasks</span>
            <CalendarIcon className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">{upcomingTasks.length}</div>
          <div className="text-[11px] text-stone-500">Due later this week</div>
        </div>

        {/* Card 3: Completed */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-emerald-700">{completedTasks.length}</div>
          <div className="text-[11px] text-stone-500">Out of {totalTasks} total tasks</div>
        </div>

        {/* Card 4: Pending / Overdue */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Pending Tasks</span>
            {overdueTasks.length > 0 ? (
              <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
            ) : (
              <Target className="w-4 h-4 text-amber-500" />
            )}
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">{pendingTasks.length}</div>
          <div className="text-[11px] text-rose-600 font-medium">
            {overdueTasks.length > 0 ? `${overdueTasks.length} overdue tasks!` : '0 overdue tasks'}
          </div>
        </div>

        {/* Card 5: Completion Progress Rate */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-2 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Completion Rate</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-indigo-700">{completionPercentage}%</div>
          {/* Progress bar */}
          <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200">
            <div
              className="bg-indigo-600 h-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Tasks & Quick Creator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Today's Due Tasks & Overdue */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overdue Warning Alert */}
          {overdueTasks.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-rose-900">Overdue Tasks Attention Needed</h3>
                  <p className="text-[11px] text-rose-700">
                    You have {overdueTasks.length} task(s) past due date.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigateToTab('tasks')}
                className="text-xs font-bold text-rose-800 hover:text-rose-950 underline"
              >
                View Overdue
              </button>
            </div>
          )}

          {/* Today's Schedule Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h2 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  Today's Schedule & Deadlines
                </h2>
                <p className="text-xs text-stone-500">
                  {new Date().toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <button
                onClick={() => onNavigateToTab('tasks')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>All Tasks ({totalTasks})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {todayTasks.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-stone-700">No tasks scheduled for today!</p>
                <p className="text-xs text-stone-500">Enjoy your study break or create a new task.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayTasks.map((task) => {
                  const isDone = task.status === 'Completed';
                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        isDone
                          ? 'bg-stone-50 border-stone-200 text-stone-400'
                          : 'bg-white border-stone-200 hover:border-indigo-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => onToggleTaskStatus(task.id)}
                          className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            isDone
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-stone-300 hover:border-indigo-600 text-transparent'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="space-y-1">
                          <h4
                            className={`text-xs font-bold ${
                              isDone ? 'line-through text-stone-400' : 'text-stone-900'
                            }`}
                          >
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-[11px] text-stone-500 line-clamp-1">{task.description}</p>
                          )}
                          <div className="flex items-center space-x-2 text-[10px]">
                            <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium border border-stone-200">
                              {task.category}
                            </span>
                            {task.dueTime && (
                              <span className="text-stone-400 flex items-center gap-0.5">
                                <Clock className="w-3 h-3" /> {task.dueTime}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Quick Add Task Widget & Tips */}
        <div className="space-y-6">
          {/* Quick Add Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" />
              Quick Add Task
            </h3>

            <form onSubmit={handleQuickSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={quickTitle}
                  onChange={(e) => setQuickTitle(e.target.value)}
                  placeholder="Task title (e.g. History quiz)..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={quickCategory}
                  onChange={(e) => setQuickCategory(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl border border-stone-300 text-[11px] focus:outline-hidden bg-white text-stone-800"
                >
                  <option value="Computer Science">Comp Sci</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Literature">Literature</option>
                  <option value="Personal">Personal</option>
                  <option value="General">General</option>
                </select>

                <select
                  value={quickPriority}
                  onChange={(e) => setQuickPriority(e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-xl border border-stone-300 text-[11px] focus:outline-hidden bg-white text-stone-800"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!quickTitle.trim()}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-2xs"
              >
                Add Due Today
              </button>
            </form>
          </div>

          {/* Academic Productivity Tip Card */}
          <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 shadow-2xs border border-stone-800 space-y-3">
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold">
              <BookOpen className="w-4 h-4" />
              <span>Student Study Tip</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              "Break down heavy lab reports or project milestone tasks into 25-minute Pomodoro focus sessions. Tackle high-priority tasks first before lower priority personal errands."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
