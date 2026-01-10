import React, { useState, useRef } from 'react';
import { FileText } from 'lucide-react';
import { usePageHeader } from '../contexts/PageHeaderContext';

// ========== 页面 Header 配置 ==========
const PAGE_HEADER_CONFIG = {
  breadcrumbs: [
    { label: 'Dashboard', path: '/' },
    { label: 'UploadPage' }
  ],
  title: 'UploadPage',
  icon: '📄',
  description: 'Upload and analyze your contracts with AI-powered insights.',
};

// ========== 上传状态提示文字 ==========
const UPLOAD_STATUS_MESSAGES = [
  'Analyzing document structure and extracting key clauses...',
  'Identifying potential risks and compliance issues...',
  'Processing contract terms and conditions...',
  'Extracting key dates and obligations...',
];

const UploadPage = () => {
  // 设置页面 Header 配置
  usePageHeader(PAGE_HEADER_CONFIG);

  // 状态管理
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState(UPLOAD_STATUS_MESSAGES[0]);
  const fileInputRef = useRef(null);

  // 格式化文件大小
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // 处理文件选择
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      simulateUpload(file);
    }
  };

  // 模拟上传过程
  const simulateUpload = (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        // 上传完成后的处理
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          setSelectedFile(null);
          // TODO: 跳转到分析结果页面或显示结果
        }, 500);
      }
      setUploadProgress(Math.min(progress, 100));
      
      // 更新状态消息
      const messageIndex = Math.floor((progress / 100) * UPLOAD_STATUS_MESSAGES.length);
      setStatusMessage(UPLOAD_STATUS_MESSAGES[Math.min(messageIndex, UPLOAD_STATUS_MESSAGES.length - 1)]);
    }, 300);
  };

  // 触发文件选择
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-242px)]">
      {/* 上传区域卡片 */}
      <div 
        className="flex-1 rounded-2xl p-8 transition-colors duration-300"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        {/* 内部虚线边框区域 */}
        <div 
          className="h-full border-2 border-dashed rounded-2xl flex items-center justify-center"
          style={{ borderColor: 'var(--color-primary-light)' }}
        >
          <div className="text-center px-6">
            {!isUploading ? (
              // 初始状态 - 准备上传
              <>
                <h2 
                  className="text-2xl font-bold mb-3"
                  style={{ color: 'var(--color-text)' }}
                >
                  Ready to Analyze Your Contract
                </h2>
                <p 
                  className="mb-6 max-w-md mx-auto"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Upload your contract and let AI analyze risks, compliance, and key terms instantly
                </p>
                <button
                  onClick={handleUploadClick}
                  className="inline-flex items-center gap-2 px-6 py-3 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <span className="text-lg">📄</span>
                  <span>Upload & Analyze</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </>
            ) : (
              // 上传中状态
              <>
                <h2 
                  className="text-2xl font-bold mb-3"
                  style={{ color: 'var(--color-text)' }}
                >
                  Uploading Your Contract...
                </h2>
                <p 
                  className="mb-6"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {selectedFile?.name} ({formatFileSize(selectedFile?.size || 0)})
                </p>
                
                {/* 进度条 */}
                <div className="w-80 mx-auto mb-3">
                  <div 
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--color-border)' }}
                  >
                    <div 
                      className="h-full rounded-full transition-all duration-300 ease-out"
                      style={{ 
                        width: `${uploadProgress}%`,
                        backgroundColor: 'var(--color-primary)'
                      }}
                    />
                  </div>
                </div>
                
                {/* 进度百分比 */}
                <p 
                  className="font-medium mb-4"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {Math.round(uploadProgress)}% uploaded
                </p>
                
                {/* 状态消息 */}
                <p 
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {statusMessage}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
