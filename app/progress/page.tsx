'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
}

export default function ProgressPage() {
  const [features, setFeatures] = useState<FeatureProgress[]>([
    {
      id: 'auth-system',
      name: 'Hệ thống xác thực',
      description: 'Đăng ký, đăng nhập với Devise + JWT',
      category: 'Core',
      status: 'completed',
      progress: 95,
      priority: 'high',
      components: { frontend: 90, backend: 100, integration: 95 },
      lastUpdated: '2025-06-30',
      issues: ['Frontend auth UI cần polish'],
      nextSteps: ['Cải thiện UX flow']
    },
    {
      id: 'community-forums',
      name: 'Cộng đồng thảo luận',
      description: 'Forums với AI moderation và tính năng tương tác',
      category: 'Social',
      status: 'completed',
      progress: 90,
      priority: 'high',
      components: { frontend: 95, backend: 90, integration: 85 },
      lastUpdated: '2025-06-30',
      issues: ['AI moderation chưa implement'],
      nextSteps: ['Thêm AI content filtering', 'Real-time notifications']
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
      lastUpdated: '2025-06-30',
      issues: ['Response time có thể cải thiện', 'Context memory limited'],
      nextSteps: ['Optimize API calls', 'Add conversation history', 'Vietnamese language tuning']
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
      lastUpdated: '2025-06-30',
      issues: ['AI suggestions chưa implement', 'Calendar sync missing'],
      nextSteps: ['Add AI scheduling suggestions', 'Google Calendar integration', 'Smart reminders']
    },
    {
      id: 'marketplace',
      name: 'Chợ đồ cũ',
      description: 'Marketplace cho đồ trẻ em với location-based search',
      category: 'Commerce',
      status: 'completed',
      progress: 70,
      priority: 'medium',
      components: { frontend: 75, backend: 70, integration: 65 },
      lastUpdated: '2025-06-30',
      issues: ['Image upload missing', 'Payment integration needed', 'Location search incomplete'],
      nextSteps: ['Add image upload', 'Integrate payment gateway', 'Implement geolocation search']
    },
    {
      id: 'dashboard-analytics',
      name: 'Dashboard & Analytics',
      description: 'Engagement tracking với gamification',
      category: 'Analytics',
      status: 'completed',
      progress: 75,
      priority: 'medium',
      components: { frontend: 80, backend: 75, integration: 70 },
      lastUpdated: '2025-06-30',
      issues: ['Gamification features missing', 'Real-time updates needed'],
      nextSteps: ['Add badges system', 'Real-time dashboard updates', 'Advanced analytics']
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
      lastUpdated: '2025-06-30',
      issues: ['Service worker chưa setup', 'Cache strategy undefined'],
      nextSteps: ['Setup PWA', 'Implement service worker', 'Add offline indicators']
    },
    {
      id: 'push-notifications',
      name: 'Push Notifications',
      description: 'Smart notifications với AI prioritization',
      category: 'Engagement',
      status: 'pending',
      progress: 15,
      priority: 'medium',
      components: { frontend: 20, backend: 15, integration: 10 },
      lastUpdated: '2025-06-30',
      issues: ['Firebase setup needed', 'Notification strategy undefined'],
      nextSteps: ['Setup Firebase', 'Design notification system', 'AI priority algorithm']
    },
    {
      id: 'mobile-optimization',
      name: 'Mobile Optimization',
      description: 'Responsive design và mobile-first UX',
      category: 'UX',
      status: 'in-progress',
      progress: 60,
      priority: 'high',
      components: { frontend: 70, backend: 60, integration: 50 },
      lastUpdated: '2025-06-30',
      issues: ['Touch gestures missing', 'Mobile navigation needs work'],
      nextSteps: ['Improve mobile navigation', 'Add touch gestures', 'Mobile performance optimization']
    },
    {
      id: 'security-features',
      name: 'Bảo mật nâng cao',
      description: 'Rate limiting, CSRF protection, content filtering',
      category: 'Security',
      status: 'in-progress',
      progress: 50,
      priority: 'high',
      components: { frontend: 40, backend: 60, integration: 50 },
      lastUpdated: '2025-06-30',
      issues: ['Rate limiting chưa implement', 'Content filtering basic'],
      nextSteps: ['Implement rate limiting', 'Advanced content filtering', 'Security audit']
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const categories = ['all', 'Core', 'Social', 'AI', 'Productivity', 'Commerce', 'Analytics', 'Performance', 'Engagement', 'UX', 'Security']
  const statuses = ['all', 'completed', 'in-progress', 'pending', 'testing']

  const filteredFeatures = features.filter(feature => {
    const categoryMatch = selectedCategory === 'all' || feature.category === selectedCategory
    const statusMatch = selectedStatus === 'all' || feature.status === selectedStatus
    return categoryMatch && statusMatch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'testing': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅'
      case 'in-progress': return '🔄'
      case 'pending': return '⏳'
      case 'testing': return '🧪'
      default: return '❓'
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-4">
            <span className="text-3xl">📊</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tiến độ phát triển
            <span className="block text-2xl md:text-3xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mt-2">
              ParentCircle Progress
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Theo dõi tiến độ phát triển các tính năng của ParentCircle - Cộng đồng phụ huynh thông minh
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{overallProgress}%</div>
              <div className="text-sm text-gray-600">Tiến độ tổng thể</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{completedFeatures}</div>
              <div className="text-sm text-gray-600">Hoàn thành</div>
              <div className="text-xs text-green-600 mt-2">✅ Sẵn sàng sử dụng</div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{inProgressFeatures}</div>
              <div className="text-sm text-gray-600">Đang phát triển</div>
              <div className="text-xs text-blue-600 mt-2">🔄 Đang code</div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600 mb-2">{pendingFeatures}</div>
              <div className="text-sm text-gray-600">Chờ triển khai</div>
              <div className="text-xs text-gray-600 mt-2">⏳ Trong backlog</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Tất cả danh mục' : category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'Tất cả trạng thái' : 
                     status === 'completed' ? 'Hoàn thành' :
                     status === 'in-progress' ? 'Đang phát triển' :
                     status === 'pending' ? 'Chờ triển khai' : 'Đang test'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-6">
          {filteredFeatures.map(feature => (
            <div key={feature.id} className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{feature.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(feature.status)}`}>
                        {getStatusIcon(feature.status)} {
                          feature.status === 'completed' ? 'Hoàn thành' :
                          feature.status === 'in-progress' ? 'Đang phát triển' :
                          feature.status === 'pending' ? 'Chờ triển khai' : 'Đang test'
                        }
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(feature.priority)}`}>
                        {feature.priority === 'high' ? '🔥 Cao' : feature.priority === 'medium' ? '📋 Trung bình' : '📝 Thấp'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    <div className="text-sm text-gray-500">
                      Cập nhật lần cuối: {feature.lastUpdated}
                    </div>
                  </div>
                  
                  <div className="lg:ml-6 mt-4 lg:mt-0">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{feature.progress}%</div>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${feature.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Component Progress */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-blue-700">Frontend</span>
                      <span className="text-sm text-blue-600">{feature.components.frontend}%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${feature.components.frontend}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-green-700">Backend</span>
                      <span className="text-sm text-green-600">{feature.components.backend}%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${feature.components.backend}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-purple-700">Integration</span>
                      <span className="text-sm text-purple-600">{feature.components.integration}%</span>
                    </div>
                    <div className="w-full bg-purple-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${feature.components.integration}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Issues and Next Steps */}
                {(feature.issues || feature.nextSteps) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {feature.issues && feature.issues.length > 0 && (
                      <div className="bg-red-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-red-700 mb-2">⚠️ Vấn đề cần giải quyết</h4>
                        <ul className="text-sm text-red-600 space-y-1">
                          {feature.issues.map((issue, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {feature.nextSteps && feature.nextSteps.length > 0 && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-blue-700 mb-2">🎯 Bước tiếp theo</h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                          {feature.nextSteps.map((step, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🔗 Liên kết nhanh</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/communities" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 text-center transition-colors">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm font-medium text-blue-700">Cộng đồng</div>
            </Link>
            <Link href="/chat" className="bg-green-50 hover:bg-green-100 rounded-lg p-4 text-center transition-colors">
              <div className="text-2xl mb-2">🤖</div>
              <div className="text-sm font-medium text-green-700">AI Chat</div>
            </Link>
            <Link href="/scheduler" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-4 text-center transition-colors">
              <div className="text-2xl mb-2">📅</div>
              <div className="text-sm font-medium text-purple-700">Lịch gia đình</div>
            </Link>
            <Link href="/dashboard" className="bg-orange-50 hover:bg-orange-100 rounded-lg p-4 text-center transition-colors">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium text-orange-700">Dashboard</div>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500">
          <p>🚀 ParentCircle - Được phát triển với ❤️ cho cộng đồng phụ huynh Việt Nam</p>
          <p className="text-sm mt-2">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
        </div>
      </div>
    </div>
  )
} 