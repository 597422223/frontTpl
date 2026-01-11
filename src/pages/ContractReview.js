import React, { useState } from 'react';
import { usePageHeader } from '../contexts/PageHeaderContext';
import FileUploader from '../components/FileUploader';
import ProcessingUploader from '../components/ProcessingUploader';

// ========== 页面 Header 配置 ==========
const PAGE_HEADER_CONFIG = {
  breadcrumbs: [
    { label: 'Contract Review', path: '/contract-review' },
    { label: 'Upload' }
  ],
  title: 'Contract Review',
  icon: '📋',
  description: 'Upload your PDF contract for AI-powered analysis and review.',
};

// ========== 文件要求配置 ==========
const FILE_REQUIREMENTS = [
  { label: 'Format: PDF only' },
  { label: 'Max size: 50 MB' },
  { label: 'Language: English contracts' },
];

const ContractReview = () => {
  // 设置页面 Header 配置
  usePageHeader(PAGE_HEADER_CONFIG);

  // 状态管理
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // 处理文件选择
  const handleFileSelect = (file) => {
    console.log('File selected:', file.name);
    setSelectedFile(file);
  };

  // 处理继续操作 - 开始处理
  const handleContinue = (file) => {
    console.log('Continue with file:', file.name);
    setSelectedFile(file);
    setIsProcessing(true);
  };

  // 处理取消操作
  const handleCancel = () => {
    console.log('Upload cancelled');
    setSelectedFile(null);
    setIsProcessing(false);
  };

  // 处理完成
  const handleProcessingComplete = () => {
    console.log('Processing completed');
    // TODO: 跳转到结果页面
  };

  // 处理重试
  const handleRetry = (stepId) => {
    console.log('Retry step:', stepId);
  };

  return (
    <>
      {!isProcessing ? (
        <FileUploader
          accept=".pdf"
          maxSize={50 * 1024 * 1024}
          title="Drag & drop your PDF file here"
          subtitle="or click to browse"
          browseButtonText="Browse Files"
          changeButtonText="Choose Another File"
          retryButtonText="Choose Another File"
          requirements={FILE_REQUIREMENTS}
          onFileSelect={handleFileSelect}
          onContinue={handleContinue}
          onCancel={handleCancel}
          cancelButtonText="Cancel"
          continueButtonText="Continue"
          showActions={true}
        />
      ) : (
        <ProcessingUploader
          file={selectedFile}
          pageCount={24}
          uploadTime="2 min ago"
          onComplete={handleProcessingComplete}
          onRetry={handleRetry}
          onBack={() => setIsProcessing(false)}
          onContinue={handleProcessingComplete}
          backButtonText="Back"
          continueButtonText="Continue"
          showActions={true}
        />
      )}
    </>
  );
};

export default ContractReview;
