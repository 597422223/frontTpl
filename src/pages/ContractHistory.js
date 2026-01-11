import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Trash2, Download, Eye, RotateCcw } from 'lucide-react';
import { usePageHeader } from '../contexts/PageHeaderContext';
import Pagination from '../components/Pagination';

// ========== 页面 Header 配置 ==========
const PAGE_HEADER_CONFIG = {
  breadcrumbs: [
    { label: 'Contract Review', path: '/contract-review' },
    { label: 'History' }
  ],
  title: 'Contract History',
  icon: '📋',
  description: 'View and manage your uploaded contracts.',
};

// ========== 状态配置 ==========
const STATUS_CONFIG = {
  completed: {
    label: 'Completed',
    bgColor: 'var(--color-success-light)',
    textColor: 'var(--color-success)',
  },
  processing: {
    label: 'Processing',
    bgColor: 'var(--color-accent-light)',
    textColor: 'var(--color-accent)',
  },
  failed: {
    label: 'Failed',
    bgColor: 'var(--color-danger-light)',
    textColor: 'var(--color-danger)',
  },
};

// ========== 风险等级配置 ==========
const RISK_CONFIG = {
  high: {
    label: 'High Risk',
    bgColor: 'var(--color-accent-light)',
    textColor: 'var(--color-accent)',
  },
  warning: {
    label: 'Warning',
    bgColor: 'var(--color-warning-light)',
    textColor: 'var(--color-warning)',
  },
  low: {
    label: 'Low Risk',
    bgColor: 'var(--color-success-light)',
    textColor: 'var(--color-success)',
  },
  na: {
    label: 'N/A',
    bgColor: 'var(--color-background)',
    textColor: 'var(--color-text-muted)',
  },
};

// ========== 模拟数据 ==========
const MOCK_CONTRACTS = [
  {
    id: 1,
    fileName: 'Construction_Service_Agreement.pdf',
    pages: 24,
    type: 'PDF Document',
    status: 'completed',
    uploadTime: '2 hours ago',
    size: '3.2 MB',
    riskLevel: 'high',
  },
  {
    id: 2,
    fileName: 'Safety_Inspection_Report_Q4.pdf',
    pages: 18,
    type: 'PDF Document',
    status: 'processing',
    uploadTime: '15 min ago',
    size: '2.8 MB',
    riskLevel: 'warning',
  },
  {
    id: 3,
    fileName: 'Equipment_Purchase_Invoice.pdf',
    pages: 5,
    type: 'PDF Document',
    status: 'failed',
    uploadTime: '1 day ago',
    size: '1.5 MB',
    riskLevel: 'na',
  },
  {
    id: 4,
    fileName: 'Subcontractor_Agreement_Final.pdf',
    pages: 12,
    type: 'PDF Document',
    status: 'completed',
    uploadTime: 'Yesterday',
    size: '2.1 MB',
    riskLevel: 'low',
  },
];

// ========== 过滤标签配置 ==========
const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'processing', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'failed', label: 'Failed' },
];

const ContractHistory = () => {
  usePageHeader(PAGE_HEADER_CONFIG);
  const navigate = useNavigate();

  // 状态
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const pageSize = 10;
  const totalPages = 5; // 模拟总页数

  // 过滤合同
  const filteredContracts = MOCK_CONTRACTS.filter(contract => {
    const matchesSearch = contract.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || contract.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // 全选/取消全选
  const handleSelectAll = () => {
    if (selectedIds.length === filteredContracts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredContracts.map(c => c.id));
    }
  };

  // 单选
  const handleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  // 查看详情
  const handleView = (contract) => {
    navigate('/contract-detail');
  };

  // 重试
  const handleRetry = (contract) => {
    console.log('Retry:', contract.fileName);
  };

  // 下载
  const handleDownload = (contract) => {
    console.log('Download:', contract.fileName);
  };

  // 删除
  const handleDelete = (contract) => {
    console.log('Delete:', contract.fileName);
  };

  // 批量删除
  const handleDeleteSelected = () => {
    console.log('Delete selected:', selectedIds);
  };

  // 批量下载
  const handleDownloadSelected = () => {
    console.log('Download selected:', selectedIds);
  };

  // 渲染状态标签
  const renderStatusBadge = (status) => {
    const config = STATUS_CONFIG[status];
    return (
      <span 
        className="px-3 py-1 text-sm font-medium rounded-lg"
        style={{ 
          backgroundColor: config.bgColor,
          color: config.textColor
        }}
      >
        {config.label}
      </span>
    );
  };

  // 渲染风险等级标签
  const renderRiskBadge = (riskLevel) => {
    const config = RISK_CONFIG[riskLevel];
    return (
      <span 
        className="px-3 py-1 text-sm font-medium rounded-lg"
        style={{ 
          backgroundColor: config.bgColor,
          color: config.textColor
        }}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* 搜索和过滤栏 */}
      <div 
        className="rounded-2xl p-6"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        <div className="flex items-center gap-4">
          {/* 搜索框 */}
          <div 
            className="flex items-center gap-3 px-4 py-3 rounded-xl flex-1 max-w-md"
            style={{ 
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)'
            }}
          >
            <Search className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              placeholder="Search by file name or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: 'var(--color-text)' }}
            />
          </div>

          {/* 过滤标签 */}
          <div className="flex items-center gap-2">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className="px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200"
                style={{ 
                  backgroundColor: activeFilter === tab.id ? 'var(--color-accent)' : 'var(--color-surface)',
                  color: activeFilter === tab.id ? 'white' : 'var(--color-text)',
                  border: activeFilter === tab.id ? 'none' : '1px solid var(--color-border)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* 批量删除 */}
          <button
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
            className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              selectedIds.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
            style={{ 
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)'
            }}
          >
            Delete Selected
          </button>

          {/* 批量下载 */}
          <button
            onClick={handleDownloadSelected}
            disabled={selectedIds.length === 0}
            className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              selectedIds.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
            style={{ 
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)'
            }}
          >
            Download Selected
          </button>
        </div>

        {/* 排序下拉 */}
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gray-50"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)'
            }}
          >
            <span>Sort: {sortBy === 'latest' ? 'Latest First' : 'Oldest First'}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showSortDropdown && (
            <div 
              className="absolute right-0 top-full mt-2 py-2 rounded-xl shadow-lg z-10 min-w-[160px]"
              style={{ 
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)'
              }}
            >
              <button
                onClick={() => { setSortBy('latest'); setShowSortDropdown(false); }}
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
                style={{ color: 'var(--color-text)' }}
              >
                Latest First
              </button>
              <button
                onClick={() => { setSortBy('oldest'); setShowSortDropdown(false); }}
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
                style={{ color: 'var(--color-text)' }}
              >
                Oldest First
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 表格 */}
      <div 
        className="rounded-2xl overflow-hidden"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        {/* 表头 */}
        <div 
          className="grid items-center gap-4 px-6 py-4"
          style={{ 
            gridTemplateColumns: '40px 2fr 120px 120px 80px 120px 180px',
            borderBottom: '1px solid var(--color-border)'
          }}
        >
          {/* 全选复选框 */}
          <div>
            <input
              type="checkbox"
              checked={selectedIds.length === filteredContracts.length && filteredContracts.length > 0}
              onChange={handleSelectAll}
              className="w-5 h-5 rounded cursor-pointer"
              style={{ accentColor: 'var(--color-accent)' }}
            />
          </div>
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>File Name</span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Status</span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Upload Time</span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Size</span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Risk Level</span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Actions</span>
        </div>

        {/* 表格内容 */}
        <div>
          {filteredContracts.map((contract) => (
            <div 
              key={contract.id}
              className="grid items-center gap-4 px-6 py-5 transition-colors hover:bg-gray-50"
              style={{ 
                gridTemplateColumns: '40px 2fr 120px 120px 80px 120px 180px',
                borderBottom: '1px solid var(--color-border)'
              }}
            >
              {/* 复选框 */}
              <div>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(contract.id)}
                  onChange={() => handleSelect(contract.id)}
                  className="w-5 h-5 rounded cursor-pointer"
                  style={{ accentColor: 'var(--color-accent)' }}
                />
              </div>

              {/* 文件名 */}
              <div>
                <p className="font-medium" style={{ color: 'var(--color-text)' }}>
                  {contract.fileName}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {contract.pages} pages • {contract.type}
                </p>
              </div>

              {/* 状态 */}
              <div>
                {renderStatusBadge(contract.status)}
              </div>

              {/* 上传时间 */}
              <div>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {contract.uploadTime}
                </span>
              </div>

              {/* 大小 */}
              <div>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {contract.size}
                </span>
              </div>

              {/* 风险等级 */}
              <div>
                {renderRiskBadge(contract.riskLevel)}
              </div>

              {/* 操作 */}
              <div className="flex items-center gap-3">
                {contract.status === 'failed' ? (
                  <button
                    onClick={() => handleRetry(contract)}
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Retry
                  </button>
                ) : (
                  <button
                    onClick={() => handleView(contract)}
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    View
                  </button>
                )}
                <button
                  onClick={() => handleDownload(contract)}
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Download
                </button>
                <button
                  onClick={() => handleDelete(contract)}
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 分页 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ContractHistory;

