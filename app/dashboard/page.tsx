'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  Heart,
  BarChart3,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import { dashboardAPI } from '../../lib/api'
import { DashboardStats } from '../lib/types'
import { useAuth } from '../lib/auth-context'

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Try to fetch from real API
      const response = await dashboardAPI.getDashboard()
      const data = response.data
      
      // Map backend response to frontend expected structure
      setStats({
        total_communities: data.platform_stats.total_communities,
        total_posts: data.platform_stats.total_posts,
        total_users: data.platform_stats.total_users,
        user_engagement: data.user_stats.user_posts + data.user_stats.user_events + data.user_stats.user_tasks,
        recent_activities: data.recent_activities,
        upcoming_events: data.upcoming_events,
        pending_tasks: data.pending_tasks
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      
      // Fallback to mock data if API fails
      setStats({
        total_communities: 25,
        total_posts: 156,
        total_users: 1200,
        user_engagement: 245,
        recent_activities: [
          {
            type: 'post',
            title: 'Đăng bài: Làm thế nào để bé ngủ xuyên đêm?',
            description: 'Sleep Training Hà Nội',
            created_at: '2024-06-01T10:30:00'
          },
          {
            type: 'task',
            title: 'Hoàn thành: Mua tã cho bé',
            description: 'Công việc gia đình',
            created_at: '2024-06-01T09:15:00'
          }
        ],
        upcoming_events: [
          {
            id: 1,
            title: 'Khám định kỳ cho bé',
            start_time: '2024-06-07T09:00:00',
            days_until: 6
          }
        ],
        pending_tasks: [
          {
            id: 1,
            title: 'Chuẩn bị đồ chơi giáo dục',
            priority: 4,
            due_date: '2024-06-05T00:00:00',
            days_until: 4
          }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 5: return 'bg-red-100 text-red-800'
      case 4: return 'bg-orange-100 text-orange-800'
      case 3: return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return <MessageCircle className="h-4 w-4 text-blue-600" />
      case 'task': return <CheckCircle className="h-4 w-4 text-green-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Vừa xong'
    if (diffInHours < 24) return `${diffInHours} giờ trước`
    return `${Math.floor(diffInHours / 24)} ngày trước`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải bảng điều khiển...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Heart className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ParentCircle</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/communities" className="text-gray-700 hover:text-green-600">Cộng đồng</Link>
              <Link href="/chat" className="text-gray-700 hover:text-green-600">AI Chat</Link>
              <Link href="/scheduler" className="text-gray-700 hover:text-green-600">Lịch gia đình</Link>
              <Link href="/marketplace" className="text-gray-700 hover:text-green-600">Chợ đồ cũ</Link>
              <Link href="/dashboard" className="text-green-600 font-medium">Dashboard</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bảng điều khiển</h1>
          <p className="text-gray-600">Tổng quan hoạt động và thống kê của bạn trên ParentCircle</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{stats?.total_communities}</h3>
                <p className="text-sm text-gray-600">Cộng đồng</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{stats?.total_posts}</h3>
                <p className="text-sm text-gray-600">Bài đăng</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{stats?.user_engagement}</h3>
                <p className="text-sm text-gray-600">Điểm tương tác</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{stats?.total_users}</h3>
                <p className="text-sm text-gray-600">Thành viên</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h2>
              </div>
              <div className="p-6">
                {stats?.recent_activities && stats.recent_activities.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recent_activities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTimeAgo(activity.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>Chưa có hoạt động nào gần đây</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Sự kiện sắp tới</h3>
              </div>
              <div className="p-6">
                {stats?.upcoming_events && stats.upcoming_events.length > 0 ? (
                  <div className="space-y-3">
                    {stats.upcoming_events.map((event) => (
                      <div key={event.id} className="flex items-start space-x-3">
                        <Calendar className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                          <p className="text-xs text-gray-500">
                            {event.days_until === 0 ? 'Hôm nay' : `${event.days_until} ngày nữa`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">Không có sự kiện nào sắp tới</p>
                )}
                <Link 
                  href="/scheduler"
                  className="mt-4 block text-center text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Xem tất cả →
                </Link>
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Công việc cần làm</h3>
              </div>
              <div className="p-6">
                {stats?.pending_tasks && stats.pending_tasks.length > 0 ? (
                  <div className="space-y-3">
                    {stats.pending_tasks.map((task) => (
                      <div key={task.id} className="flex items-start space-x-3">
                        <Clock className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              Ưu tiên {task.priority}
                            </span>
                            {task.days_until !== null && (
                              <span className="text-xs text-gray-500">
                                {task.days_until === 0 ? 'Hôm nay' : `${task.days_until} ngày nữa`}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">Không có công việc nào cần làm</p>
                )}
                <Link 
                  href="/scheduler"
                  className="mt-4 block text-center text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Xem tất cả →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 