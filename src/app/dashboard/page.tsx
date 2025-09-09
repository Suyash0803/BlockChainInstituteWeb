'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  BookOpen, 
  Award, 
  Calendar, 
  Settings, 
  LogOut, 
  Clock, 
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  verified: boolean;
}

interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedDate: string;
  icon: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Mock data for demo
  const [courseProgress] = useState<CourseProgress[]>([
    {
      id: '1',
      title: 'Blockchain Fundamentals',
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      lastAccessed: '2025-09-06'
    },
    {
      id: '2',
      title: 'Smart Contracts Development',
      progress: 45,
      totalLessons: 16,
      completedLessons: 7,
      lastAccessed: '2025-09-05'
    },
    {
      id: '3',
      title: 'DeFi Protocols',
      progress: 20,
      totalLessons: 10,
      completedLessons: 2,
      lastAccessed: '2025-09-03'
    }
  ]);

  const getProgressWidth = (progress: number) => {
    const rounded = Math.round(progress);
    if (rounded <= 10) return 'w-[10%]';
    if (rounded <= 20) return 'w-[20%]';
    if (rounded <= 30) return 'w-[30%]';
    if (rounded <= 40) return 'w-[40%]';
    if (rounded <= 50) return 'w-[50%]';
    if (rounded <= 60) return 'w-[60%]';
    if (rounded <= 70) return 'w-[70%]';
    if (rounded <= 80) return 'w-[80%]';
    if (rounded <= 90) return 'w-[90%]';
    return 'w-full';
  };

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Completed your first blockchain course',
      earnedDate: '2025-08-15',
      icon: '🎯'
    },
    {
      id: '2',
      title: 'Quick Learner',
      description: 'Completed 3 lessons in one day',
      earnedDate: '2025-08-20',
      icon: '⚡'
    },
    {
      id: '3',
      title: 'Consistent Student',
      description: 'Logged in for 7 consecutive days',
      earnedDate: '2025-08-28',
      icon: '🔥'
    }
  ]);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('Dashboard: Checking auth status...');
      
      // Check if user is logged in via localStorage first
      const storedUser = localStorage.getItem('user');
      console.log('Dashboard: Stored user from localStorage:', storedUser ? 'found' : 'not found');
      
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setLoading(false);
          console.log('Dashboard: User loaded from localStorage:', userData.email);
          return;
        } catch (e) {
          console.error('Dashboard: Error parsing stored user data:', e);
          localStorage.removeItem('user');
        }
      }

      // If no localStorage data, redirect to login
      console.log('Dashboard: No valid user data found, redirecting to login');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Dashboard: Auth check failed:', error);
      // Redirect to login on error
      window.location.href = '/login';
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Call logout API
      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      // Clear local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      // Force logout even if API fails
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to access the dashboard.</p>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Blockchain Institute</h1>
                  <p className="text-sm text-gray-600">Student Dashboard</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
              >
                <LogOut className="w-5 h-5" />
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.firstName}! 👋
          </h2>
          <p className="text-lg text-gray-600">
            Continue your blockchain learning journey
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Courses Enrolled</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Lessons</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Achievements</p>
                <p className="text-2xl font-bold text-gray-900">{achievements.length}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Study Streak</p>
                <p className="text-2xl font-bold text-gray-900">7 days</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Progress */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Course Progress</h3>
                <Link
                  href="/courses"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All Courses
                </Link>
              </div>

              <div className="space-y-4">
                {courseProgress.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{course.title}</h4>
                      <span className="text-sm text-gray-500">
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className={`bg-blue-600 h-2 rounded-full transition-all duration-300 ${getProgressWidth(course.progress)}`}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{course.progress}% Complete</span>
                      <span className="text-gray-500">
                        Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="mt-3 flex space-x-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        Continue Learning
                      </button>
                      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/enrollment"
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Enroll in New Course</span>
                </Link>
                <Link
                  href="/certification"
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Award className="w-5 h-5" />
                  <span>View Certifications</span>
                </Link>
                <Link
                  href="/events"
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Events</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>Account Settings</span>
                </Link>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-start space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(achievement.earnedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/achievements"
                className="block text-center text-blue-600 hover:text-blue-700 text-sm font-medium mt-4"
              >
                View All Achievements
              </Link>
            </div>

            {/* Learning Schedule */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Today&apos;s Schedule</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Smart Contracts Lab</p>
                    <p className="text-sm text-gray-600">2:00 PM - 3:30 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">DeFi Workshop</p>
                    <p className="text-sm text-gray-600">4:00 PM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
