import { Home, Info, Users, Settings, FileText } from 'lucide-react';

/**
 * 路由配置
 * 用于生成导航菜单和权限控制
 */
export const routes = [
  {
    path: '/',
    name: 'home',
    label: '首页',
    icon: Home,
    public: false,
  },
  {
    path: '/about',
    name: 'about',
    label: '关于',
    icon: Info,
    public: false,
  },
  {
    path: '/users',
    name: 'users',
    label: '用户管理',
    icon: Users,
    public: false,
    permission: 'user:view',
  },
  {
    path: '/documents',
    name: 'documents',
    label: '文档',
    icon: FileText,
    public: false,
  },
  {
    path: '/settings',
    name: 'settings',
    label: '设置',
    icon: Settings,
    public: false,
    permission: 'settings:view',
  },
];

/**
 * 公开路由（无需登录）
 */
export const publicRoutes = ['/login', '/register', '/forgot-password'];

/**
 * 检查路由是否需要认证
 */
export const requiresAuth = (path) => {
  return !publicRoutes.includes(path);
};

