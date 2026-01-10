import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, User, Loader2 } from 'lucide-react';
import { usePageHeader } from '../contexts/PageHeaderContext';

// ========== 页面 Header 配置 ==========
const PAGE_HEADER_CONFIG = {
  breadcrumbs: [
    { label: 'Dashboard', path: '/' },
    { label: 'AI Vista Analyst' }
  ],
  title: 'AI Vista Analyst',
  icon: '💬',
  description: 'AI-powered Vista construction finance data analysis and insights',
};

// ========== 角色配置 ==========
const ROLES = [
  { id: 'executive', label: 'Executive' },
  { id: 'division_lead', label: 'Division Lead' },
  { id: 'finance', label: 'Finance' },
  { id: 'project_manager', label: 'Project Manager' },
  { id: 'general', label: 'General' },
];

// ========== 根据角色的建议问题 ==========
const SUGGESTED_QUESTIONS = {
  executive: [
    'What is the cash position of project 25-480',
    'What is the value of pending change orders for project 24-019',
    'How many AP invoices are unapproved for project 24-019',
    'How many field manhours were spent in Aug\'25 for project 24-019',
  ],
  division_lead: [
    'Show division performance summary for Q4',
    'What projects are over budget in my division',
    'List all active projects by revenue',
    'Show resource allocation across division projects',
  ],
  finance: [
    'What is the accounts receivable aging report',
    'Show cash flow forecast for next quarter',
    'List all pending invoices over 30 days',
    'What is the current billing status for all projects',
  ],
  project_manager: [
    'What is the current budget vs actual for my project',
    'Show pending change orders needing approval',
    'List subcontractor payment status',
    'What is the projected completion cost',
  ],
  general: [
    'How do I access project cost reports',
    'What data is available in Vista',
    'Show me a list of all active projects',
    'Help me understand the financial dashboard',
  ],
};

// ========== 消息组件 ==========
const MessageBubble = ({ message, isUser }) => {
  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="flex items-start max-w-[80%]">
          <div 
            className="px-5 py-3 rounded-2xl rounded-tr-md shadow-sm text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 flex-shrink-0" />
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start max-w-[80%]">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
          style={{ backgroundColor: 'var(--color-primary-light)' }}
        >
          <MessageCircle className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
        </div>
        <div 
          className="px-5 py-3 rounded-2xl rounded-tl-md shadow-sm"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)'
          }}
        >
          <p 
            className="text-sm leading-relaxed whitespace-pre-wrap"
            style={{ color: 'var(--color-text)' }}
          >{message.content}</p>
        </div>
      </div>
    </div>
  );
};

// ========== 进度条动画样式 ==========
const progressBarStyle = {
  animation: 'progress 2s ease-in-out infinite',
};

const progressKeyframes = `
  @keyframes progress {
    0% { width: 0%; }
    50% { width: 70%; }
    100% { width: 100%; }
  }
`;

// ========== 加载指示器组件 ==========
const LoadingIndicator = () => (
  <div className="flex justify-start mb-4">
    <style>{progressKeyframes}</style>
    <div className="flex items-start">
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 animate-pulse"
        style={{ backgroundColor: 'var(--color-primary-light)' }}
      >
        <MessageCircle className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
      </div>
      <div 
        className="px-5 py-4 rounded-2xl rounded-tl-md shadow-sm"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        <div className="flex items-center gap-3">
          <span 
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >Analyzing your question...</span>
        </div>
        <div 
          className="mt-3 h-1 w-48 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--color-border)' }}
        >
          <div 
            className="h-full rounded-full" 
            style={{ ...progressBarStyle, backgroundColor: 'var(--color-primary)' }} 
          />
        </div>
      </div>
    </div>
  </div>
);

// ========== 主页面组件 ==========
const Vista = () => {
  // 设置页面 Header 配置
  usePageHeader(PAGE_HEADER_CONFIG);

  const [selectedRole, setSelectedRole] = useState('executive');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // 发送消息
  const handleSendMessage = async (text) => {
    const messageText = text || inputText.trim();
    if (!messageText || isLoading) return;

    // 添加用户消息
    const userMessage = { id: Date.now(), content: messageText, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // 模拟 AI 响应（实际项目中这里会调用 API）
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        content: `Thank you for your question about "${messageText}". I'm analyzing your Vista construction finance data to provide you with accurate insights. This feature is currently being connected to the Vista backend system.`,
        isUser: false,
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  // 点击建议问题
  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };

  // 处理键盘事件
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 是否显示建议问题（没有消息时显示）
  const showSuggestions = messages.length === 0;

  return (
    <div className="flex flex-col h-[calc(100vh-242px)]">
      {/* 聊天区域 */}
      <div 
        className="flex-1 rounded-2xl overflow-hidden flex flex-col transition-colors duration-300"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        {/* 消息列表 / 建议问题 */}
        <div className="flex-1 overflow-y-auto p-6">
          {showSuggestions ? (
            // 建议问题界面
            <div className="flex flex-col items-center justify-center h-full">
              {/* 角色选择 */}
              <div className="text-center mb-8">
                <p 
                  className="mb-4"
                  style={{ color: 'var(--color-text-secondary)' }}
                >Select your role for tailored Vista financial questions:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {ROLES.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedRole === role.id
                          ? 'text-white shadow-md'
                          : ''
                      }`}
                      style={selectedRole === role.id 
                        ? { backgroundColor: 'var(--color-primary)' }
                        : { 
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            color: 'var(--color-text)'
                          }
                      }
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 建议问题列表 */}
              <div className="w-full max-w-2xl">
                <h3 
                  className="text-center font-semibold mb-4"
                  style={{ color: 'var(--color-text)' }}
                >
                  Suggested Questions for {ROLES.find(r => r.id === selectedRole)?.label}
                </h3>
                <div className="space-y-3">
                  {SUGGESTED_QUESTIONS[selectedRole]?.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="w-full text-left px-5 py-3.5 rounded-xl text-sm transition-all duration-200 hover:shadow-sm"
                      style={{ 
                        backgroundColor: 'var(--color-background)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)'
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // 聊天消息列表
            <div className="space-y-2">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} isUser={message.isUser} />
              ))}
              {isLoading && <LoadingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* 输入区域 */}
        <div 
          className="p-4"
          style={{ 
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-background)'
          }}
        >
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                messages.length > 0
                  ? "Ask about your construction data from Procore and Vista tables..."
                  : "Ask about jobsite job cost related questions..."
              }
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed transition-all"
              style={{ 
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)'
              }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
              className="px-5 py-3 text-white font-medium rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Vista;
