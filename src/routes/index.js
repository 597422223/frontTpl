import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import About from '../pages/About';
import NotFound from '../pages/NotFound';

// Components
import AuthGuard from '../components/AuthGuard';

/**
 * 应用路由配置组件
 * 可在此处集中管理所有路由
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* 公开路由 */}
      <Route path="/login" element={<Login />} />
      
      {/* 受保护路由 */}
      <Route
        path="/"
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }
      />
      <Route
        path="/about"
        element={
          <AuthGuard>
            <About />
          </AuthGuard>
        }
      />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

