import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * FileUploader 文件上传组件
 * 
 * @param {Object} props
 * @param {string} props.accept - 接受的文件类型，默认 ".pdf"
 * @param {number} props.maxSize - 最大文件大小（字节），默认 50MB
 * @param {string} props.title - 上传区域标题
 * @param {string} props.subtitle - 上传区域副标题
 * @param {string} props.browseButtonText - 浏览按钮文字
 * @param {string} props.changeButtonText - 更换文件按钮文字
 * @param {string} props.retryButtonText - 重试按钮文字
 * @param {Array} props.requirements - 文件要求列表
 * @param {Function} props.onFileSelect - 文件选择回调
 * @param {Function} props.onContinue - 继续按钮回调
 * @param {Function} props.onCancel - 取消按钮回调
 * @param {string} props.cancelButtonText - 取消按钮文字
 * @param {string} props.continueButtonText - 继续按钮文字
 * @param {boolean} props.showActions - 是否显示底部操作按钮
 * @param {Function} props.validateFile - 自定义文件验证函数
 */
const FileUploader = ({
  accept = '.pdf',
  maxSize = 50 * 1024 * 1024,
  title = 'Drag & drop your PDF file here',
  subtitle = 'or click to browse',
  browseButtonText = 'Browse Files',
  changeButtonText = 'Change File',
  retryButtonText = 'Choose Another File',
  requirements = [
    { label: 'Format: PDF only' },
    { label: 'Max size: 50 MB' },
    { label: 'Language: English contracts' },
  ],
  onFileSelect,
  onContinue,
  onCancel,
  cancelButtonText = 'Cancel',
  continueButtonText = 'Continue',
  showActions = true,
  validateFile: customValidate,
}) => {
  // 状态管理
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // 格式化文件大小
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // 默认文件验证
  const defaultValidateFile = (file) => {
    // 检查文件类型
    const acceptTypes = accept.split(',').map(t => t.trim());
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    const isValidType = acceptTypes.some(type => {
      if (type.startsWith('.')) {
        return fileExt === type.toLowerCase();
      }
      return file.type === type;
    });
    
    if (!isValidType) {
      return { valid: false, error: 'Invalid file format', message: `Please upload a valid file (${accept})` };
    }
    // 检查文件大小
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      return { valid: false, error: `File size exceeds ${maxSizeMB}MB limit`, message: `Please upload a file smaller than ${maxSizeMB}MB` };
    }
    return { valid: true };
  };

  // 验证文件
  const validateFile = customValidate || defaultValidateFile;

  // 处理文件选择
  const handleFileSelect = useCallback((file) => {
    const validation = validateFile(file);
    if (validation.valid) {
      setSelectedFile(file);
      setError(null);
      onFileSelect?.(file);
    } else {
      setSelectedFile(null);
      setError(validation);
    }
  }, [validateFile, onFileSelect]);

  // 处理文件输入变化
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
    // 重置 input 以允许选择相同文件
    e.target.value = '';
  };

  // 处理拖拽进入
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // 处理拖拽离开
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // 处理拖拽悬停
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 处理文件拖放
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // 触发文件选择
  const handleBrowseClick = (e) => {
    e?.stopPropagation();
    fileInputRef.current?.click();
  };

  // 取消操作
  const handleCancel = () => {
    setSelectedFile(null);
    setError(null);
    onCancel?.();
  };

  // 继续操作
  const handleContinue = () => {
    if (selectedFile) {
      onContinue?.(selectedFile);
    }
  };

  // 继续操作
  const handleContinue1 = () => {
    if (selectedFile) {
      onContinue?.(selectedFile);
      navigate('/multiple-contracts');
    }
  };

  // 渲染上传区域内容
  const renderUploadContent = () => {
    // 错误状态
    if (error) {
      return (
        <>
          {/* 错误图标 */}
          <div 
            className="w-14 h-14 rounded-lg mx-auto mb-6"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
          
          {/* 错误标题 */}
          <h3 
            className="text-xl font-semibold mb-2"
            style={{ color: 'var(--color-accent)' }}
          >
            {error.error}
          </h3>
          
          {/* 错误描述 */}
          <p 
            className="mb-6"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {error.message}
          </p>
          
          {/* 重新选择按钮 */}
          <button
            onClick={handleBrowseClick}
            className="px-6 py-3 font-medium rounded-full transition-all duration-200 hover:shadow-md"
            style={{ 
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-button-accent-text)'
            }}
          >
            {retryButtonText}
          </button>
        </>
      );
    }

    // 已选择文件状态
    if (selectedFile) {
      return (
        <>
          {/* 文件图标 - 实心橙色 */}
          <div 
            className="w-14 h-14 rounded-lg mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            <span className="text-2xl text-white">✓</span>
          </div>
          
          {/* 文件名 */}
          <h3 
            className="text-xl font-semibold mb-2"
            style={{ color: 'var(--color-text)' }}
          >
            {selectedFile.name}
          </h3>
          
          {/* 文件大小 */}
          <p 
            className="mb-6"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {formatFileSize(selectedFile.size)}
          </p>
          
          {/* 更换文件按钮 */}
          <button
            onClick={handleBrowseClick}
            className="px-8 py-4 font-medium rounded-xl transition-all duration-200 hover:shadow-md"
            style={{ 
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-button-accent-text)'
            }}
          >
            {changeButtonText}
          </button>
        </>
      );
    }

    // 默认状态 - 准备上传
    return (
      <>
        {/* 文件图标 - 淡橙色 */}
        <div 
          className="w-14 h-14 rounded-lg mx-auto mb-6"
          style={{ backgroundColor: 'rgba(253, 74, 26, 0.15)' }}
        />
        
        {/* 标题 */}
        <h3 
          className="text-xl font-semibold mb-2"
          style={{ color: 'var(--color-text)' }}
        >
          {title}
        </h3>
        
        {/* 副标题 */}
        <p 
          className="mb-6"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {subtitle}
        </p>
        
        {/* 浏览文件按钮 */}
        <button
          onClick={handleBrowseClick}
          className="px-8 py-4 font-medium rounded-xl transition-all duration-200 hover:shadow-md"
          style={{ 
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-button-primary-text)'
          }}
        >
          {browseButtonText}
        </button>
      </>
    );
  };

  // 根据状态获取上传区域样式
  const getUploadAreaStyle = () => {
    // 错误状态 - 实心橙色边框
    if (error) {
      return {
        backgroundColor: 'var(--color-accent-light)',
        border: '2px solid var(--color-accent)',
      };
    }
    // 已选择文件状态 - 浅橙色背景 + 实心橙色边框
    if (selectedFile) {
      return {
        backgroundColor: 'var(--color-accent-light)',
        border: '2px solid var(--color-accent)',
      };
    }
    // 默认状态 - 淡橙色边框
    return {
      backgroundColor: 'var(--color-accent-light)',
      border: '2px solid rgba(253, 74, 26, 0.3)',
    };
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 上传区域 */}
      <div
        className={`rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragging ? 'scale-[1.01]' : ''
        }`}
        style={getUploadAreaStyle()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={!error && !selectedFile ? handleBrowseClick : undefined}
      >
        <div className="py-12">
          {renderUploadContent()}
        </div>
        
        {/* 隐藏的文件输入 */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* 文件要求信息 */}
      {requirements && requirements.length > 0 && (
        <div 
          className="rounded-xl p-5"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)'
          }}
        >
          <h4 
            className="font-semibold mb-3"
            style={{ color: 'var(--color-text)' }}
          >
            File Requirements
          </h4>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {requirements.map((req, index) => (
              <span 
                key={index}
                style={{ color: 'var(--color-text-secondary)' }}
              >
                • {req.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 操作按钮 */}
      {showActions && (
        <div className="flex justify-between items-center">
          {/* Cancel 按钮 */}
          <button
            onClick={handleCancel}
            className="px-8 py-3 font-medium rounded-xl transition-all duration-200 hover:bg-gray-50"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)'
            }}
          >
            {cancelButtonText}
          </button>
          
          {/* Continue 按钮 - 仅在选择文件后显示 */}
          {selectedFile && (
            <button
              onClick={handleContinue1}
              className="inline-flex items-center gap-2 px-8 py-3 font-medium rounded-xl transition-all duration-200 hover:shadow-md"
              style={{ 
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-button-primary-text)'
              }}
            >
              <span>{continueButtonText}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {/* Continue 按钮 */}
          <button
            onClick={handleContinue}
            disabled={!selectedFile}
            className={`inline-flex items-center gap-2 px-8 py-3 font-medium rounded-xl transition-all duration-200 ${
              selectedFile ? 'hover:shadow-md' : 'opacity-50 cursor-not-allowed'
            }`}
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
    </div>
  );
};

export default FileUploader;

