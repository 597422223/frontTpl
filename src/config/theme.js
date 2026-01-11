/**
 * 主题配置文件
 * 定义品牌信息和颜色配置
 */

// 品牌配置
export const brandConfig = {
  name: 'Jobotics',
  logo: '/assets/images/logo.png',
  logoCollapsed: 'J', // 侧边栏折叠时显示的字母
  favicon: '/favicon.ico',
  description: 'AI-Powered Business Intelligence',
  slogan: 'Smart Analytics • Predictive Insights • Real-time Dashboards',
};

// 颜色主题配置
export const themes = {
  light: {
    name: 'light',
    label: '浅色模式',
    colors: {
      // 主色调
      primary: '#3b82f6',
      primaryHover: '#2563eb',
      primaryLight: '#eff6ff',
      
      // 语义色彩
      secondary: '#10b981',
      accent: '#f59e0b',
      accentHover: '#d97706',
      accentLight: '#fef3c7',
      danger: '#ef4444',
      dangerLight: '#fef2f2',
      warning: '#d97706',
      warningLight: '#fffbeb',
      success: '#10b981',
      successLight: '#ecfdf5',
      info: '#3b82f6',
      infoLight: '#eff6ff',
      
      // 背景色
      background: '#f9fafb',
      surface: '#ffffff',
      surfaceHover: '#f3f4f6',
      
      // 文字色
      text: '#111827',
      textSecondary: '#6b7280',
      textMuted: '#9ca3af',
      textInverse: '#ffffff',
      
      // 按钮文字色
      buttonPrimaryText: '#ffffff',
      buttonSecondaryText: '#111827',
      buttonAccentText: '#ffffff',
      
      // 边框色
      border: '#e5e7eb',
      borderLight: '#f3f4f6',
      borderDark: '#d1d5db',
      borderFocus: '#3b82f6',
      
      // 阴影
      shadow: 'rgba(0, 0, 0, 0.1)',
      shadowLight: 'rgba(0, 0, 0, 0.05)',
      shadowMedium: 'rgba(0, 0, 0, 0.15)',
    },
  },
  dark: {
    name: 'dark',
    label: '深色模式',
    colors: {
      // 主色调
      primary: '#60a5fa',
      primaryHover: '#3b82f6',
      primaryLight: '#1e3a5f',
      
      // 语义色彩
      secondary: '#34d399',
      accent: '#fbbf24',
      accentHover: '#f59e0b',
      accentLight: '#451a03',
      danger: '#f87171',
      dangerLight: '#450a0a',
      warning: '#fbbf24',
      warningLight: '#451a03',
      success: '#34d399',
      successLight: '#022c22',
      info: '#60a5fa',
      infoLight: '#1e3a5f',
      
      // 背景色
      background: '#111827',
      surface: '#1f2937',
      surfaceHover: '#374151',
      
      // 文字色
      text: '#f9fafb',
      textSecondary: '#9ca3af',
      textMuted: '#6b7280',
      textInverse: '#111827',
      
      // 按钮文字色
      buttonPrimaryText: '#ffffff',
      buttonSecondaryText: '#f9fafb',
      buttonAccentText: '#111827',
      
      // 边框色
      border: '#374151',
      borderLight: '#4b5563',
      borderDark: '#1f2937',
      borderFocus: '#60a5fa',
      
      // 阴影
      shadow: 'rgba(0, 0, 0, 0.3)',
      shadowLight: 'rgba(0, 0, 0, 0.2)',
      shadowMedium: 'rgba(0, 0, 0, 0.4)',
    },
  },
  // Jobotics 橙色品牌主题（基于设计规范）
  orange: {
    name: 'orange',
    label: '品牌橙色',
    colors: {
      // 主色调（使用中性色作为主要 UI 元素） Black and gray scale for buttons, text, backgrounds, and borders. Use these as primary colors for UI elements.
      primary: '#0D0D12',
      primaryHover: '#1C1C21',
      primaryLight: '#F5F5F7',
      
      // 语义色彩  
      secondary: '#3F3F45',
      accent: '#FD4A1A',           // 品牌橙色 - 谨慎使用 Orange brand color for accents, highlights, and key interactive elements. Use with restraint.
      accentHover: '#ED3D14',      // Primary 600
      accentLight: '#FFF2ED',      // Primary 50
      danger: '#EF4444',
      dangerLight: '#FEE2E2',
      warning: '#FABD2F',
      warningLight: '#FEF9C3',
      success: '#22C55E',
      successLight: '#DCFCE7',
      info: '#3B8FFA',
      infoLight: '#DBEAFE',
      
      // 背景色
      background: '#F5F5F7',       // Gray 100
      surface: '#FFFFFF',          // White
      surfaceHover: '#F5F5F7',     // Gray 100
      
      // 文字色
      text: '#0D0D12',             // Black
      textSecondary: '#808087',    // Gray 500
      textMuted: '#D1D1D6',        // Gray 300
      textInverse: '#FFFFFF',
      
      // 按钮文字色
      buttonPrimaryText: '#FFFFFF',  
      buttonSecondaryText: '#0D0D12',
      buttonAccentText: '#FFFFFF',
      
      // 边框色
      border: '#D1D1D6',           // Gray 300
      borderLight: '#F5F5F7',      // Gray 100
      borderDark: '#808087',       // Gray 500
      borderFocus: '#FD4A1A',      // 橙色聚焦边框
      
      // 阴影
      shadow: 'rgba(13, 13, 18, 0.1)',
      shadowLight: 'rgba(13, 13, 18, 0.05)',
      shadowMedium: 'rgba(13, 13, 18, 0.15)',
    },
  },
};

// 默认主题
export const defaultTheme = 'orange';

// 获取主题配置
export const getTheme = (themeName) => {
  return themes[themeName] || themes[defaultTheme];
};

// 获取所有可用主题
export const getAvailableThemes = () => {
  return Object.keys(themes).map(key => ({
    name: themes[key].name,
    label: themes[key].label,
  }));
};

export default {
  brand: brandConfig,
  themes,
  defaultTheme,
};

