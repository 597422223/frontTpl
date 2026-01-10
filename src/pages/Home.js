import React from 'react';
import { TrendingUp, Users, FileText, Activity } from 'lucide-react';
import { usePageHeader } from '../contexts/PageHeaderContext';

// ========== 页面 Header 配置 ==========
const PAGE_HEADER_CONFIG = {
  breadcrumbs: [{ label: 'Dashboard' }],
  title: 'Dashboard',
  icon: '🏠',
  description: 'Welcome to the dashboard. View your stats and quick actions.',
  actionButton: {
    icon: '✨',
    label: 'New',
    onClick: () => console.log('New clicked')
  }
};

// ========== 统计数据配置 ==========
const stats = [
  { label: 'Total Users', value: '1,234', icon: Users, color: 'var(--color-primary)' },
  { label: 'Today Visits', value: '567', icon: Activity, color: 'var(--color-success)' },
  { label: 'Documents', value: '89', icon: FileText, color: '#8b5cf6' },
  { label: 'Growth Rate', value: '+12%', icon: TrendingUp, color: 'var(--color-warning)' },
];

const Home = () => {
  // 设置页面 Header 配置
  usePageHeader(PAGE_HEADER_CONFIG);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl p-6 shadow-sm card-hover transition-colors duration-300"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >{stat.label}</p>
                <p 
                  className="text-2xl font-bold mt-1"
                  style={{ color: 'var(--color-text)' }}
                >{stat.value}</p>
              </div>
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: stat.color }}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div 
          className="rounded-xl p-6 shadow-sm transition-colors duration-300"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)'
          }}
        >
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ color: 'var(--color-text)' }}
          >Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="flex items-center space-x-4 p-3 rounded-lg transition-colors"
                style={{ ':hover': { backgroundColor: 'var(--color-surface-hover)' } }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary-light)' }}
                >
                  <Users className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div className="flex-1">
                  <p 
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-text)' }}
                  >User {item} completed a task</p>
                  <p 
                    className="text-xs"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >{item} hour ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div 
          className="rounded-xl p-6 shadow-sm transition-colors duration-300"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)'
          }}
        >
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ color: 'var(--color-text)' }}
          >Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {['New Document', 'Add User', 'Analytics', 'Settings'].map((action, index) => (
              <button
                key={index}
                className="p-4 rounded-lg transition-colors text-center"
                style={{ 
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)'
                }}
              >
                <span className="text-sm font-medium">{action}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
