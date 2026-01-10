import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * ThemeToggle 组件 - 主题切换按钮
 * @param {string} size - 按钮大小: 'sm' | 'md' | 'lg'
 * @param {boolean} showLabel - 是否显示文字标签
 * @param {string} className - 额外的 CSS 类名
 */
const ThemeToggle = ({ 
  size = 'md', 
  showLabel = false,
  className = '' 
}) => {
  const { isDark, toggleTheme, theme } = useTheme();

  // 根据 size 设置图标和按钮大小
  const sizeClasses = {
    sm: {
      button: 'p-1.5',
      icon: 'w-4 h-4',
      text: 'text-xs',
    },
    md: {
      button: 'p-2',
      icon: 'w-5 h-5',
      text: 'text-sm',
    },
    lg: {
      button: 'p-2.5',
      icon: 'w-6 h-6',
      text: 'text-base',
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${currentSize.button}
        rounded-lg
        transition-all duration-200
        hover:bg-gray-100 dark:hover:bg-gray-700
        text-gray-600 dark:text-gray-300
        flex items-center gap-2
        ${className}
      `}
      title={isDark ? '切换到浅色模式' : '切换到深色模式'}
      aria-label={isDark ? '切换到浅色模式' : '切换到深色模式'}
    >
      {isDark ? (
        <Sun className={`${currentSize.icon} text-amber-400`} />
      ) : (
        <Moon className={`${currentSize.icon} text-slate-600`} />
      )}
      {showLabel && (
        <span className={currentSize.text}>
          {theme.label}
        </span>
      )}
    </button>
  );
};

/**
 * ThemeSwitch 组件 - 开关样式的主题切换器
 */
export const ThemeSwitch = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-14 h-7 rounded-full
        transition-colors duration-300
        ${isDark ? 'bg-blue-600' : 'bg-gray-300'}
        ${className}
      `}
      aria-label={isDark ? '切换到浅色模式' : '切换到深色模式'}
    >
      {/* 滑块 */}
      <span
        className={`
          absolute top-0.5 left-0.5
          w-6 h-6 rounded-full
          bg-white shadow-md
          transition-transform duration-300
          flex items-center justify-center
          ${isDark ? 'translate-x-7' : 'translate-x-0'}
        `}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-blue-600" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </span>
    </button>
  );
};

/**
 * ThemeSelector 组件 - 下拉选择主题
 */
export const ThemeSelector = ({ className = '' }) => {
  const { themeName, setTheme, availableThemes } = useTheme();

  const themeLabels = {
    light: '☀️ 浅色模式',
    dark: '🌙 深色模式',
  };

  return (
    <select
      value={themeName}
      onChange={(e) => setTheme(e.target.value)}
      className={`
        px-3 py-2 rounded-lg
        border border-gray-200 dark:border-gray-600
        bg-white dark:bg-gray-800
        text-gray-700 dark:text-gray-200
        text-sm font-medium
        focus:outline-none focus:ring-2 focus:ring-blue-500
        cursor-pointer
        ${className}
      `}
    >
      {availableThemes.map(theme => (
        <option key={theme} value={theme}>
          {themeLabels[theme] || theme}
        </option>
      ))}
    </select>
  );
};

export default ThemeToggle;

