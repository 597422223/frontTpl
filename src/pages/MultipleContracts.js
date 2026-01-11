import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { usePageHeader } from '../contexts/PageHeaderContext';

// ========== 页面 Header 配置 ==========
const PAGE_HEADER_CONFIG = {
  breadcrumbs: [
    { label: 'Contract Review', path: '/contract-review' },
    { label: 'Batch Processing' }
  ],
  title: 'Batch Contract Processing',
  icon: '📁',
  description: 'Process multiple contracts simultaneously with AI-powered analysis.',
};

// ========== 处理步骤状态 ==========
const STEP_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

// ========== 模拟文件数据 ==========
const MOCK_FILES = [
  {
    id: 1,
    name: 'Construction_Service_Agreement_2024.pdf',
    pageCount: 24,
    size: 3.2 * 1024 * 1024,
    uploadTime: '2 min ago',
    steps: [
      { id: 'upload', label: 'File Upload', status: STEP_STATUS.COMPLETED },
      { id: 'ocr', label: 'OCR Text Extraction', status: STEP_STATUS.IN_PROGRESS, progress: 70, estimatedTime: '~30s' },
      { id: 'analysis', label: 'AI-Powered Analysis', status: STEP_STATUS.PENDING },
    ],
  },
  {
    id: 2,
    name: 'Safety_Inspection_Report_Q4.pdf',
    pageCount: 18,
    size: 2.8 * 1024 * 1024,
    uploadTime: '5 min ago',
    steps: [
      { id: 'upload', label: 'File Upload', status: STEP_STATUS.COMPLETED },
      { id: 'ocr', label: 'OCR Text Extraction', status: STEP_STATUS.COMPLETED },
      { id: 'analysis', label: 'AI-Powered Analysis', status: STEP_STATUS.COMPLETED },
    ],
  },
  {
    id: 3,
    name: 'Equipment_Purchase_Invoice.pdf',
    pageCount: 5,
    size: 1.5 * 1024 * 1024,
    uploadTime: '8 min ago',
    steps: [
      { id: 'upload', label: 'File Upload', status: STEP_STATUS.COMPLETED },
      { id: 'ocr', label: 'OCR Text Extraction', status: STEP_STATUS.FAILED, error: 'Unable to extract text' },
      { id: 'analysis', label: 'AI-Powered Analysis', status: STEP_STATUS.PENDING },
    ],
  },
  {
    id: 4,
    name: 'Subcontractor_Agreement_Final.pdf',
    pageCount: 12,
    size: 2.1 * 1024 * 1024,
    uploadTime: '3 min ago',
    steps: [
      { id: 'upload', label: 'File Upload', status: STEP_STATUS.COMPLETED },
      { id: 'ocr', label: 'OCR Text Extraction', status: STEP_STATUS.IN_PROGRESS, progress: 35, estimatedTime: '~30s' },
      { id: 'analysis', label: 'AI-Powered Analysis', status: STEP_STATUS.PENDING },
    ],
  },
];

// ========== 文件卡片组件 ==========
const FileCard = ({ file, onRetry }) => {
  const [steps, setSteps] = useState(file.steps);

  // 格式化文件大小
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 MB';
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(1) + ' MB';
  };

  // 获取状态图标颜色
  const getStatusColor = (status) => {
    switch (status) {
      case STEP_STATUS.COMPLETED:
        return 'var(--color-success)';
      case STEP_STATUS.IN_PROGRESS:
        return 'var(--color-accent)';
      case STEP_STATUS.FAILED:
        return 'var(--color-accent)';
      default:
        return 'var(--color-text-muted)';
    }
  };

  // 获取状态文字
  const getStatusText = (step) => {
    switch (step.status) {
      case STEP_STATUS.COMPLETED:
        return 'Completed';
      case STEP_STATUS.IN_PROGRESS:
        return 'In Progress...';
      case STEP_STATUS.FAILED:
        return 'Failed';
      default:
        return 'Pending';
    }
  };

  // 获取状态文字颜色
  const getStatusTextColor = (status) => {
    switch (status) {
      case STEP_STATUS.COMPLETED:
        return 'var(--color-success)';
      case STEP_STATUS.IN_PROGRESS:
        return 'var(--color-accent)';
      case STEP_STATUS.FAILED:
        return 'var(--color-danger)';
      default:
        return 'var(--color-text-muted)';
    }
  };

  // 处理重试
  const handleRetry = (stepId) => {
    setSteps(prevSteps => {
      const newSteps = [...prevSteps];
      const stepIndex = newSteps.findIndex(s => s.id === stepId);
      if (stepIndex !== -1) {
        newSteps[stepIndex].status = STEP_STATUS.IN_PROGRESS;
        newSteps[stepIndex].progress = 0;
        newSteps[stepIndex].error = null;
      }
      return newSteps;
    });
    onRetry?.(file.id, stepId);
  };

  return (
    <div 
      className="rounded-2xl p-6"
      style={{ 
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)'
      }}
    >
      {/* 文件信息头部 */}
      <div className="flex items-center gap-4 mb-6">
        {/* PDF 图标 */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'var(--color-accent-light)' }}
        >
          <span 
            className="text-xs font-bold"
            style={{ color: 'var(--color-accent)' }}
          >
            PDF
          </span>
        </div>
        
        {/* 文件详情 */}
        <div>
          <h3 
            className="font-semibold"
            style={{ color: 'var(--color-text)' }}
          >
            {file.name}
          </h3>
          <p 
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {file.pageCount} pages • {formatFileSize(file.size)} • Uploaded {file.uploadTime}
          </p>
        </div>
      </div>

      {/* 处理步骤 */}
      <div className="relative pl-4">
        {/* 左侧橙色竖线 */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
          style={{ backgroundColor: 'var(--color-accent)' }}
        />

        <div className="space-y-5">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-3">
              {/* 状态图标 */}
              <div 
                className="w-5 h-5 rounded flex-shrink-0 mt-0.5"
                style={{ backgroundColor: getStatusColor(step.status) }}
              />
              
              {/* 步骤内容 */}
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  {/* 步骤名称 */}
                  <span 
                    className="font-medium"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {step.label}
                  </span>
                  
                  {/* 状态文字 */}
                  <span 
                    className="text-sm font-medium"
                    style={{ color: getStatusTextColor(step.status) }}
                  >
                    {getStatusText(step)}
                  </span>

                  {/* 进度条 - 仅在进行中时显示 */}
                  {step.status === STEP_STATUS.IN_PROGRESS && (
                    <>
                      {/* 进度条 */}
                      <div className="w-24">
                        <div 
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ backgroundColor: 'var(--color-border)' }}
                        >
                          <div 
                            className="h-full rounded-full transition-all duration-300"
                            style={{ 
                              width: `${step.progress || 0}%`,
                              backgroundColor: 'var(--color-accent)'
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* 百分比 */}
                      <span 
                        className="text-sm font-medium"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        {Math.round(step.progress || 0)}%
                      </span>

                      {/* 加载动画点 */}
                      <div className="flex gap-1">
                        <span 
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: 'var(--color-accent)' }}
                        />
                        <span 
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: 'var(--color-accent)', animationDelay: '0.2s' }}
                        />
                        <span 
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: 'var(--color-accent)', animationDelay: '0.4s' }}
                        />
                      </div>

                      {/* 预计时间 */}
                      {step.estimatedTime && (
                        <div 
                          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs"
                          style={{ 
                            backgroundColor: 'var(--color-background)',
                            color: 'var(--color-text-secondary)'
                          }}
                        >
                          <Clock className="w-3 h-3" />
                          <span>{step.estimatedTime}</span>
                        </div>
                      )}
                    </>
                  )}

                  {/* 失败时显示重试按钮 */}
                  {step.status === STEP_STATUS.FAILED && (
                    <button
                      onClick={() => handleRetry(step.id)}
                      className="px-4 py-1.5 text-sm font-medium rounded-lg transition-all hover:shadow-md"
                      style={{ 
                        backgroundColor: 'var(--color-accent)',
                        color: 'var(--color-button-accent-text)'
                      }}
                    >
                      Retry
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ========== 主页面组件 ==========
const MultipleContracts = () => {
  usePageHeader(PAGE_HEADER_CONFIG);
  const navigate = useNavigate();

  const [files] = useState(MOCK_FILES);

  // 计算统计数据
  const stats = {
    total: files.length,
    completed: files.filter(f => f.steps.every(s => s.status === STEP_STATUS.COMPLETED)).length,
    inProgress: files.filter(f => f.steps.some(s => s.status === STEP_STATUS.IN_PROGRESS)).length,
    failed: files.filter(f => f.steps.some(s => s.status === STEP_STATUS.FAILED)).length,
  };

  // 处理重试
  const handleRetry = (fileId, stepId) => {
    console.log('Retry file:', fileId, 'step:', stepId);
  };

  return (
    <div className="space-y-6">
      {/* 批量进度概览 */}
      <div 
        className="rounded-2xl p-6"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        <h2 
          className="text-lg font-bold mb-6"
          style={{ color: 'var(--color-text)' }}
        >
          Batch Progress Overview
        </h2>
        
        <div className="flex gap-16">
          {/* Total Files */}
          <div>
            <p 
              className="text-3xl font-bold"
              style={{ color: 'var(--color-text)' }}
            >
              {stats.total} Files
            </p>
            <p 
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Total Files
            </p>
          </div>
          
          {/* Completed */}
          <div>
            <p 
              className="text-3xl font-bold"
              style={{ color: 'var(--color-success)' }}
            >
              {stats.completed}
            </p>
            <p 
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Completed
            </p>
          </div>
          
          {/* In Progress */}
          <div>
            <p 
              className="text-3xl font-bold"
              style={{ color: 'var(--color-accent)' }}
            >
              {stats.inProgress}
            </p>
            <p 
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              In Progress
            </p>
          </div>
          
          {/* Failed */}
          <div>
            <p 
              className="text-3xl font-bold"
              style={{ color: 'var(--color-danger)' }}
            >
              {stats.failed}
            </p>
            <p 
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Failed
            </p>
          </div>
        </div>
      </div>

      {/* 文件列表 */}
      {files.map((file) => (
        <FileCard 
          key={file.id} 
          file={file} 
          onRetry={handleRetry}
        />
      ))}

      {/* 底部操作按钮 */}
      <div className="flex justify-between items-center">
        {/* Back 按钮 */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-8 py-3 font-medium rounded-xl transition-all duration-200 hover:bg-gray-50"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)'
          }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        {/* Continue 按钮 */}
        <button
          onClick={() => navigate('/contract-detail')}
          className="inline-flex items-center gap-2 px-8 py-3 font-medium rounded-xl transition-all duration-200 hover:shadow-md"
          style={{ 
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-button-primary-text)'
          }}
        >
          <span>View Results</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MultipleContracts;

