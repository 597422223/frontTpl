import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * 处理步骤状态
 */
const STEP_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

/**
 * ProcessingUploader 文件处理进度组件
 * 
 * @param {Object} props
 * @param {File} props.file - 上传的文件
 * @param {number} props.pageCount - 文件页数
 * @param {string} props.uploadTime - 上传时间描述
 * @param {Function} props.onComplete - 处理完成回调
 * @param {Function} props.onRetry - 重试回调
 * @param {Function} props.onBack - 返回回调
 * @param {Function} props.onContinue - 继续回调
 * @param {string} props.backButtonText - 返回按钮文字
 * @param {string} props.continueButtonText - 继续按钮文字
 * @param {boolean} props.showActions - 是否显示底部按钮
 * @param {Array} props.steps - 处理步骤配置
 */
const ProcessingUploader = ({
  file,
  pageCount = 24,
  uploadTime = '2 min ago',
  onComplete,
  onRetry,
  onBack,
  onContinue,
  backButtonText = 'Back',
  continueButtonText = 'Continue',
  showActions = true,
  steps: customSteps,
}) => {
  const navigate = useNavigate();

  // 默认处理步骤
  const defaultSteps = [
    { id: 'upload', label: 'File Upload', status: STEP_STATUS.COMPLETED },
    { id: 'ocr', label: 'OCR Text Extraction', status: STEP_STATUS.IN_PROGRESS, progress: 0, estimatedTime: '~30s' },
    { id: 'analysis', label: 'AI-Powered Analysis', status: STEP_STATUS.PENDING },
  ];

  const [steps, setSteps] = useState(customSteps || defaultSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  // 格式化文件大小
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 MB';
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(1) + ' MB';
  };

  // 模拟处理进度
  useEffect(() => {
    const currentStep = steps[currentStepIndex];
    if (!currentStep || currentStep.status !== STEP_STATUS.IN_PROGRESS) return;

    const interval = setInterval(() => {
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        const step = newSteps[currentStepIndex];
        
        if (step.progress < 100) {
          step.progress = Math.min(step.progress + Math.random() * 15, 100);
          
          if (step.progress >= 100) {
            step.status = STEP_STATUS.COMPLETED;
            
            // 移动到下一步
            if (currentStepIndex < newSteps.length - 1) {
              setCurrentStepIndex(prev => prev + 1);
              newSteps[currentStepIndex + 1].status = STEP_STATUS.IN_PROGRESS;
              newSteps[currentStepIndex + 1].progress = 0;
            } else {
              // 所有步骤完成
              onComplete?.();
            }
          }
        }
        
        return newSteps;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [currentStepIndex, steps, onComplete]);

  // 处理重试
  const handleRetry = (stepId) => {
    setSteps(prevSteps => {
      const newSteps = [...prevSteps];
      const stepIndex = newSteps.findIndex(s => s.id === stepId);
      if (stepIndex !== -1) {
        newSteps[stepIndex].status = STEP_STATUS.IN_PROGRESS;
        newSteps[stepIndex].progress = 0;
        newSteps[stepIndex].error = null;
        setCurrentStepIndex(stepIndex);
      }
      return newSteps;
    });
    onRetry?.(stepId);
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

  return (
    <>
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
          className="w-16 h-16 rounded-xl flex items-center justify-center"
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
            className="font-semibold text-lg"
            style={{ color: 'var(--color-text)' }}
          >
            {file?.name || 'Document.pdf'}
          </h3>
          <p 
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {pageCount} pages • {formatFileSize(file?.size)} • Uploaded {uploadTime}
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

        <div className="space-y-6">
          {steps.map((step, index) => (
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

                  {/* 失败时显示错误信息和重试按钮 */}
                  {step.status === STEP_STATUS.FAILED && (
                    <>
                      <span 
                        className="text-sm"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {step.error || 'Unable to extract text'}
                      </span>
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
                    </>
                  )}
                </div>

                {/* 进度条 - 仅在进行中时显示 */}
                {step.status === STEP_STATUS.IN_PROGRESS && (
                  <div className="flex items-center gap-3 mt-2">
                    {/* 进度条 */}
                    <div className="flex-1 max-w-xs">
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
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 底部操作按钮 - 在卡片外部 */}
    {showActions && (
      <div className="flex justify-between items-center mt-6">
        {/* Back 按钮 */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-8 py-3 font-medium rounded-xl transition-all duration-200 hover:bg-gray-50"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)'
          }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{backButtonText}</span>
        </button>
        
        {/* Continue 按钮 */}
        <button
          onClick={() => {
            onContinue?.();
            navigate('/contract-detail');
          }}
          className="inline-flex items-center gap-2 px-8 py-3 font-medium rounded-xl transition-all duration-200 hover:shadow-md"
          style={{ 
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-button-primary-text)'
          }}
        >
          <span>{continueButtonText}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    )}
  </>
  );
};

export default ProcessingUploader;

