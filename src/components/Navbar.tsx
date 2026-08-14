import React from 'react';
import { LayoutDashboard, CheckSquare, Calendar as CalendarIcon, BarChart3, GraduationCap, Plus } from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userProfile: UserProfile;
  totalPendingCount: number;
  totalCompletedCount: number;
  onOpenAddTask: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userProfile,
  totalPendingCount,
  totalCompletedCount,
  onOpenAddTask,
}) => {
  const navItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks' as ActiveTab, label: 'Task Manager', icon: CheckSquare, badge: totalPendingCount },
    { id: 'calendar' as ActiveTab, label: 'Calendar', icon: CalendarIcon },
    { id: 'analytics' as ActiveTab, label: 'Progress & Stats', icon: BarChart3 },
  ];

  return (
    <header className="bg-stone-900 text-stone-100 sticky top-0 z-40 border-b border-stone-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
                Digi Planner
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-900/80 text-indigo-300 rounded-full border border-indigo-700">
                  Student Edition
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`ml-1 px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                        isActive
                          ? 'bg-white text-indigo-700'
                          : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile & Quick Action */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenAddTask}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Task</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border transition-colors ${
                activeTab === 'settings'
                  ? 'bg-stone-800 border-indigo-500 text-white'
                  : 'border-stone-800 hover:border-stone-700 text-stone-300'
              }`}
              title="Student Profile Settings"
            >
              <span className="text-base leading-none">{userProfile.avatar}</span>
              <span className="hidden lg:inline text-xs font-medium max-w-[100px] truncate">
                {userProfile.name}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-stone-800 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-1 px-3 rounded-lg text-[11px] font-medium transition-colors ${
                  isActive ? 'text-indigo-400 font-bold' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
