import { Task, UserProfile } from '../types';

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Alex Rivera',
  role: 'Computer Science & Math Student',
  avatar: '🎓',
  studyGoalHours: 25,
};

// Function to generate sample tasks relative to current date YYYY-MM-DD
export function getInitialSampleTasks(): Task[] {
  const today = new Date();

  const formatDate = (offsetDays: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  const todayStr = formatDate(0);
  const tomorrowStr = formatDate(1);
  const inTwoDaysStr = formatDate(2);
  const inFiveDaysStr = formatDate(5);
  const yesterdayStr = formatDate(-1);
  const threeDaysAgoStr = formatDate(-3);

  return [
    {
      id: 'task-1',
      title: 'Submit Data Structures Lab 4',
      description: 'Implement Binary Search Tree balancing algorithms in Java and write performance test logs.',
      dueDate: todayStr,
      dueTime: '23:59',
      category: 'Computer Science',
      priority: 'High',
      status: 'Pending',
      createdAt: yesterdayStr,
    },
    {
      id: 'task-2',
      title: 'Calculus III Problem Set 6',
      description: 'Complete double integral exercises on pages 412-415. Show all vector field derivations.',
      dueDate: todayStr,
      dueTime: '17:00',
      category: 'Mathematics',
      priority: 'High',
      status: 'Pending',
      createdAt: yesterdayStr,
    },
    {
      id: 'task-3',
      title: 'Review Physics Ch. 8 Thermodynamics',
      description: 'Read notes on Entropy and heat transfer. Solve practice problems 12 to 24.',
      dueDate: todayStr,
      dueTime: '19:30',
      category: 'Science',
      priority: 'Medium',
      status: 'Completed',
      createdAt: yesterdayStr,
      completedAt: todayStr,
    },
    {
      id: 'task-4',
      title: 'Draft Essay outline for World History',
      description: 'Focus thesis statement on post-WWII economic reconstruction policies in Western Europe.',
      dueDate: tomorrowStr,
      dueTime: '15:00',
      category: 'History',
      priority: 'Medium',
      status: 'Pending',
      createdAt: yesterdayStr,
    },
    {
      id: 'task-5',
      title: 'Computer Architecture Midterm Study Group',
      description: 'Meet at Science Library Room 3B with Sarah and Mark. Review RISC-V assembly pipeline hazards.',
      dueDate: inTwoDaysStr,
      dueTime: '14:00',
      category: 'Computer Science',
      priority: 'High',
      status: 'Pending',
      createdAt: yesterdayStr,
    },
    {
      id: 'task-6',
      title: 'Buy Weekly Grocery & Meal Prep',
      description: 'Buy oats, berries, eggs, chicken breast, rice, and coffee beans.',
      dueDate: tomorrowStr,
      dueTime: '10:00',
      category: 'Personal',
      priority: 'Low',
      status: 'Pending',
      createdAt: yesterdayStr,
    },
    {
      id: 'task-7',
      title: 'Read Chapters 3-4 of American Literature',
      description: 'Annotate key metaphors in The Great Gatsby for Friday group discussion.',
      dueDate: inFiveDaysStr,
      dueTime: '20:00',
      category: 'Literature',
      priority: 'Low',
      status: 'Pending',
      createdAt: yesterdayStr,
    },
    {
      id: 'task-8',
      title: 'Linear Algebra Quiz Prep',
      description: 'Matrix factorization (LU decomposition) and Eigenvalues review.',
      dueDate: yesterdayStr,
      dueTime: '11:00',
      category: 'Mathematics',
      priority: 'High',
      status: 'Completed',
      createdAt: threeDaysAgoStr,
      completedAt: yesterdayStr,
    },
    {
      id: 'task-9',
      title: 'Register for Next Semester Courses',
      description: 'Select Operating Systems, Discrete Math, and Ethics in Tech via student portal.',
      dueDate: threeDaysAgoStr,
      dueTime: '09:00',
      category: 'General',
      priority: 'Medium',
      status: 'Completed',
      createdAt: threeDaysAgoStr,
      completedAt: threeDaysAgoStr,
    },
  ];
}
