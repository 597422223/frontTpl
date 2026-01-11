import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Minus, 
  Plus, 
  Search,
  Square,
  Underline,
  MessageSquare,
  Link2,
  ArrowRight,
  Clock,
  User,
  X
} from 'lucide-react';
import { usePageHeader } from '../contexts/PageHeaderContext';

// ========== 页面 Header 配置 ==========
const PAGE_HEADER_CONFIG = {
  breadcrumbs: [
    { label: 'Contract Review', path: '/contract-review' },
    { label: 'Analysis' }
  ],
  title: 'Contract Analysis',
  icon: '📄',
  description: 'AI-powered contract analysis and review.',
};

// ========== 模拟数据 ==========
const MOCK_ANNOTATIONS = [
  {
    id: 1,
    user: { name: 'John Doe', avatar: null },
    time: '2 hours ago',
    type: 'Highlight',
    content: 'This payment term seems risky. Need to discuss with the legal team.',
    page: 12,
  },
  {
    id: 2,
    user: { name: 'John Doe', avatar: null },
    time: '2 hours ago',
    type: 'Highlight',
    content: 'This payment term seems risky. Need to discuss with the legal team.',
    page: 12,
  },
];

const MOCK_KEY_FINDINGS = [
  {
    id: 1,
    type: 'HIGH RISK',
    title: 'Payment Schedule Concerns',
    description: 'Section 3.2 requires 30% upfront payment which is higher than industry standard. Consider negotiating this to 10-15%.',
    assignee: 'John Doe',
    status: 'In Review',
  },
  {
    id: 2,
    type: 'WARNING',
    title: 'Liability Cap Below Standard',
    description: 'Section 5.1 limits liability to contract price. Recommend adding professional liability insurance clause.',
    assignee: null,
    status: null,
  },
];

const MOCK_TASKS = [
  {
    id: 1,
    type: 'HIGH RISK',
    title: 'Payment Schedule Concerns',
    description: 'Section 3.2 requires 30% upfront payment. Need to negotiate down to 10-15%.',
    assignee: 'John Doe',
    status: 'In Review',
    dueDate: 'Jan 15',
  },
  {
    id: 2,
    type: 'HIGH RISK',
    title: 'Payment Schedule Concerns',
    description: 'Section 3.2 requires 30% upfront payment. Need to negotiate down to 10-15%.',
    assignee: 'John Doe',
    status: 'In Review',
    dueDate: 'Jan 15',
  },
  {
    id: 3,
    type: 'HIGH RISK',
    title: 'Payment Schedule Concerns',
    description: 'Section 3.2 requires 30% upfront payment. Need to negotiate down to 10-15%.',
    assignee: 'John Doe',
    status: 'In Review',
    dueDate: 'Jan 15',
  },
];

const MOCK_COMMENTS = [
  {
    id: 1,
    user: { name: 'Sarah Chen', avatar: null },
    time: '1 hour ago',
    content: 'Agreed, we should negotiate this down. @john can you reach out to their legal team?',
  },
];

const ContractsDel = () => {
  usePageHeader(PAGE_HEADER_CONFIG);

  const [currentPage, setCurrentPage] = useState(12);
  const [totalPages] = useState(24);
  const [zoom, setZoom] = useState(100);
  const [annotationTab, setAnnotationTab] = useState('all');
  const [taskTab, setTaskTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 导出弹窗状态
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportContent, setExportContent] = useState({
    originalContract: true,
    aiAnalysis: true,
    riskFindings: true,
    recommendations: true,
  });

  // 渲染风险标签
  const renderRiskBadge = (type) => {
    const isHighRisk = type === 'HIGH RISK';
    return (
      <span 
        className="px-2 py-1 text-xs font-semibold rounded"
        style={{ 
          backgroundColor: isHighRisk ? 'var(--color-accent)' : 'var(--color-warning)',
          color: 'white'
        }}
      >
        {type}
      </span>
    );
  };

  // 渲染状态标签
  const renderStatusBadge = (status) => {
    if (!status) return null;
    return (
      <span 
        className="px-2 py-0.5 text-xs font-medium rounded"
        style={{ 
          backgroundColor: 'var(--color-accent)',
          color: 'white'
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-240px)] overflow-hidden">
      {/* 左侧 - 文档预览 */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* 工具栏 */}
        <div 
          className="flex items-center justify-between px-4 py-2 rounded-t-xl"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)'
          }}
        >
          <div className="flex items-center gap-2">
            {/* 页码导航 */}
            <button 
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              <ChevronLeft className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
            </button>
            <span className="text-sm" style={{ color: 'var(--color-text)' }}>
              Page {currentPage} / {totalPages}
            </span>
            <button 
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            >
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
            </button>
            
            <div className="w-px h-5 mx-2" style={{ backgroundColor: 'var(--color-border)' }} />
            
            {/* 缩放 */}
            <button 
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => setZoom(Math.max(50, zoom - 10))}
            >
              <Minus className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
            </button>
            <span className="text-sm min-w-[50px] text-center" style={{ color: 'var(--color-text)' }}>
              {zoom}%
            </span>
            <button 
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => setZoom(Math.min(200, zoom + 10))}
            >
              <Plus className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* 标记按钮 */}
            <div 
              className="flex items-center gap-1 px-2 py-1 rounded"
              style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
            >
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'white', opacity: 0.8 }} />
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'white', opacity: 0.5 }} />
            </div>
            
            {/* 搜索 */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg" style={{ backgroundColor: 'var(--color-background)' }}>
              <Search className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
              <input 
                type="text"
                placeholder="Search in contract..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm outline-none w-32"
                style={{ color: 'var(--color-text)' }}
              />
            </div>
            
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              3 / 15
            </span>
          </div>
        </div>

        {/* 文档内容区域 */}
        <div 
          className="flex-1 flex rounded-b-xl overflow-hidden"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            borderLeft: '1px solid var(--color-border)',
            borderRight: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)'
          }}
        >
          {/* 左侧工具栏 */}
          <div 
            className="flex flex-col gap-2 p-2"
            style={{ borderRight: '1px solid var(--color-border)' }}
          >
            <button className="p-2 rounded-lg hover:bg-gray-100" style={{ color: 'var(--color-accent)' }}>
              <Square className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100" style={{ color: 'var(--color-text-muted)' }}>
              <Underline className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100" style={{ color: 'var(--color-text-muted)' }}>
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100" style={{ color: 'var(--color-text-muted)' }}>
              <Link2 className="w-5 h-5" />
            </button>
          </div>

          {/* 文档内容 */}
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              CONSTRUCTION SERVICE AGREEMENT
            </h2>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              This Construction Service Agreement ("Agreement") is entered into as of January 15, 2024 
              ("Effective Date"), by and between Hudson Yards Development LLC ("Client") and BuildTech 
              Construction Inc. ("Contractor").
            </p>
            
            <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>1. SCOPE OF WORK</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Contractor shall provide all labor, materials, equipment, and services necessary for the construction 
              of a 12-story mixed-use building located at 450 West 33rd Street, New York, NY.
            </p>

            <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>2. PROJECT TIMELINE</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              The work shall commence on February 1, 2024, and shall be substantially completed within 
              eighteen (18) months from the commencement date. Time is of the essence in this Agreement.
            </p>

            {/* 高亮条款 */}
            <div 
              className="p-4 rounded-lg mb-4"
              style={{ 
                backgroundColor: 'var(--color-accent-light)',
                borderLeft: '4px solid var(--color-accent)'
              }}
            >
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>3. PAYMENT TERMS</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Section 3.2: Client agrees to pay Contractor the total contract price of $2,450,000 (Two 
                Million Four Hundred Fifty Thousand Dollars) according to the following schedule: 30% upon 
                contract execution, 40% upon completion of structural work, and 30% upon final completion 
                and inspection.
              </p>
            </div>

            {/* 选中的条款 */}
            <div 
              className="p-4 rounded-lg mb-4"
              style={{ 
                backgroundColor: 'var(--color-accent-light)',
                border: '2px solid var(--color-accent)'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--color-accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
                  Selected • Click for details →
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                Client agrees to pay Contractor the total contract price of $2,450,000 (Two Million Four 
                Hundred Fifty Thousand Dollars) according to the following schedule: 30% upon contract 
                execution...
              </p>
            </div>

            <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>4. INSURANCE REQUIREMENTS</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Section 4.1: Contractor shall maintain comprehensive general liability insurance with minimum 
              coverage of $5,000,000, workers' compensation insurance as required by law, and professional 
              liability insurance of $2,000,000 throughout the duration of this project.
            </p>

            <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>2. PROJECT TIMELINE</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              The work shall commence on February 1, 2024, and shall be substantially completed within 
              eighteen (18) months from the commencement date. Time is of the essence in this Agreement.
            </p>

            {/* 高亮条款 */}
            <div 
              className="p-4 rounded-lg mb-4"
              style={{ 
                backgroundColor: 'var(--color-accent-light)',
                borderLeft: '4px solid var(--color-accent)'
              }}
            >
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>3. PAYMENT TERMS</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Section 3.2: Client agrees to pay Contractor the total contract price of $2,450,000 (Two 
                Million Four Hundred Fifty Thousand Dollars) according to the following schedule: 30% upon 
                contract execution, 40% upon completion of structural work, and 30% upon final completion 
                and inspection.
              </p>
            </div>

            {/* 选中的条款 */}
            <div 
              className="p-4 rounded-lg mb-4"
              style={{ 
                backgroundColor: 'var(--color-accent-light)',
                border: '2px solid var(--color-accent)'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--color-accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
                  Selected • Click for details →
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                Client agrees to pay Contractor the total contract price of $2,450,000 (Two Million Four 
                Hundred Fifty Thousand Dollars) according to the following schedule: 30% upon contract 
                execution...
              </p>
            </div>

            {/* 更多内容... */}
            <div 
              className="p-4 rounded-lg mb-4"
              style={{ borderLeft: '4px solid var(--color-text-muted)' }}
            >
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>5. LIABILITY AND INDEMNIFICATION</h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Section 5.1: Contractor's total liability under this Agreement shall not exceed the total 
                contract price. Client waives all claims for consequential, indirect, or punitive damages arising 
                from or related to this Agreement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 中间 - 注释区域 */}
      <div 
        className="w-80 flex flex-col rounded-xl overflow-hidden flex-shrink-0 h-full"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        <div className="p-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Annotations</h3>
          <div className="flex gap-3">
            <button 
              className={`px-6 py-2 text-sm font-medium rounded-full transition-colors`}
              style={{ 
                backgroundColor: annotationTab === 'all' ? 'var(--color-accent-light)' : 'transparent',
                color: annotationTab === 'all' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                border: `1px solid ${annotationTab === 'all' ? 'var(--color-accent)' : 'var(--color-border)'}`
              }}
              onClick={() => setAnnotationTab('all')}
            >
              All (12)
            </button>
            <button 
              className={`px-6 py-2 text-sm font-medium rounded-full transition-colors`}
              style={{ 
                backgroundColor: annotationTab === 'mine' ? 'var(--color-accent-light)' : 'transparent',
                color: annotationTab === 'mine' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                border: `1px solid ${annotationTab === 'mine' ? 'var(--color-accent)' : 'var(--color-border)'}`
              }}
              onClick={() => setAnnotationTab('mine')}
            >
              Mine (5)
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {MOCK_ANNOTATIONS.map((annotation) => (
            <div 
              key={annotation.id} 
              className="p-4 rounded-xl space-y-3"
              style={{ 
                backgroundColor: 'var(--color-accent-light)',
                border: '1px solid var(--color-accent)'
              }}
            >
              {/* 用户信息 */}
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-info)' }}
                >
                  <span className="text-white text-lg font-medium">
                    {annotation.user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
                    {annotation.user.name}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {annotation.time}
                  </p>
                </div>
              </div>
              
              {/* 高亮标签 */}
              <span 
                className="inline-block px-3 py-1 text-sm font-medium rounded-md"
                style={{ 
                  backgroundColor: 'var(--color-warning-light)', 
                  color: 'var(--color-accent)' 
                }}
              >
                {annotation.type}
              </span>
              
              {/* 内容 */}
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {annotation.content}
              </p>
              
              {/* 页码链接 */}
              <button 
                className="text-base font-medium flex items-center gap-1"
                style={{ color: 'var(--color-accent)' }}
              >
                → Page {annotation.page}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 右侧 - AI 分析 */}
      <div 
        className="w-1/4 flex flex-col gap-4 p-4 rounded-xl overflow-y-auto flex-shrink-0 h-full"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}
      >
        <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>AI Analysis</h3>
        
        {/* Selected Clause Analysis */}
        <div 
          className="rounded-2xl p-5"
          style={{ 
            backgroundColor: 'var(--color-accent-light)',
            border: '1px solid var(--color-accent)'
          }}
        >
          {/* 标题 */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: 'var(--color-accent)' }} />
            <span className="text-lg font-bold" style={{ color: 'var(--color-accent)' }}>
              Selected Clause Analysis
            </span>
          </div>
          
          {/* 条款标题 */}
          <h4 className="text-lg font-bold mb-3" style={{ color: 'var(--color-accent)' }}>
            Section 3.2 - Payment Terms
          </h4>
          <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            "Client agrees to pay Contractor the total contract price of $2,450,000... according to the 
            following schedule: 30% upon contract execution, 40% upon completion of structural 
            work..."
          </p>

          {/* 风险评估 */}
          <h5 className="text-lg font-bold mb-3" style={{ color: 'var(--color-text)' }}>Risk Assessment</h5>
          <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            The 30% upfront payment requirement is significantly higher than the construction 
            industry standard of 10-15%. This creates substantial financial risk for the client and may 
            indicate cash flow issues with the contractor.
          </p>

          {/* AI 推荐 - 独立卡片 */}
          <div 
            className="rounded-xl p-5"
            style={{ backgroundColor: 'var(--color-success-light)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💡</span>
              <span className="text-lg font-bold" style={{ color: 'var(--color-success)' }}>AI Recommendations</span>
            </div>
            <ul className="space-y-4 text-base" style={{ color: 'var(--color-text)' }}>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--color-success)' }} />
                Negotiate down payment to 10-15% to align with industry standards
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--color-success)' }} />
                Request performance bond to secure payment milestones
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--color-success)' }} />
                Add payment protection clause tied to verified work completion
              </li>
            </ul>
          </div>
        </div>

        {/* Contract Overview */}
        <div 
          className="rounded-xl p-4"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)'
          }}
        >
          <h4 className="font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Contract Overview</h4>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>24 Pages</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Document Length</p>
            </div>
            <div>
              <p className="text-xl font-bold" style={{ color: 'var(--color-accent)' }}>12 Issues</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Identified Risks</p>
            </div>
            <div>
              <p className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>$2.45M</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Contract Value</p>
            </div>
          </div>
        </div>

        {/* Key Findings */}
        <div 
          className="rounded-xl p-4"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)'
          }}
        >
          <h4 className="font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Key Findings</h4>
          <div className="space-y-4">
            {MOCK_KEY_FINDINGS.map((finding) => (
              <div key={finding.id} className="space-y-3">
                {/* 第一行：图标 + 标签 + 标题 */}
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: finding.type === 'HIGH RISK' ? 'var(--color-accent)' : 'var(--color-warning)' }}
                  />
                  <div>
                    {renderRiskBadge(finding.type)}
                    <p className="font-semibold mt-1" style={{ color: 'var(--color-text)' }}>{finding.title}</p>
                  </div>
                </div>
                
                {/* 第二行：用户信息 + 状态 */}
                {finding.assignee && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                      >
                        <span className="text-white text-xs font-medium">
                          {finding.assignee.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {finding.assignee} ▾
                      </span>
                    </div>
                    {renderStatusBadge(finding.status)}
                  </div>
                )}
                
                {/* 第三行：描述 */}
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {finding.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div 
          className="rounded-xl p-4"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)'
          }}
        >
          <h4 className="font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Comments</h4>
          <div className="space-y-4">
            {MOCK_COMMENTS.map((comment) => (
              <div key={comment.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-info)' }}
                  >
                    <span className="text-white text-xs font-medium">
                      {comment.user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      {comment.user.name}
                    </span>
                    <span className="text-xs ml-2" style={{ color: 'var(--color-text-muted)' }}>
                      {comment.time}
                    </span>
                  </div>
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {comment.content}
                </p>
                <button className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Reply</button>
              </div>
            ))}
          </div>
          <div 
            className="mt-4 p-3 rounded-lg"
            style={{ 
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)'
            }}
          >
            <input 
              type="text"
              placeholder="Add a comment... Use @ to mention"
              className="w-full bg-transparent text-sm outline-none"
              style={{ color: 'var(--color-text)' }}
            />
          </div>
        </div>

        {/* Tasks */}
        <div 
          className="rounded-xl p-4"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)'
          }}
        >
          <h4 className="font-semibold mb-3" style={{ color: 'var(--color-text)' }}>Tasks (5)</h4>
          <div className="flex gap-2 mb-4">
            {['All', 'Assigned to me', 'Resolved'].map((tab) => (
              <button 
                key={tab}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors`}
                style={{ 
                  backgroundColor: taskTab === tab.toLowerCase() ? 'var(--color-primary-light)' : 'transparent',
                  color: taskTab === tab.toLowerCase() ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  border: `1px solid ${taskTab === tab.toLowerCase() ? 'var(--color-primary)' : 'var(--color-border)'}`
                }}
                onClick={() => setTaskTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="space-y-4">
            {MOCK_TASKS.map((task) => (
              <div 
                key={task.id} 
                className="p-3 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-border)'
                }}
              >
                {renderRiskBadge(task.type)}
                <p className="font-medium mt-2" style={{ color: 'var(--color-text)' }}>{task.title}</p>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                  {task.description}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <span className="text-white text-xs">J</span>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {task.assignee}
                    </span>
                  </div>
                  {renderStatusBadge(task.status)}
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    Due: {task.dueDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex gap-3 mt-2">
          <button 
            className="flex-1 px-6 py-3 font-medium rounded-xl transition-all"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)'
            }}
          >
            Share
          </button>
          <button 
            onClick={() => setShowExportModal(true)}
            className="flex-1 px-6 py-3 font-medium rounded-xl transition-all hover:shadow-md"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-button-primary-text)'
            }}
          >
            Export Report
          </button>
        </div>
      </div>

      {/* 导出弹窗 */}
      {showExportModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowExportModal(false)}
        >
          <div 
            className="w-full max-w-xl rounded-2xl p-8"
            style={{ backgroundColor: 'var(--color-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 弹窗头部 */}
            <div className="flex items-center justify-between mb-8">
              <h2 
                className="text-2xl font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                Export Analysis Report
              </h2>
              <button 
                onClick={() => setShowExportModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Export Format */}
            <div className="mb-8">
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                Export Format
              </h3>
              <div className="flex gap-6">
                {[
                  { id: 'pdf', label: 'PDF Report' },
                  { id: 'word', label: 'Word Document' },
                  { id: 'excel', label: 'Excel Spreadsheet' },
                ].map((format) => (
                  <label 
                    key={format.id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div 
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{ 
                        borderColor: exportFormat === format.id ? 'var(--color-accent)' : 'var(--color-border)'
                      }}
                    >
                      {exportFormat === format.id && (
                        <div 
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: 'var(--color-accent)' }}
                        />
                      )}
                    </div>
                    <span 
                      className="text-base"
                      style={{ 
                        color: exportFormat === format.id ? 'var(--color-text)' : 'var(--color-text-secondary)'
                      }}
                    >
                      {format.label}
                    </span>
                    <input 
                      type="radio"
                      name="exportFormat"
                      value={format.id}
                      checked={exportFormat === format.id}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="hidden"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Content Selection */}
            <div className="mb-8">
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                Content Selection
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'originalContract', label: 'Original Contract Document' },
                  { id: 'aiAnalysis', label: 'AI Analysis Summary' },
                  { id: 'riskFindings', label: 'Risk Findings with Annotations' },
                  { id: 'recommendations', label: 'Recommendations' },
                ].map((item) => (
                  <label 
                    key={item.id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div 
                      className="w-5 h-5 rounded flex items-center justify-center"
                      style={{ 
                        backgroundColor: exportContent[item.id] ? 'var(--color-accent)' : 'transparent',
                        border: exportContent[item.id] ? 'none' : '2px solid var(--color-border)'
                      }}
                    >
                      {exportContent[item.id] && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span 
                      className="text-base"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {item.label}
                    </span>
                    <input 
                      type="checkbox"
                      checked={exportContent[item.id]}
                      onChange={(e) => setExportContent(prev => ({
                        ...prev,
                        [item.id]: e.target.checked
                      }))}
                      className="hidden"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* 底部按钮 */}
            <div 
              className="flex gap-4 pt-6"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <button 
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-6 py-4 font-medium rounded-xl transition-all hover:bg-gray-50"
                style={{ 
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  console.log('Export:', { format: exportFormat, content: exportContent });
                  setShowExportModal(false);
                }}
                className="flex-1 px-6 py-4 font-medium rounded-xl transition-all hover:shadow-md"
                style={{ 
                  backgroundColor: 'var(--color-text)',
                  color: 'var(--color-surface)'
                }}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractsDel;

