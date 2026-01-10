import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Book,
  Bot,
  BarChart3,
  LogOut,
  Upload
} from 'lucide-react';

import logo from '../assets/images/logo.png';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

// 菜单配置
const menuItems = [
  { 
    id: 'dashboard',
    path: '/', 
    icon: LayoutDashboard, 
    label: 'Dashboard'
  },
  { 
    id: 'form',
    path: '/form', 
    icon: Book, 
    label: 'FormPage',
    badge: { text: 'READ', type: 'primary' }
  },
  { 
    id: 'uploadPage',
    path: '/upload', 
    icon: Upload, 
    label: 'UploadPage',
    badge: { text: 'NEW', type: 'warning', icon: '⚡' }
  },
  { 
    id: 'ai-answer',
    path: '/ai-answer', 
    icon: Bot, 
    label: 'AI Answer',
    children: [
      { id: 'vista', path: '/ai-answer/vista', icon: BarChart3, label: 'Vista Analyst' },
    ]
  },
];

const Sidebar = ({ collapsed, onToggle }) => {
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState([]); // 默认收起所有子菜单
  const { isDark } = useTheme();
  
  // 获取用户信息
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || 'Admin User';
  const userEmail = user.email || 'admin@jobotics.ai';
  const userRole = user.role || 'Administrator';

  // 切换子菜单展开
  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  // 退出登录
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // 渲染徽章
  const renderBadge = (badge) => {
    if (!badge) return null;
    
    const baseClass = "ml-auto px-2 py-0.5 text-xs font-semibold rounded-full flex items-center";
    const typeClass = badge.type === 'warning' 
      ? 'bg-amber-100 text-amber-600' 
      : 'text-white';
    
    return (
      <span 
        className={`${baseClass} ${typeClass}`}
        style={badge.type !== 'warning' ? { backgroundColor: 'var(--color-primary)' } : {}}
      >
        {badge.icon && <span className="mr-0.5">{badge.icon}</span>}
        {badge.text}
      </span>
    );
  };

  // 渲染菜单项
  const renderMenuItem = (item) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.id);
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <li key={item.id}>
          {item.divider && (
            <div 
              className="my-2"
              style={{ borderTop: '1px solid var(--color-border-light)' }}
            ></div>
          )}
          <button
            onClick={() => toggleSubmenu(item.id)}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="ml-3 font-medium">{item.label}</span>
                <span className="ml-auto">
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </span>
              </>
            )}
          </button>
          
          {/* 子菜单 */}
          {!collapsed && isExpanded && (
            <ul className="ml-4 mt-1 space-y-1">
              {item.children.map(child => {
                const ChildIcon = child.icon;
                return (
                  <li key={child.id}>
                    <NavLink
                      to={child.path}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-2.5 rounded-xl transition-colors`
                      }
                      style={({ isActive }) => 
                        isActive 
                          ? { 
                              backgroundColor: 'var(--color-primary-light)', 
                              color: 'var(--color-primary)' 
                            }
                          : { color: 'var(--color-text-muted)' }
                      }
                    >
                      <ChildIcon className="w-4 h-4" />
                      <span className="ml-3 text-sm">{child.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    }

    return (
      <li key={item.id}>
        {item.divider && (
          <div 
            className="my-2"
            style={{ borderTop: '1px solid var(--color-border-light)' }}
          ></div>
        )}
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-xl transition-colors ${collapsed ? 'justify-center' : ''}`
          }
          style={({ isActive }) => 
            isActive 
              ? { 
                  backgroundColor: 'var(--color-primary-light)', 
                  color: 'var(--color-primary)',
                  border: '1px solid var(--color-primary)'
                }
              : { 
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid transparent'
                }
          }
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          {!collapsed && (
            <>
              <span className="ml-3 font-medium">{item.label}</span>
              {renderBadge(item.badge)}
            </>
          )}
        </NavLink>
      </li>
    );
  };

  return (
    <aside 
      className={`flex flex-col transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
      style={{ 
        backgroundColor: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)'
      }}
    >
      {/* Logo */}
      <div 
        className="flex items-center px-3"
        style={{ borderBottom: '1px solid var(--color-border-light)' }}
      >
        {/* Logo 居中显示 */}
        <div className="flex-1 flex items-center justify-center">
          {!collapsed && <img src={logo} alt="Jobotics" className="w-32" />}
          {collapsed && (
            <div 
              className="w-10 h-10 my-3 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <span className="text-white font-bold text-lg">J</span>
            </div>
          )}
        </div>
        
        {/* 折叠按钮 */}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg transition-colors flex-shrink-0"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {menuItems.map(renderMenuItem)}
        </ul>
      </nav>

      {/* User Info */}
      <div 
        className="p-4"
        style={{ borderTop: '1px solid var(--color-border-light)' }}
      >
        <div className={`flex items-center ${collapsed ? 'justify-center' : ''}`}>
          {/* Avatar */}
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <span className="text-white font-semibold text-lg">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          
          {!collapsed && (
            <>
              {/* User Details */}
              <div className="ml-3 flex-1 min-w-0">
                <p 
                  className="text-sm font-semibold truncate"
                  style={{ color: 'var(--color-text)' }}
                >{userName}</p>
                <p 
                  className="text-xs truncate"
                  style={{ color: 'var(--color-text-secondary)' }}
                >{userEmail}</p>
                <span 
                  className="text-xs font-medium"
                  style={{ color: 'var(--color-primary)' }}
                >{userRole}</span>
              </div>
              
              {/* Theme Toggle Button */}
              <ThemeToggle size="sm" className="mr-1" />
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--color-warning)' }}
                title="退出登录"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
        
        {/* Collapsed buttons */}
        {collapsed && (
          <div className="mt-2 flex flex-col items-center gap-1">
            {/* Theme Toggle */}
            <ThemeToggle size="sm" />
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--color-warning)' }}
              title="退出登录"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
