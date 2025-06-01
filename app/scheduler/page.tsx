'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Plus, CheckCircle, Circle, AlertCircle, Heart, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface FamilyEvent {
  id: number
  title: string
  description: string
  start_time: string
  end_time: string
  type: 'event'
}

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  priority: number
  due_date: string
  type: 'task'
}

type ScheduleItem = FamilyEvent | Task

export default function SchedulerPage() {
  const [events, setEvents] = useState<FamilyEvent[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'calendar' | 'tasks'>('calendar')
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    fetchScheduleData()
  }, [])

  const fetchScheduleData = async () => {
    try {
      setLoading(true)
      // Mock data - replace with actual API calls
      const mockEvents: FamilyEvent[] = [
        {
          id: 1,
          title: 'Khám định kỳ cho bé',
          description: 'Đưa bé đi khám sức khỏe định kỳ',
          start_time: '2025-06-07T09:00:00',
          end_time: '2025-06-07T11:00:00',
          type: 'event'
        },
        {
          id: 2,
          title: 'Sinh nhật bé',
          description: 'Tổ chức sinh nhật 3 tuổi cho con',
          start_time: '2025-06-14T15:00:00',
          end_time: '2025-06-14T19:00:00',
          type: 'event'
        }
      ]

      const mockTasks: Task[] = [
        {
          id: 1,
          title: 'Mua tã cho bé',
          description: 'Mua tã size M cho bé',
          completed: false,
          priority: 4,
          due_date: '2025-06-03T00:00:00',
          type: 'task'
        },
        {
          id: 2,
          title: 'Chuẩn bị đồ chơi giáo dục',
          description: 'Mua sách và đồ chơi phát triển trí tuệ cho bé',
          completed: false,
          priority: 3,
          due_date: '2025-06-08T00:00:00',
          type: 'task'
        },
        {
          id: 3,
          title: 'Đặt lịch tiêm phòng',
          description: 'Đặt lịch tiêm phòng cho bé',
          completed: true,
          priority: 5,
          due_date: '2025-05-30T00:00:00',
          type: 'task'
        }
      ]

      setEvents(mockEvents)
      setTasks(mockTasks)
    } catch (error) {
      console.error('Error fetching schedule data:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 5: return 'text-red-600 bg-red-100'
      case 4: return 'text-orange-600 bg-orange-100'
      case 3: return 'text-yellow-600 bg-yellow-100'
      case 2: return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 5: return 'Rất cao'
      case 4: return 'Cao'
      case 3: return 'Trung bình'
      case 2: return 'Thấp'
      default: return 'Rất thấp'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const upcomingItems = [...events, ...tasks]
    .filter(item => {
      const date = new Date(item.type === 'event' ? item.start_time : item.due_date)
      return date >= new Date()
    })
    .sort((a, b) => {
      const dateA = new Date(a.type === 'event' ? a.start_time : a.due_date)
      const dateB = new Date(b.type === 'event' ? b.start_time : b.due_date)
      return dateA.getTime() - dateB.getTime()
    })
    .slice(0, 5)

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
              <Link href="/scheduler" className="text-green-600 font-medium">Lịch gia đình</Link>
              <Link href="/marketplace" className="text-gray-700 hover:text-green-600">Chợ đồ cũ</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch gia đình</h1>
          <p className="text-gray-600">Quản lý lịch trình và công việc gia đình một cách thông minh</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border mb-6">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`flex-1 px-6 py-4 text-center font-medium ${
                    activeTab === 'calendar'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Calendar className="h-5 w-5 inline-block mr-2" />
                  Lịch sự kiện
                </button>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`flex-1 px-6 py-4 text-center font-medium ${
                    activeTab === 'tasks'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <CheckCircle className="h-5 w-5 inline-block mr-2" />
                  Công việc
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    {activeTab === 'calendar' ? 'Sự kiện sắp tới' : 'Danh sách công việc'}
                  </h2>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm {activeTab === 'calendar' ? 'sự kiện' : 'công việc'}
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Đang tải...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeTab === 'calendar' ? (
                      events.length > 0 ? (
                        events.map((event) => (
                          <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                                <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {formatDate(event.start_time)}
                                  <Clock className="h-4 w-4 ml-4 mr-1" />
                                  {formatTime(event.start_time)} - {formatTime(event.end_time)}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="text-red-600 hover:text-red-800">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">Chưa có sự kiện nào</p>
                        </div>
                      )
                    ) : (
                      tasks.length > 0 ? (
                        tasks.map((task) => (
                          <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                            <div className="flex items-start space-x-3">
                              <button
                                onClick={() => toggleTask(task.id)}
                                className="mt-1"
                              >
                                {task.completed ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                  <Circle className="h-5 w-5 text-gray-400" />
                                )}
                              </button>
                              <div className="flex-1">
                                <h3 className={`font-semibold mb-1 ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                  {task.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                                <div className="flex items-center space-x-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                    {getPriorityLabel(task.priority)}
                                  </span>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {formatDate(task.due_date)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="text-red-600 hover:text-red-800">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">Chưa có công việc nào</p>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tổng quan</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sự kiện tuần này</span>
                  <span className="font-semibold text-green-600">{events.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Công việc chưa hoàn thành</span>
                  <span className="font-semibold text-orange-600">{tasks.filter(t => !t.completed).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Công việc đã hoàn thành</span>
                  <span className="font-semibold text-green-600">{tasks.filter(t => t.completed).length}</span>
                </div>
              </div>
            </div>

            {/* Upcoming Items */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sắp tới</h3>
              <div className="space-y-3">
                {upcomingItems.map((item, index) => (
                  <div key={`${item.type}-${item.id}`} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {item.type === 'event' ? (
                        <Calendar className="h-4 w-4 text-blue-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(item.type === 'event' ? item.start_time : item.due_date)}
                      </p>
                    </div>
                  </div>
                ))}
                {upcomingItems.length === 0 && (
                  <p className="text-sm text-gray-600">Không có mục nào sắp tới</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 