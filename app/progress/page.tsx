'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Calendar, 
  ShoppingBag, 
  BarChart3,
  Shield,
  Smartphone,
  Bell,
  Wifi,
  Award,
  Filter,
  Eye,
  ChevronRight
} from 'lucide-react'
import { useAuth } from '../lib/auth-context'

interface FeatureProgress {
  id: string
  name: string
  description: string
  category: string
  status: 'completed' | 'in-progress' | 'pending' | 'testing'
  progress: number
  priority: 'high' | 'medium' | 'low'
  components: {
    frontend: number
    backend: number
    integration: number
  }
  lastUpdated: string
  issues?: string[]
  nextSteps?: string[]
  icon?: any
}

export default function ProgressPage() {
  const { isAuthenticated, user } = useAuth()
  const [features, setFeatures] = useState<FeatureProgress[]>([
    {
      id: 'auth-system',
      name: 'Hệ thống xác thực',
      description: 'Đăng ký, đăng nhập với Devise + JWT, Auth Context',
      category: 'Core',
      status: 'completed',
      progress: 95,
      priority: 'high',
      components: { frontend: 95, backend: 100, integration: 90 },
      lastUpdated: '2025-01-01',
      issues: ['Token refresh cần cải thiện'],
      nextSteps: ['Implement token refresh', 'Add social login'],
      icon: Shield
    },
    {
      id: 'community-forums',
      name: 'Cộng đồng thảo luận',
      description: 'Communities với posts, detail pages và join functionality',
      category: 'Social',
      status: 'completed',
      progress: 90,
      priority: 'high',
      components: { frontend: 95, backend: 90, integration: 85 },
      lastUpdated: '2025-01-01',
      issues: ['Real-time updates missing'],
      nextSteps: ['Add real-time posts', 'Implement reactions', 'Add moderation tools'],
      icon: Users
    },
    {
      id: 'ai-chat',
      name: 'AI Chat Assistant',
      description: 'ParentChat AI với OpenAI GPT integration',
      category: 'AI',
      status: 'completed',
      progress: 85,
      priority: 'high',
      components: { frontend: 90, backend: 85, integration: 80 },
      lastUpdated: '2025-01-01',
      issues: ['Context memory limited', 'Response time optimization'],
      nextSteps: ['Add conversation history', 'Implement conversation memory', 'Vietnamese language tuning'],
      icon: MessageCircle
    },
    {
      id: 'family-scheduler',
      name: 'Lịch gia đình thông minh',
      description: 'Calendar với AI suggestions và task management',
      category: 'Productivity',
      status: 'completed',
      progress: 80,
      priority: 'high',
      components: { frontend: 85, backend: 80, integration: 75 },
      lastUpdated: '2025-01-01',
      issues: ['AI suggestions chưa implement', 'Calendar sync missing'],
      nextSteps: ['Add AI scheduling suggestions', 'Google Calendar integration', 'Smart reminders'],
      icon: Calendar
    },
    {
      id: 'marketplace',
      name: 'Chợ đồ cũ',
      description: 'Marketplace với detail pages, seller info và safety features',
      category: 'Commerce',
      status: 'completed',
      progress: 85,
      priority: 'medium',
      components: { frontend: 90, backend: 85, integration: 80 },
      lastUpdated: '2025-01-01',
      issues: ['Image upload missing', 'Payment integration needed'],
      nextSteps: ['Add image upload', 'Integrate payment gateway', 'Enhanced search filters'],
      icon: ShoppingBag
    },
    {
      id: 'dashboard-analytics',
      name: 'Dashboard & Analytics',
      description: 'Engagement tracking với stats và activity monitoring',
      category: 'Analytics',
      status: 'completed',
      progress: 75,
      priority: 'medium',
      components: { frontend: 80, backend: 75, integration: 70 },
      lastUpdated: '2025-01-01',
      issues: ['Real-time updates needed', 'More detailed analytics'],
      nextSteps: ['Add real-time dashboard', 'Implement charts', 'Advanced analytics'],
      icon: BarChart3
    },
    {
      id: 'mobile-optimization',
      name: 'Mobile Optimization',
      description: 'Responsive design và mobile-first UX với Navigation',
      category: 'UX',
      status: 'completed',
      progress: 90,
      priority: 'high',
      components: { frontend: 95, backend: 90, integration: 85 },
      lastUpdated: '2025-01-01',
      issues: ['Some touch gestures missing'],
      nextSteps: ['Add swipe gestures', 'Improve mobile performance'],
      icon: Smartphone
    },
    {
      id: 'notifications',
      name: 'Notification System',
      description: 'Backend notification system với API endpoints',
      category: 'Engagement',
      status: 'completed',
      progress: 70,
      priority: 'medium',
      components: { frontend: 60, backend: 85, integration: 65 },
      lastUpdated: '2025-01-01',
      issues: ['Frontend UI missing', 'Push notifications not implemented'],
      nextSteps: ['Build notification UI', 'Add push notifications', 'Smart notification filtering'],
      icon: Bell
    },
    {
      id: 'security-features',
      name: 'Bảo mật nâng cao',
      description: 'JWT security, CORS, authentication middleware',
      category: 'Security',
      status: 'completed',
      progress: 80,
      priority: 'high',
      components: { frontend: 75, backend: 90, integration: 75 },
      lastUpdated: '2025-01-01',
      issues: ['Rate limiting chưa implement', 'Content filtering basic'],
      nextSteps: ['Implement rate limiting', 'Advanced content filtering', 'Security audit'],
      icon: Shield
    },
    {
      id: 'offline-mode',
      name: 'Chế độ offline',
      description: 'PWA với offline caching và sync',
      category: 'Performance',
      status: 'pending',
      progress: 20,
      priority: 'medium',
      components: { frontend: 30, backend: 20, integration: 10 },
      lastUpdated: '2025-01-01',
      issues: ['Service worker chưa setup', 'Cache strategy undefined'],
      nextSteps: ['Setup PWA', 'Implement service worker', 'Add offline indicators'],
      icon: Wifi
    },
    {
      id: 'gamification',
      name: 'Gamification',
      description: 'Badges, points, achievements cho user engagement',
      category: 'Engagement',
      status: 'pending',
      progress: 15,
      priority: 'low',
      components: { frontend: 20, backend: 15, integration: 10 },
      lastUpdated: '2025-01-01',
      issues: ['Design system needed', 'Point calculation undefined'],
      nextSteps: ['Design badge system', 'Implement point calculation', 'Add achievement tracking'],
      icon: Award
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { value: 'all', label: 'Tất cả', icon: Eye },
    { value: 'Core', label: 'Cốt lõi', icon: Shield },
    { value: 'Social', label: 'Xã hội', icon: Users },
    { value: 'AI', label: 'Trí tuệ nhân tạo', icon: MessageCircle },
    { value: 'Productivity', label: 'Năng suất', icon: Calendar },
    { value: 'Commerce', label: 'Thương mại', icon: ShoppingBag },
    { value: 'Analytics', label: 'Phân tích', icon: BarChart3 },
    { value: 'Performance', label: 'Hiệu suất', icon: TrendingUp },
    { value: 'Engagement', label: 'Tương tác', icon: Bell },
    { value: 'UX', label: 'Trải nghiệm', icon: Smartphone },
    { value: 'Security', label: 'Bảo mật', icon: Shield }
  ]

  const statuses = [
    { value: 'all', label: 'Tất cả', color: 'gray' },
    { value: 'completed', label: 'Hoàn thành', color: 'green' },
    { value: 'in-progress', label: 'Đang thực hiện', color: 'blue' },
    { value: 'pending', label: 'Chờ xử lý', color: 'yellow' },
    { value: 'testing', label: 'Đang test', color: 'purple' }
  ]

  const filteredFeatures = features.filter(feature => {
    const categoryMatch = selectedCategory === 'all' || feature.category === selectedCategory
    const statusMatch = selectedStatus === 'all' || feature.status === selectedStatus
    return categoryMatch && statusMatch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'testing': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'in-progress': return <Clock className="w-4 h-4" />
      case 'pending': return <AlertCircle className="w-4 h-4" />
      case 'testing': return <TrendingUp className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const overallProgress = Math.round(features.reduce((sum, feature) => sum + feature.progress, 0) / features.length)
  const completedFeatures = features.filter(f => f.status === 'completed').length
  const inProgressFeatures = features.filter(f => f.status === 'in-progress').length
  const pendingFeatures = features.filter(f => f.status === 'pending').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tiến độ phát triển</h1>
              <p className="text-gray-600 mt-2">Theo dõi tiến độ phát triển ParentCircle</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
                <div className="text-sm text-gray-500">Tổng tiến độ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedFeatures}</div>
                <div className="text-sm text-gray-500">Hoàn thành</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{completedFeatures}</div>
                <div className="text-sm text-gray-500">Hoàn thành</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{inProgressFeatures}</div>
                <div className="text-sm text-gray-500">Đang thực hiện</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{pendingFeatures}</div>
                <div className="text-sm text-gray-500">Chờ xử lý</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{overallProgress}%</div>
                <div className="text-sm text-gray-500">Tổng tiến độ</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Bộ lọc</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <Filter className="w-4 h-4" />
                <span>{showFilters ? 'Ẩn' : 'Hiện'} bộ lọc</span>
              </button>
            </div>
          </div>
          
          {showFilters && (
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {categories.map(category => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedCategory === category.value
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{category.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                <div className="flex flex-wrap gap-2">
                  {statuses.map(status => (
                    <button
                      key={status.value}
                      onClick={() => setSelectedStatus(status.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedStatus === status.value
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features List */}
        <div className="space-y-6">
          {filteredFeatures.map(feature => {
            const Icon = feature.icon || CheckCircle
            return (
              <div key={feature.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(feature.status)}`}>
                            {getStatusIcon(feature.status)}
                            <span>{feature.status}</span>
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(feature.priority)}`}>
                            {feature.priority}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Tiến độ tổng thể</span>
                            <span>{feature.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${feature.progress}%` }}
                            />
                          </div>
                        </div>
                        
                        {/* Component Progress */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Frontend</div>
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div
                                className="bg-green-500 h-1 rounded-full"
                                style={{ width: `${feature.components.frontend}%` }}
                              />
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{feature.components.frontend}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Backend</div>
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div
                                className="bg-blue-500 h-1 rounded-full"
                                style={{ width: `${feature.components.backend}%` }}
                              />
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{feature.components.backend}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Integration</div>
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div
                                className="bg-purple-500 h-1 rounded-full"
                                style={{ width: `${feature.components.integration}%` }}
                              />
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{feature.components.integration}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Issues and Next Steps */}
                  {(feature.issues?.length || feature.nextSteps?.length) && (
                    <div className="mt-6 pt-6 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {feature.issues && feature.issues.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">⚠️ Vấn đề hiện tại</h4>
                            <ul className="space-y-1">
                              {feature.issues.map((issue, idx) => (
                                <li key={idx} className="text-sm text-red-600 flex items-start">
                                  <span className="w-1 h-1 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {feature.nextSteps && feature.nextSteps.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">🎯 Bước tiếp theo</h4>
                            <ul className="space-y-1">
                              {feature.nextSteps.map((step, idx) => (
                                <li key={idx} className="text-sm text-blue-600 flex items-start">
                                  <ChevronRight className="w-3 h-3 mt-0.5 mr-1 flex-shrink-0" />
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Xem Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 