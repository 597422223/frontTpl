import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronDown } from 'lucide-react';
import { usePageHeader } from '../contexts/PageHeaderContext';

// ========== 页面 Header 配置 ==========
const PAGE_HEADER_CONFIG = {
  breadcrumbs: [
    { label: 'Dashboard', path: '/' },
    { label: 'FormPage' }
  ],
  title: 'FormPage',
  icon: '📝',
  description: 'FormPage',
};

// ========== 订阅计划选项 ==========
const SUBSCRIPTION_PLANS = [
  { value: '', label: 'Select subscription plan' },
  { value: 'basic', label: 'Basic Plan', userLimit: 5 },
  { value: 'starter', label: 'Starter Plan', userLimit: 25 },
  { value: 'professional', label: 'Professional Plan', userLimit: 100 },
  { value: 'enterprise', label: 'Enterprise Plan', userLimit: 500 },
  { value: 'trial', label: 'Trial Plan', userLimit: 10 },
];

const FormPage = () => {
  const navigate = useNavigate();
  
  // 设置页面 Header 配置
  usePageHeader(PAGE_HEADER_CONFIG);

  // 表单状态
  const [formData, setFormData] = useState({
    subscriptionPlan: '',
    trialPeriod: '',
    userLimit: '',
    effectiveDate: '2024-03-15',
    notes: '',
    userLimit1: '',
  });

  // 处理表单字段变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // 如果选择了订阅计划，自动填充用户限制
      if (name === 'subscriptionPlan') {
        const selectedPlan = SUBSCRIPTION_PLANS.find(p => p.value === value);
        newData.userLimit = selectedPlan?.userLimit || '';
      }
      
      return newData;
    });
  };

  // 处理取消
  const handleCancel = () => {
    navigate(-1);
  };

  // 处理提交
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: 实际的提交逻辑
  };

  // 是否是试用计划
  const isTrialPlan = formData.subscriptionPlan === 'trial';

  // 输入框样式
  const inputStyle = {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
  };

  const labelStyle = {
    color: 'var(--color-text-secondary)',
  };

  return (
    <div className="space-y-6">
      {/* Subscription Information 表单卡片 */}
      <div 
        className="rounded-2xl p-8 transition-colors duration-300"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        <h2 
          className="text-xl font-semibold mb-6"
          style={{ color: 'var(--color-text)' }}
        >Subscription Information</h2>
        
        <form onSubmit={handleSubmit}>
          {/* 第一行：Subscription Plan, Trial Period, User Limit */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Subscription Plan */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={labelStyle}
              >
                Subscription Plan <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="subscriptionPlan"
                  value={formData.subscriptionPlan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                  style={inputStyle}
                >
                  {SUBSCRIPTION_PLANS.map(plan => (
                    <option key={plan.value} value={plan.value}>
                      {plan.label}
                    </option>
                  ))}
                </select>
                <ChevronDown 
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: 'var(--color-text-muted)' }}
                />
              </div>
            </div>

            {/* User Limit */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={labelStyle}
              >
                User Limit
              </label>
              <input
                type="text"
                name="userLimit"
                value={formData.userLimit ? `${formData.userLimit} users` : ''}
                readOnly
                placeholder="Auto-filled based on plan (5-500)"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none cursor-not-allowed"
                style={{ ...inputStyle, color: 'var(--color-text-muted)' }}
              />
            </div>

            {/* User Limit1 */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={labelStyle}
              >
                User Limit1
              </label>
              <input
                type="text"
                name="userLimit1"
                value={formData.userLimit1 ? `${formData.userLimit1} users` : ''}
                readOnly
                placeholder="Auto-filled based on plan (5-500)"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none cursor-not-allowed"
                style={{ ...inputStyle, color: 'var(--color-text-muted)' }}
              />
            </div>
          </div>

          {/* 第二行：Effective Date, Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Effective Date */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={labelStyle}
              >
                Effective Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="effectiveDate"
                  value={formData.effectiveDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={inputStyle}
                />
                <Calendar 
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: 'var(--color-text-muted)' }}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={labelStyle}
              >
                Notes
              </label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                maxLength={500}
                placeholder="Additional notes or special requirements (max 500 characters)"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                style={inputStyle}
              />
            </div>
          </div>
        </form>
      </div>

      {/* 底部按钮区域 */}
      <div 
        className="rounded-2xl px-8 py-5 transition-colors duration-300"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-8 py-3 font-medium rounded-xl transition-all duration-200"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-8 py-3 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
