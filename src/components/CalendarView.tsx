import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Task } from '../types';

interface CalendarViewProps {
  tasks: Task[];
  onToggleTaskStatus: (taskId: string) => void;
  onOpenAddTaskForDate: (dateStr: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  tasks,
  onToggleTaskStatus,
  onOpenAddTaskForDate,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  // Month navigation helpers
  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDateStr(today.toISOString().split('T')[0]);
  };

  // Calendar matrix calculation
  const firstDayOfMonth = new Date(year, month, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Array of days for calendar grid
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Format date helper YYYY-MM-DD
  const formatDayISO = (dayNum: number) => {
    const d = new Date(year, month, dayNum);
    return d.toISOString().split('T')[0];
  };

  // Today ISO string
  const todayISO = new Date().toISOString().split('T')[0];

  // Tasks for selected date
  const selectedDateTasks = tasks.filter((t) => t.dueDate === selectedDateStr);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <CalendarIcon className="w-7 h-7 text-indigo-600" />
            Interactive Student Calendar
          </h1>
          <p className="text-stone-600 text-xs mt-1">
            View course deadlines, exams, and homework schedules visually across the month.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={goToToday}
            className="px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors"
          >
            Today
          </button>
          <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              onClick={goToPrevMonth}
              className="p-1.5 rounded-lg hover:bg-white text-stone-700 transition-colors"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold px-3 text-stone-800">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={goToNextMonth}
              className="p-1.5 rounded-lg hover:bg-white text-stone-700 transition-colors"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Monthly Grid */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 p-5 shadow-2xs space-y-4">
          {/* Day Headers */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-stone-500 border-b border-stone-100 pb-2">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Grid Cells */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
            {/* Empty slots before first day */}
            {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-16 sm:h-20 rounded-2xl bg-stone-50/50" />
            ))}

            {/* Days of month */}
            {daysArray.map((dayNum) => {
              const dayISO = formatDayISO(dayNum);
              const dayTasks = tasks.filter((t) => t.dueDate === dayISO);
              const isToday = dayISO === todayISO;
              const isSelected = dayISO === selectedDateStr;

              const highPriorityCount = dayTasks.filter((t) => t.priority === 'High' && t.status === 'Pending').length;
              const pendingCount = dayTasks.filter((t) => t.status === 'Pending').length;
              const completedCount = dayTasks.filter((t) => t.status === 'Completed').length;

              return (
                <button
                  key={dayNum}
                  onClick={() => setSelectedDateStr(dayISO)}
                  className={`h-16 sm:h-20 p-1.5 rounded-2xl border transition-all text-left flex flex-col justify-between relative ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 shadow-xs'
                      : isToday
                      ? 'border-indigo-300 bg-stone-50'
                      : 'border-stone-200 hover:border-indigo-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        isToday
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : isSelected
                          ? 'text-indigo-900'
                          : 'text-stone-800'
                      }`}
                    >
                      {dayNum}
                    </span>

                    {highPriorityCount > 0 && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="High priority tasks" />
                    )}
                  </div>

                  {/* Task summary badges */}
                  {dayTasks.length > 0 && (
                    <div className="space-y-0.5">
                      <div className="text-[10px] truncate font-semibold text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded-md border border-stone-200">
                        {pendingCount > 0 ? `${pendingCount} due` : `${completedCount} done`}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Selected Date Task Details Panel */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Tasks for {selectedDateStr}
              </h3>
              <p className="text-xs text-stone-500">
                {selectedDateStr === todayISO ? 'Due Today' : 'Scheduled Date'}
              </p>
            </div>

            <button
              onClick={() => onOpenAddTaskForDate(selectedDateStr)}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
              title="Add task for this date"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>

          {selectedDateTasks.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-stone-600">No tasks scheduled on this day.</p>
              <button
                onClick={() => onOpenAddTaskForDate(selectedDateStr)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
              >
                + Add Task for {selectedDateStr}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDateTasks.map((task) => {
                const isDone = task.status === 'Completed';
                return (
                  <div
                    key={task.id}
                    className={`p-3.5 rounded-2xl border transition-all space-y-2 ${
                      isDone
                        ? 'bg-stone-50 border-stone-200 text-stone-400'
                        : 'bg-white border-stone-200 hover:border-indigo-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2">
                        <button
                          onClick={() => onToggleTaskStatus(task.id)}
                          className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center ${
                            isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                        </button>
                        <div>
                          <h4 className={`text-xs font-bold ${isDone ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">{task.description}</p>
                          )}
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          task.priority === 'High'
                            ? 'bg-rose-100 text-rose-800 border-rose-200'
                            : task.priority === 'Medium'
                            ? 'bg-amber-100 text-amber-800 border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-stone-100">
                      <span className="bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200 font-semibold">
                        {task.category}
                      </span>
                      {task.dueTime && (
                        <span className="flex items-center gap-1 text-stone-500">
                          <Clock className="w-3 h-3" /> {task.dueTime}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
