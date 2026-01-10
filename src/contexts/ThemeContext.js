import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { themes, defaultTheme, brandConfig } from '../config/theme';

// 创建 Context
const ThemeContext = createContext(null);

/**
 * 将主题颜色应用到 CSS 变量
 */
const applyThemeColors = (theme) => {
  const root = document.documentElement;
  const colors = theme.colors;
  
  Object.entries(colors).forEach(([key, value]) => {
    // 将 camelCase 转换为 kebab-case
    const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVarName, value);
  });
  
  // 设置 data-theme 属性
  root.setAttribute('data-theme', theme.name);
};

/**
 * ThemeProvider 组件
 * 提供主题状态管理和切换功能
 */
export const ThemeProvider = ({ children }) => {
  // 从 localStorage 获取保存的主题，默认使用 defaultTheme
  const [themeName, setThemeName] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved && themes[saved] ? saved : defaultTheme;
  });
  
  // 当前主题配置
  const theme = themes[themeName];

  // 应用主题
  useEffect(() => {
    applyThemeColors(theme);
    localStorage.setItem('theme', themeName);
  }, [themeName, theme]);

  // 切换主题
  const toggleTheme = useCallback(() => {
    setThemeName(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // 设置指定主题
  const setTheme = useCallback((name) => {
    if (themes[name]) {
      setThemeName(name);
    }
  }, []);

  // 检查是否是深色主题
  const isDark = themeName === 'dark';

  const value = {
    // 当前主题名称
    themeName,
    // 当前主题配置
    theme,
    // 品牌配置
    brand: brandConfig,
    // 是否深色模式
    isDark,
    // 切换主题
    toggleTheme,
    // 设置指定主题
    setTheme,
    // 所有可用主题
    availableThemes: Object.keys(themes),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme Hook
 * 获取主题配置和操作方法
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

/**
 * useBrand Hook
 * 只获取品牌配置
 */
export const useBrand = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useBrand must be used within ThemeProvider');
  }
  return context.brand;
};

/**
 * useColors Hook
 * 只获取颜色配置
 */
export const useColors = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useColors must be used within ThemeProvider');
  }
  return context.theme.colors;
};

export default ThemeContext;

