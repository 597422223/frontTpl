import React from 'react';
import { Code, Heart, Zap } from 'lucide-react';
import { usePageHeader } from '../contexts/PageHeaderContext';

// ========== 页面 Header 配置 ==========
const PAGE_HEADER_CONFIG = {
  breadcrumbs: [
    { label: 'Dashboard', path: '/' },
    { label: 'About' }
  ],
  title: 'About Us',
  icon: 'ℹ️',
  description: 'Learn more about this project and our technology stack.'
};

const About = () => {
  // 设置页面 Header 配置
  usePageHeader(PAGE_HEADER_CONFIG);

  return (
    <div className="space-y-6">
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Code, title: 'Modern Tech', desc: 'Built with React 18 + Tailwind CSS' },
          { icon: Zap, title: 'High Performance', desc: 'Optimized build and runtime' },
          { icon: Heart, title: 'Thoughtful Design', desc: 'Focus on UX and aesthetics' },
        ].map((item, index) => (
          <div 
            key={index} 
            className="rounded-xl p-6 shadow-sm text-center transition-colors duration-300"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'var(--color-primary-light)' }}
            >
              <item.icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
            </div>
            <h3 
              className="font-semibold"
              style={{ color: 'var(--color-text)' }}
            >{item.title}</h3>
            <p 
              className="text-sm mt-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
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
        >Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {['React 18', 'React Router 6', 'Tailwind CSS', 'Lucide Icons', 'Axios'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Info */}
      <div 
        className="rounded-xl p-8 text-white text-center"
        style={{ background: 'linear-gradient(to right, var(--color-primary), #4f46e5)' }}
      >
        <h3 className="text-xl font-bold mb-2">Get Started</h3>
        <p className="text-blue-100 mb-4">
          This is a React frontend template project based on jobotics-p-client structure
        </p>
        <code className="bg-white/20 px-4 py-2 rounded-lg text-sm">
          npm install && npm start
        </code>
      </div>
    </div>
  );
};

export default About;
