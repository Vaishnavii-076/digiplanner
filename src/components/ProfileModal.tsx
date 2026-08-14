import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, RefreshCw, Check, Sparkles, GraduationCap } from 'lucide-react';

interface ProfileModalProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onResetSampleTasks: () => void;
}

const AVATAR_OPTIONS = ['🎓', '📚', '💻', '🧪', '📐', '🎨', '🚀', '🧠'];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  userProfile,
  onUpdateProfile,
  onResetSampleTasks,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [role, setRole] = useState(userProfile.role);
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const [studyGoalHours, setStudyGoalHours] = useState(userProfile.studyGoalHours);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: name.trim() || 'Alex Rivera',
      role: role.trim() || 'Student',
      avatar,
      studyGoalHours: Number(studyGoalHours) || 20,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <h1 className="text-3xl font-serif font-bold text-stone-900 flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-indigo-600" />
          Student Profile & Preferences
        </h1>
        <p className="text-stone-600 text-xs mt-1">
          Manage your student profile details, weekly study target goals, and data settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-6">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Student profile updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">Select Student Avatar</label>
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
                {AVATAR_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setAvatar(emoji)}
                    className={`text-2xl p-3 rounded-2xl border transition-all ${
                      avatar === emoji
                        ? 'bg-indigo-50 border-indigo-600 scale-105 shadow-2xs'
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-stone-900"
              />
            </div>

            {/* Academic Major / Grade */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Academic Major / Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Computer Science Major, Senior High School Student"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-stone-900"
              />
            </div>

            {/* Weekly Study Goal */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Weekly Target Study Goal (Hours)
              </label>
              <input
                type="number"
                value={studyGoalHours}
                onChange={(e) => setStudyGoalHours(Number(e.target.value))}
                min={1}
                max={100}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-stone-900"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Data Reset & Info Panel */}
        <div className="space-y-6">
          <div className="bg-stone-900 text-white rounded-3xl border border-stone-800 p-6 shadow-2xs space-y-4">
            <h3 className="font-serif font-bold text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Demo Data Management
            </h3>

            <p className="text-xs text-stone-300 leading-relaxed">
              Want to reload the standard sample coursework, problem sets, and lab tasks to test all Digi Planner features?
            </p>

            <button
              type="button"
              onClick={onResetSampleTasks}
              className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-indigo-400" />
              <span>Reset to Sample Student Tasks</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
