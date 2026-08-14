import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar as CalendarIcon,
  Tag,
  ArrowUpDown,
  ListFilter,
  Sparkles,
} from 'lucide-react';
import { Task, Priority, TaskStatus } from '../types';

interface TaskManagerProps {
  tasks: Task[];
  onToggleTaskStatus: (taskId: string) => void;
  onOpenAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onClearCompletedTasks: () => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({
  tasks,
  onToggleTaskStatus,
  onOpenAddTask,
  onEditTask,
  onDeleteTask,
  onClearCompletedTasks,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | TaskStatus>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | Priority>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'title'>('dueDate');

  const todayStr = new Date().toISOString().split('T')[0];

  // Extract unique categories from tasks
  const categories = Array.from(new Set(tasks.map((t) => t.category)));

  // Filtering
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(search.toLowerCase())) ||
      t.category.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    if (priorityFilter !== 'All' && t.priority !== priorityFilter) return false;
    if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;

    return true;
  });

  // Sorting
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return a.dueDate.localeCompare(b.dueDate);
    }
    if (sortBy === 'priority') {
      const pMap = { High: 3, Medium: 2, Low: 1 };
      return pMap[b.priority] - pMap[a.priority];
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const getPriorityBadge = (p: Priority) => {
    if (p === 'High') return 'bg-rose-100 text-rose-800 border-rose-200';
    if (p === 'Medium') return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  };

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">Task Manager</h1>
          <p className="text-stone-600 text-xs mt-1">
            Organize coursework, exam schedules, project assignments, and personal deadlines.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {completedCount > 0 && (
            <button
              onClick={onClearCompletedTasks}
              className="px-3.5 py-2 rounded-xl border border-stone-300 text-stone-600 hover:text-rose-700 hover:border-rose-300 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Completed ({completedCount})</span>
            </button>
          )}

          <button
            onClick={onOpenAddTask}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Task</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks or subjects..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-stone-800"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending Only</option>
              <option value="Completed">Completed Only</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-stone-800"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-stone-800"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="title">Sort Alphabetically</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-2 border-t border-stone-100">
          <span className="text-[11px] font-semibold text-stone-400 flex items-center gap-1 flex-shrink-0">
            <Tag className="w-3.5 h-3.5 text-stone-400" /> Categories:
          </span>
          <button
            onClick={() => setCategoryFilter('All')}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              categoryFilter === 'All'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Task Count & Filters Active Info */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>
          Showing <strong>{sortedTasks.length}</strong> of {tasks.length} tasks
        </span>
      </div>

      {/* Tasks List */}
      {sortedTasks.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
            <ListFilter className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-stone-800 text-base">No tasks match your filters</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting search terms or status filters, or add a new task.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedTasks.map((task) => {
            const isDone = task.status === 'Completed';
            const isOverdue = !isDone && task.dueDate < todayStr;
            const isDueToday = !isDone && task.dueDate === todayStr;

            return (
              <div
                key={task.id}
                className={`bg-white rounded-2xl border p-4 sm:p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDone
                    ? 'border-stone-200 bg-stone-50/70 text-stone-400'
                    : isOverdue
                    ? 'border-rose-300 shadow-2xs bg-rose-50/20'
                    : isDueToday
                    ? 'border-indigo-300 shadow-2xs'
                    : 'border-stone-200 hover:border-stone-300 shadow-2xs'
                }`}
              >
                {/* Left: Checkbox & Details */}
                <div className="flex items-start space-x-3.5 flex-1">
                  <button
                    onClick={() => onToggleTaskStatus(task.id)}
                    className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-stone-300 hover:border-indigo-600 text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`text-sm font-bold ${
                          isDone ? 'line-through text-stone-400' : 'text-stone-900'
                        }`}
                      >
                        {task.title}
                      </h3>

                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityBadge(
                          task.priority
                        )}`}
                      >
                        {task.priority} Priority
                      </span>

                      <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-semibold border border-stone-200">
                        {task.category}
                      </span>
                    </div>

                    {task.description && (
                      <p className={`text-xs ${isDone ? 'text-stone-400' : 'text-stone-600'}`}>
                        {task.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-[11px] pt-1">
                      {/* Due date badge */}
                      <span
                        className={`flex items-center gap-1 font-medium ${
                          isDone
                            ? 'text-stone-400'
                            : isOverdue
                            ? 'text-rose-700 font-bold'
                            : isDueToday
                            ? 'text-indigo-700 font-bold'
                            : 'text-stone-500'
                        }`}
                      >
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {task.dueDate} {task.dueTime ? `at ${task.dueTime}` : ''}
                        {isOverdue && <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-bold">OVERDUE</span>}
                        {isDueToday && <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded font-bold">DUE TODAY</span>}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-2 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-100">
                  <button
                    onClick={() => onEditTask(task)}
                    className="p-2 rounded-xl text-stone-500 hover:text-indigo-600 hover:bg-stone-100 transition-colors text-xs font-medium flex items-center gap-1"
                    title="Edit Task"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors text-xs font-medium"
                    title="Delete Task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
