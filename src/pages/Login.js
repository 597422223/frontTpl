import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { showToast } from '../utils/toast';
import { login } from '../api/auth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    // 临时测试：先存储 token（AuthGuard 需要 token 才能访问首页）
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', JSON.stringify({ name: 'Test User', email: formData.email }));
    
    // 跳转首页
    navigate('/');
    
    if (!formData.email || !formData.password) {
      showToast('Please enter email and password', 'warning');
      return;
    }

    setLoading(true);
    try {
      const response = await login(formData);
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        showToast('Login successful', 'success');
        // 使用 react-router 跳转到首页
        navigate('/', { replace: true });
      } else {
        showToast(response.message || 'Login failed', 'error');
      }
    } catch (error) {
      showToast(error.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand Area */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          {/* Floating dots */}
          <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
          <div className="absolute top-[35%] left-[45%] w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
          <div className="absolute top-[55%] left-[10%] w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
          <div className="absolute top-[45%] right-[35%] w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
          <div className="absolute top-[70%] right-[45%] w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
          
          {/* Decorative cards/dashboard elements */}
          <div className="absolute top-[30%] left-[10%] w-32 h-20 bg-blue-100/50 rounded-xl shadow-sm"></div>
          <div className="absolute top-[50%] left-[40%] w-24 h-32 bg-blue-100/50 rounded-xl shadow-sm"></div>
          <div className="absolute top-[65%] left-[15%] w-44 h-16 bg-green-100/50 rounded-xl shadow-sm"></div>
          
          {/* Lines */}
          <div className="absolute top-[52%] left-[20%] w-20 h-0.5 bg-blue-200/50"></div>
          <div className="absolute top-[62%] left-[35%] w-24 h-0.5 bg-blue-200/50"></div>
          <div className="absolute top-[72%] left-[25%] w-28 h-0.5 bg-blue-200/50"></div>
          
          {/* Vertical bars */}
          <div className="absolute top-[48%] right-[38%] w-1 h-16 bg-blue-300/30 rounded"></div>
          <div className="absolute top-[55%] right-[35%] w-1 h-12 bg-blue-300/30 rounded"></div>
          <div className="absolute top-[60%] right-[32%] w-1 h-20 bg-blue-300/30 rounded"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-start pt-12 px-12 w-full">
          {/* Header text */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-slate-700">AI-Powered Business Intelligence</h2>
            <p className="text-sm text-slate-500 mt-2">
              Smart Analytics • Predictive Insights • Real-time Dashboards
            </p>
          </div>

          {/* Logo Card */}
          <div className="bg-white rounded-2xl shadow-lg px-16 py-8 mb-12">
            <h1 className="text-5xl font-bold text-blue-500 tracking-tight">Jobotics</h1>
          </div>
        </div>

        {/* Right edge gradient overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-200/50 to-transparent"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-500">Jobotics</h1>
            <p className="text-slate-500 mt-2 text-sm">AI-Powered Business Intelligence</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl lg:shadow-xl lg:border lg:border-slate-100 p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
              <p className="text-slate-500 mt-2">Enter your credentials to access your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@jobotics.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-700 placeholder:text-slate-400"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12 text-slate-700 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500 cursor-pointer" 
                  />
                  <span className="ml-2 text-sm text-slate-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-4 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all flex items-center justify-center ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
