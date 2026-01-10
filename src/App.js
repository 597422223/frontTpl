import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';

// Components
import Sidebar from './components/Sidebar';
import PageHeader from './components/PageHeader';
import Toast from './components/Toast';
import AuthGuard from './components/AuthGuard';

// Context
import { PageHeaderProvider, usePageHeaderConfig } from './contexts/PageHeaderContext';
import { useTheme } from './contexts/ThemeContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Vista from './pages/Vista';
import FormPage from './pages/FormPage';
import UploadPage from './pages/UploadPage';
import NotFound from './pages/NotFound';

// 带 PageHeader 的布局组件
const LayoutWithHeader = ({ children, sidebarCollapsed, toggleSidebar }) => {
  // 从 Context 获取配置
  const headerConfig = usePageHeaderConfig();
  const { isDark } = useTheme();
  
  return (
    <div className="flex h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main 
          className="flex-1 overflow-y-auto p-6 transition-colors duration-300"
          style={{ backgroundColor: 'var(--color-background)' }}
        >
          {/* 统一的 PageHeader - 配置来自各页面 */}
          <PageHeader
            breadcrumbs={headerConfig.breadcrumbs}
            title={headerConfig.title}
            icon={headerConfig.icon}
            description={headerConfig.description}
            actionButton={headerConfig.actionButton}
          />
          {/* 页面内容 */}
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <div 
      className="App min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Toast />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <AuthGuard>
              <PageHeaderProvider>
                <LayoutWithHeader 
                  sidebarCollapsed={sidebarCollapsed} 
                  toggleSidebar={toggleSidebar}
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/ai-answer/vista" element={<Vista />} />
                    <Route path="/form" element={<FormPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </LayoutWithHeader>
              </PageHeaderProvider>
            </AuthGuard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
