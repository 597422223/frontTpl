import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// 创建 Context
const PageHeaderContext = createContext(null);

// 默认配置
const defaultConfig = {
  breadcrumbs: [],
  title: '',
  icon: '',
  description: '',
  actionButton: null
};

/**
 * PageHeader Provider
 * 在 App.js 中包裹需要使用 PageHeader 的组件
 */
export const PageHeaderProvider = ({ children }) => {
  const [config, setConfig] = useState(defaultConfig);

  // 更新配置
  const updateConfig = useCallback((newConfig) => {
    setConfig(prev => ({
      ...defaultConfig,
      ...newConfig
    }));
  }, []);

  // 重置配置
  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  return (
    <PageHeaderContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </PageHeaderContext.Provider>
  );
};

/**
 * 获取 PageHeader 配置的 Hook
 * 用于 PageHeader 组件读取配置
 */
export const usePageHeaderConfig = () => {
  const context = useContext(PageHeaderContext);
  if (!context) {
    throw new Error('usePageHeaderConfig must be used within PageHeaderProvider');
  }
  return context.config;
};

/**
 * 设置 PageHeader 配置的 Hook
 * 用于页面组件设置自己的 Header 配置
 * 
 * @example
 * // 在页面组件中使用
 * usePageHeader({
 *   breadcrumbs: [{ label: 'Dashboard', path: '/' }, { label: 'About' }],
 *   title: 'About Us',
 *   icon: 'ℹ️',
 *   description: 'Learn more about this project.',
 *   actionButton: { icon: '✨', label: 'Action', onClick: () => {} }
 * });
 */
export const usePageHeader = (pageConfig) => {
  const context = useContext(PageHeaderContext);
  if (!context) {
    throw new Error('usePageHeader must be used within PageHeaderProvider');
  }

  const { updateConfig, resetConfig } = context;

  // 组件挂载/更新时设置配置，卸载时重置
  useEffect(() => {
    if (pageConfig) {
      updateConfig(pageConfig);
    }
    
    return () => {
      resetConfig();
    };
    // 只依赖 title 来决定是否更新，避免无限循环
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageConfig?.title, updateConfig, resetConfig]);

  return updateConfig;
};

export default PageHeaderContext;

