'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  CheckCircle2, Plus, LogOut, Clock, AlertCircle,
  CheckSquare, Circle, Loader2, Zap, TrendingUp
} from 'lucide-react';

interface Task {
  id: number;
  title: string;
  status: 'Todo' | 'In Progress' | 'Done';
  createdAt: string;
}

const statusOptions = ['Todo', 'In Progress', 'Done'];

const statusColors = {
  'Todo': 'badge-todo',
  'In Progress': 'badge-in-progress',
  'Done': 'badge-done',
};

const statusIcons = {
  'Todo': Circle,
  'In Progress': Zap,
  'Done': CheckSquare,
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
    fetchUser();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      if (res.data.name) {
        setUserName(res.data.name);
      }
    } catch (err) {
      router.push('/auth');
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/tasks');
      setTasks(res.data.tasks || []);
    } catch (err: any) {
      if (err.response?.status === 401) {
        router.push('/auth');
      } else {
        setError('Failed to fetch tasks');
      }
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      setSubmitting(true);
      setError('');
      const res = await axios.post('/api/tasks', {
        title: newTitle.trim(),
      });
      
      if (res.status === 201) {
        setTasks([res.data.task, ...tasks]);
        setNewTitle('');
        setSuccessMessage('Task created successfully!');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setSubmitting(false);
    }
  };

  const updateTaskStatus = async (taskId: number, newStatus: string) => {
    try {
      const res = await axios.patch(`/api/tasks/${taskId}`, {
        status: newStatus,
      });

      if (res.status === 200) {
        setTasks(tasks.map(task => 
          task.id === taskId ? { ...task, status: newStatus as any } : task
        ));
        setSuccessMessage('Task updated!');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/auth');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const todoCount = tasks.filter(t => t.status === 'Todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const doneCount = tasks.filter(t => t.status === 'Done').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <Loader2 size={40} className="text-indigo-600 animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center animate-slideInDown">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <CheckCircle2 size={28} className="text-indigo-600" />
              <h1 className="text-3xl font-bold gradient-text">TaskFlow</h1>
            </div>
            {userName && (
              <p className="text-gray-600 text-sm">
                Welcome back, <span className="text-indigo-600 font-semibold">{userName}</span>
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary text-sm flex items-center gap-2 hover:bg-red-100 hover:border-red-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slideInUp">
          <div className="card-hover p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-medium">Todo</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{todoCount}</p>
              </div>
              <Circle size={24} className="text-gray-400" />
            </div>
          </div>

          <div className="card-hover p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-amber-700 mt-2">{inProgressCount}</p>
              </div>
              <Zap size={24} className="text-amber-500" />
            </div>
          </div>

          <div className="card-hover p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-emerald-700 mt-2">{doneCount}</p>
              </div>
              <CheckSquare size={24} className="text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-200 p-4 animate-slideInDown flex items-center gap-2">
            <CheckCircle2 size={20} className="text-emerald-600" />
            <span className="text-emerald-700 text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 animate-slideInDown flex items-center gap-2">
            <AlertCircle size={20} className="text-red-600" />
            <span className="text-red-700 text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Add Task Form */}
        <div className="card p-6 mb-8 animate-slideInUp">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Plus size={24} className="text-indigo-600" />
            Create New Task
          </h2>
          <form onSubmit={addTask} className="flex gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What needs to be done today?"
              className="input-field flex-1"
            />
            <button
              type="submit"
              disabled={submitting || !newTitle.trim()}
              className="btn-primary whitespace-nowrap flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tasks List */}
        <div className="card overflow-hidden animate-slideInUp">
          <div className="px-6 py-4 border-b border-gray-200/50 bg-indigo-50/30">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <CheckSquare size={24} className="text-indigo-600" />
              My Tasks{' '}
              <span className="ml-2 px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700 border border-indigo-200 font-medium">
                {tasks.length} Total
              </span>
            </h2>
          </div>

          {tasks.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Clock size={48} className="mx-auto text-gray-300 mb-3 opacity-50" />
              <p className="text-gray-700 text-lg font-medium">No tasks yet</p>
              <p className="text-gray-600 text-sm mt-1">Create your first task to get started!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200/50">
              {tasks.map((task, index) => {
                const Icon = statusIcons[task.status];
                return (
                  <div
                    key={task.id}
                    className="px-6 py-4 flex items-center justify-between hover:bg-indigo-50/30 transition-colors duration-200 last:rounded-b-2xl animate-slideInUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium text-lg leading-relaxed break-words">
                        {task.title}
                      </p>
                      <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(task.createdAt).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      className={`badge ml-4 cursor-pointer py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                        statusColors[task.status as keyof typeof statusColors]
                      } hover:shadow-lg hover:shadow-indigo-500/20`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status} className="bg-white">
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {tasks.length > 0 && (
          <div className="mt-8 card p-6 animate-slideInUp">
            <h3 className="text-sm font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <TrendingUp size={18} />
              Overall Progress
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(doneCount / tasks.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-3 font-medium">
              {doneCount} of {tasks.length} tasks completed ({Math.round((doneCount / tasks.length) * 100)}%)
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
