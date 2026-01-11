import React from 'react';
import { Check, Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { usePageHeader } from '../contexts/PageHeaderContext';
import { themes } from '../config/theme';

// ========== 页面 Header 配置 ==========
const PAGE_HEADER_CONFIG = {
  breadcrumbs: [{ label: 'Settings' }, { label: 'Theme' }],
  title: 'Theme Settings',
  icon: '🎨',
  description: 'Customize the appearance of your application by selecting a theme.',
};

// 主题图标映射
const themeIcons = {
  light: Sun,
  dark: Moon,
  orange: Palette,
};

// 主题预览颜色配置
const getPreviewColors = (theme) => [
  { label: 'Primary', color: theme.colors.primary },
  { label: 'Accent', color: theme.colors.accent },
  { label: 'Success', color: theme.colors.success },
  { label: 'Warning', color: theme.colors.warning },
  { label: 'Danger', color: theme.colors.danger },
  { label: 'Info', color: theme.colors.info },
];

const ThemeSettings = () => {
  const { themeName, setTheme } = useTheme();
  
  // 设置页面 Header 配置
  usePageHeader(PAGE_HEADER_CONFIG);

  return (
    <div className="space-y-8">
      {/* 当前主题状态 */}
      <div 
        className="rounded-xl p-6 shadow-sm"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Palette className="w-6 h-6" style={{ color: 'var(--color-button-primary-text)' }} />
          </div>
          <div>
            <h2 
              className="text-lg font-semibold"
              style={{ color: 'var(--color-text)' }}
            >
              Current Theme
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              You are using <span 
                className="font-medium px-2 py-0.5 rounded"
                style={{ 
                  backgroundColor: 'var(--color-accent-light)',
                  color: 'var(--color-accent)'
                }}
              >{themes[themeName]?.label}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 主题选择网格 */}
      <div>
        <h3 
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--color-text)' }}
        >
          Available Themes
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(themes).map(([key, theme]) => {
            const isSelected = themeName === key;
            const Icon = themeIcons[key] || Palette;
            const previewColors = getPreviewColors(theme);
            
            return (
              <div
                key={key}
                onClick={() => setTheme(key)}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{ 
                  backgroundColor: theme.colors.surface,
                  border: `2px solid ${isSelected ? theme.colors.accent : theme.colors.border}`,
                  '--tw-ring-color': theme.colors.accent,
                }}
              >
                {/* 选中标记 */}
                {isSelected && (
                  <div 
                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center z-10"
                    style={{ backgroundColor: theme.colors.accent }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                
                {/* 主题预览头部 */}
                <div 
                  className="p-4"
                  style={{ backgroundColor: theme.colors.background }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: theme.colors.primary }}
                    >
                      <Icon className="w-5 h-5" style={{ color: theme.colors.buttonPrimaryText }} />
                    </div>
                    <div>
                      <h4 
                        className="font-semibold"
                        style={{ color: theme.colors.text }}
                      >
                        {theme.label}
                      </h4>
                      <p 
                        className="text-xs"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        {key === 'light' && 'Clean and bright'}
                        {key === 'dark' && 'Easy on the eyes'}
                        {key === 'orange' && 'Brand identity'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 颜色预览 */}
                <div className="p-4">
                  <p 
                    className="text-xs font-medium mb-2"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    Color Palette
                  </p>
                  <div className="flex gap-2">
                    {previewColors.map((item, index) => (
                      <div
                        key={index}
                        className="flex-1 h-8 rounded-md transition-transform hover:scale-110"
                        style={{ backgroundColor: item.color }}
                        title={item.label}
                      />
                    ))}
                  </div>
                </div>
                
                {/* UI 预览 */}
                <div 
                  className="p-4 space-y-3"
                  style={{ 
                    backgroundColor: theme.colors.surface,
                    borderTop: `1px solid ${theme.colors.border}`
                  }}
                >
                  {/* 模拟按钮 */}
                  <div className="flex gap-2">
                    <div 
                      className="flex-1 py-2 rounded-lg text-center text-xs font-medium"
                      style={{ 
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.buttonPrimaryText
                      }}
                    >
                      Primary
                    </div>
                    <div 
                      className="flex-1 py-2 rounded-lg text-center text-xs font-medium"
                      style={{ 
                        backgroundColor: theme.colors.accent,
                        color: theme.colors.buttonAccentText
                      }}
                    >
                      Accent
                    </div>
                  </div>
                  
                  {/* 模拟卡片 */}
                  <div 
                    className="p-3 rounded-lg"
                    style={{ 
                      backgroundColor: theme.colors.background,
                      border: `1px solid ${theme.colors.border}`
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: theme.colors.primaryLight }}
                      />
                      <div className="flex-1">
                        <div 
                          className="h-2 rounded mb-1"
                          style={{ 
                            backgroundColor: theme.colors.text,
                            width: '60%',
                            opacity: 0.8
                          }}
                        />
                        <div 
                          className="h-2 rounded"
                          style={{ 
                            backgroundColor: theme.colors.textMuted,
                            width: '40%'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 颜色详情 */}
      <div 
        className="rounded-xl p-6 shadow-sm"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        <h3 
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--color-text)' }}
        >
          Current Theme Colors
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Object.entries(themes[themeName]?.colors || {}).slice(0, 12).map(([key, value]) => (
            <div key={key} className="text-center">
              <div 
                className="w-full h-16 rounded-lg mb-2 shadow-sm"
                style={{ 
                  backgroundColor: value,
                  border: '1px solid var(--color-border)'
                }}
              />
              <p 
                className="text-xs font-medium truncate"
                style={{ color: 'var(--color-text)' }}
              >
                {key}
              </p>
              <p 
                className="text-xs font-mono"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 使用提示 */}
      <div 
        className="rounded-xl p-6"
        style={{ 
          backgroundColor: 'var(--color-info-light)',
          border: '1px solid var(--color-info)'
        }}
      >
        <div className="flex gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'var(--color-info)' }}
          >
            <span className="text-white text-sm">💡</span>
          </div>
          <div>
            <h4 
              className="font-semibold mb-1"
              style={{ color: 'var(--color-info)' }}
            >
              Theme Tips
            </h4>
            <ul 
              className="text-sm space-y-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <li>• <strong>Light Mode</strong>: Best for bright environments and daytime use</li>
              <li>• <strong>Dark Mode</strong>: Reduces eye strain in low-light conditions</li>
              <li>• <strong>Brand Orange</strong>: Jobotics brand identity with orange accents</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;

