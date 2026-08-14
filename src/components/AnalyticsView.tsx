import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  CheckCircle2,
  Clock,
  Target,
  Award,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Task, UserProfile } from '../types';

interface AnalyticsViewProps {
  tasks: Task[];
  userProfile: UserProfile;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ tasks, userProfile }) => {
  const totalCount = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed');
  const pendingTasks = tasks.filter((t) => t.status === 'Pending');

  const completionPercentage =
    totalCount > 0 ? Math.round((completedTasks.length / totalCount) * 100) : 0;

  // Breakdown by priority
  const priorities = ['High', 'Medium', 'Low'] as const;
  const priorityStats = priorities.map((p) => {
    const pTotal = tasks.filter((t) => t.priority === p).length;
    const pDone = tasks.filter((t) => t.priority === p && t.status === 'Completed').length;
    const pRate = pTotal > 0 ? Math.round((pDone / pTotal) * 100) : 0;
    return { priority: p, total: pTotal, done: pDone, rate: pRate };
  });

  // Breakdown by category
  const categories = Array.from(new Set(tasks.map((t) => t.category)));
  const categoryStats = categories.map((cat) => {
    const catTotal = tasks.filter((t) => t.category === cat).length;
    const catDone = tasks.filter((t) => t.category === cat && t.status === 'Completed').length;
    const catRate = catTotal > 0 ? Math.round((catDone / catTotal) * 100) : 0;
    return { category: cat, total: catTotal, done: catDone, rate: catRate };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <h1 className="text-3xl font-serif font-bold text-stone-900 flex items-center gap-2">
          <BarChart3 className="w-7 h-7 text-indigo-600" />
          Progress & Academic Analytics
        </h1>
        <p className="text-stone-600 text-xs mt-1">
          Track task completion percentages, subject workload distributions, and study consistency.
        </p>
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Overall Completion Formula */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Completion Rate</span>
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-4xl font-serif font-bold text-indigo-700">
            {completionPercentage}%
          </div>
          <p className="text-xs text-stone-500">
            Calculated as <strong className="text-stone-800">({completedTasks.length} Completed / {totalCount} Total) × 100</strong>
          </p>
          <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden border border-stone-200">
            <div
              className="bg-indigo-600 h-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Completed vs Pending */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>Tasks Status</span>
            <Target className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-serif font-bold text-emerald-700">{completedTasks.length}</span>
            <span className="text-xs text-stone-400 font-semibold">done</span>
            <span className="text-stone-300">/</span>
            <span className="text-2xl font-serif font-bold text-stone-800">{pendingTasks.length}</span>
            <span className="text-xs text-stone-400 font-semibold">pending</span>
          </div>
          <p className="text-xs text-stone-500">
            Keep clearing pending coursework to reach 100% mastery.
          </p>
        </div>

        {/* Metric 3: Weekly Goal Streak */}
        <div className="bg-stone-900 text-white rounded-3xl border border-stone-800 p-6 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-stone-400 text-xs font-semibold">
            <span>Study Streak & Goal</span>
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-serif font-bold text-white flex items-center gap-2">
            <span>🔥 5 Day Streak</span>
          </div>
          <p className="text-xs text-stone-300">
            Target study goal: <strong>{userProfile.studyGoalHours} hrs / week</strong>
          </p>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Priority Level Breakdown */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
          <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
            <PieChart className="w-5 h-5 text-indigo-600" />
            Priority Breakdown & Finish Rates
          </h3>

          <div className="space-y-4">
            {priorityStats.map((item) => (
              <div key={item.priority} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800 flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.priority === 'High'
                          ? 'bg-rose-500'
                          : item.priority === 'Medium'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    {item.priority} Priority Tasks
                  </span>
                  <span className="text-stone-500 font-medium">
                    {item.done} / {item.total} ({item.rate}%)
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200">
                  <div
                    className={`h-full transition-all duration-500 ${
                      item.priority === 'High'
                        ? 'bg-rose-500'
                        : item.priority === 'Medium'
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${item.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Category Breakdown */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
          <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Subject & Coursework Workload
          </h3>

          <div className="space-y-4">
            {categoryStats.map((item) => (
              <div key={item.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800">{item.category}</span>
                  <span className="text-stone-500 font-medium">
                    {item.done} / {item.total} ({item.rate}%)
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200">
                  <div
                    className="bg-indigo-600 h-full transition-all duration-500"
                    style={{ width: `${item.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
