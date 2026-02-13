'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const res = await axios.post('/api/auth/signup', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (res.status === 201) {
          const loginRes = await axios.post('/api/auth/login', {
            email: formData.email,
            password: formData.password,
          });
          
          if (loginRes.status === 200) {
            router.push('/dashboard');
          }
        }
      } else {
        const res = await axios.post('/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });

        if (res.status === 200) {
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 animate-fadeIn">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 mb-6 shadow-lg shadow-indigo-200">
              <CheckCircle2 size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              TaskFlow
            </h1>
            <p className="text-gray-600 text-sm font-medium">
              {isSignup ? 'Create your account and start organizing' : 'Welcome back to your tasks'}
            </p>
          </div>

          {/* Card */}
          <div className="card p-8 animate-slideInUp">
            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignup && (
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <User size={16} />
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required={isSignup}
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lock size={16} />
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {isSignup && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Lock size={16} />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      required={isSignup}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="input-field pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4 animate-slideInDown flex items-center gap-2">
                  <span className="text-red-600 flex-shrink-0">✕</span>
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {isSignup ? 'Creating account...' : 'Signing in...'}
                  </>
                ) : (
                  <>
                    {isSignup ? 'Create Account' : 'Sign In'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Auth Mode */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 text-sm mb-3">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
              </p>
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError('');
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                }}
                className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
              >
                {isSignup ? 'Sign In Instead' : 'Create Account'}
              </button>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <div className="badge bg-indigo-50 border border-indigo-200 text-indigo-700">
              🔒 Secure
            </div>
            <div className="badge bg-purple-50 border border-purple-200 text-purple-700">
              ⚡ Fast
            </div>
            <div className="badge bg-blue-50 border border-blue-200 text-blue-700">
              📱 Responsive
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
