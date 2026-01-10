import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

/**
 * PageHeader 组件 - 页面头部（面包屑 + 标题 + 描述 + 操作按钮）
 * @param {array} breadcrumbs - 面包屑数据数组，如 [{ label: 'Dashboard', path: '/' }, { label: 'Contract Review' }]
 * @param {string} title - 页面标题
 * @param {string} icon - 页面图标 emoji
 * @param {string} description - 页面描述
 * @param {object} actionButton - 右上角操作按钮（可选），如 { icon: '✨', label: 'New Conversation', onClick: handleClick }
 * @param {React.ReactNode} children - 额外内容（可选）
 */
const PageHeader = ({ 
  breadcrumbs = [], 
  title,
  icon,
  description,
  actionButton = null,
  children
}) => {
  return (
    <div 
      className="rounded-2xl px-8 py-6 mb-6 transition-colors duration-300"
      style={{ 
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)'
      }}
    >
      {/* 面包屑导航 + 操作按钮 */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* 面包屑导航 */}
          {breadcrumbs.length > 0 && (
            <nav className="flex items-center space-x-2 text-sm mb-4">
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <span style={{ color: 'var(--color-text-muted)' }}>/</span>
                  )}
                  {item.path && index < breadcrumbs.length - 1 ? (
                    <Link
                      to={item.path}
                      className="font-medium transition-colors"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span 
                      className="font-medium"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {item.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          {/* 页面标题和图标 */}
          {(title || icon) && (
            <div className="flex items-center">
              {icon && (
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                  style={{ backgroundColor: 'var(--color-primary-light)' }}
                >
                  <span className="text-2xl">{icon}</span>
                </div>
              )}
              {title && (
                <h1 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--color-text)' }}
                >
                  {title}
                </h1>
              )}
            </div>
          )}

          {/* 页面描述 */}
          {description && (
            <p 
              className="mt-3 max-w-2xl"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {description}
            </p>
          )}
        </div>

        {/* 右上角操作按钮 */}
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className="flex items-center px-5 py-2.5 text-white font-medium rounded-lg transition-colors shadow-sm"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {actionButton.icon && (
              <span className="mr-2">{actionButton.icon}</span>
            )}
            {actionButton.label}
          </button>
        )}
      </div>

      {/* 额外内容 */}
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;

