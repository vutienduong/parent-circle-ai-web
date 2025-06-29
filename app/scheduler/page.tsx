'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Plus, CheckCircle, Circle, AlertCircle, Heart, Edit, Trash2, Baby, Users, Bell, Target, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { familyEventsAPI, tasksAPI } from '@/lib/api'

interface FamilyEvent {
  id: number
  title: string
  description: string
  start_time: string
  end_time: string
  type: 'event'
  category?: string
}

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  priority: number
  due_date: string
  type: 'task'
  category?: string
}

type ScheduleItem = FamilyEvent | Task

export default function SchedulerPage() {
  const [events, setEvents] = useState<FamilyEvent[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'calendar' | 'tasks'>('calendar')
  const [showAddModal, setShowAddModal] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    fetchScheduleData()
  }, [])

  const fetchScheduleData = async () => {
    try {
      setLoading(true)
      
      // Try to fetch from real APIs
      const [eventsResponse, tasksResponse] = await Promise.all([
        familyEventsAPI.getAll(),
        tasksAPI.getAll()
      ])
      
      // Transform API data to match interface
      const apiEvents = eventsResponse.data.data.map((event: any) => ({
        ...event,
        type: 'event' as const
      }))
      
      const apiTasks = tasksResponse.data.data.map((task: any) => ({
        ...task,
        type: 'task' as const
      }))
      
      setEvents(apiEvents)
      setTasks(apiTasks)
    } catch (error) {
      console.error('Error fetching schedule data:', error)
      
      // Enhanced fallback to mock data if API fails
      const mockEvents: FamilyEvent[] = [
        {
          id: 1,
          title: 'Khám định kỳ cho bé Minh',
          description: 'Đưa bé đi khám sức khỏe định kỳ 6 tháng tuổi tại bệnh viện Nhi Trung ương',
          start_time: '2025-06-07T09:00:00',
          end_time: '2025-06-07T11:00:00',
          type: 'event',
          category: 'health'
        },
        {
          id: 2,
          title: 'Sinh nhật bé An 3 tuổi',
          description: 'Tổ chức sinh nhật 3 tuổi cho con tại nhà với bạn bè và gia đình',
          start_time: '2025-06-14T15:00:00',
          end_time: '2025-06-14T19:00:00',
          type: 'event',
          category: 'celebration'
        },
        {
          id: 3,
          title: 'Lớp học bơi cho trẻ',
          description: 'Đưa bé đi học bơi tại trung tâm thể thao Mỹ Đình',
          start_time: '2025-06-05T16:00:00',
          end_time: '2025-06-05T17:00:00',
          type: 'event',
          category: 'activity'
        },
        {
          id: 4,
          title: 'Họp phụ huynh trường mầm non',
          description: 'Tham dự họp phụ huynh đầu năm học mới',
          start_time: '2025-06-10T18:30:00',
          end_time: '2025-06-10T20:00:00',
          type: 'event',
          category: 'education'
        }
      ]

      const mockTasks: Task[] = [
        {
          id: 1,
          title: 'Mua tã và sữa cho bé',
          description: 'Mua tã size M và sữa công thức cho bé tại siêu thị',
          completed: false,
          priority: 4,
          due_date: '2025-06-03T00:00:00',
          type: 'task',
          category: 'shopping'
        },
        {
          id: 2,
          title: 'Chuẩn bị đồ chơi giáo dục',
          description: 'Mua sách và đồ chơi phát triển trí tuệ cho bé 2-3 tuổi',
          completed: false,
          priority: 3,
          due_date: '2025-06-08T00:00:00',
          type: 'task',
          category: 'education'
        },
        {
          id: 3,
          title: 'Đặt lịch tiêm phòng',
          description: 'Đặt lịch tiêm phòng viêm gan B cho bé',
          completed: true,
          priority: 5,
          due_date: '2025-05-30T00:00:00',
          type: 'task',
          category: 'health'
        },
        {
          id: 4,
          title: 'Chuẩn bị quà sinh nhật',
          description: 'Mua quà sinh nhật cho bé bạn và chuẩn bị thiệp chúc mừng',
          completed: false,
          priority: 2,
          due_date: '2025-06-12T00:00:00',
          type: 'task',
          category: 'celebration'
        },
        {
          id: 5,
          title: 'Đăng ký lớp học vẽ',
          description: 'Đăng ký lớp học vẽ cho trẻ tại trung tâm nghệ thuật gần nhà',
          completed: false,
          priority: 3,
          due_date: '2025-06-15T00:00:00',
          type: 'task',
          category: 'activity'
        }
      ]

      setEvents(mockEvents)
      setTasks(mockTasks)
    } finally {
      setLoading(false)
    }
  }

  const toggleTask = async (taskId: number) => {
    try {
      // Update locally first for immediate feedback
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ))
      
      // Try to update via API
      await tasksAPI.toggleComplete(taskId)
    } catch (error) {
      console.error('Error toggling task:', error)
      // Revert local change if API fails
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: task.completed } : task
      ))
    }
  }

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 5: return 'text-red-600 bg-red-100 border-red-200'
      case 4: return 'text-orange-600 bg-orange-100 border-orange-200'
      case 3: return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 2: return 'text-blue-600 bg-blue-100 border-blue-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 5: return 'Khẩn cấp'
      case 4: return 'Cao'
      case 3: return 'Trung bình'
      case 2: return 'Thấp'
      default: return 'Rất thấp'
    }
  }

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'health': return '🏥'
      case 'education': return '📚'
      case 'activity': return '🎨'
      case 'celebration': return '🎉'
      case 'shopping': return '🛒'
      default: return '📅'
    }
  }

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'health': return 'Sức khỏe'
      case 'education': return 'Giáo dục'
      case 'activity': return 'Hoạt động'
      case 'celebration': return 'Lễ hội'
      case 'shopping': return 'Mua sắm'
      default: return 'Khác'
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

  const getUpcomingItems = () => {
    return [...events, ...tasks]
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
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter(task => task.completed).length
    const highPriority = tasks.filter(task => task.priority >= 4 && !task.completed).length
    const overdue = tasks.filter(task => {
      const dueDate = new Date(task.due_date)
      return dueDate < new Date() && !task.completed
    }).length

    return { total, completed, highPriority, overdue }
  }

  const getTodayItems = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return [...events, ...tasks].filter(item => {
      const date = new Date(item.type === 'event' ? item.start_time : item.due_date)
      return date >= today && date < tomorrow
    })
  }

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.start_time)
        return eventDate.toDateString() === date.toDateString()
      })

      const dayTasks = tasks.filter(task => {
        const taskDate = new Date(task.due_date)
        return taskDate.toDateString() === date.toDateString() && !task.completed
      })

      days.push({
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === new Date().toDateString(),
        isSelected: date.toDateString() === selectedDate.toDateString(),
        events: dayEvents,
        tasks: dayTasks
      })
    }

    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1))
    setCurrentDate(newDate)
  }

  const taskStats = getTaskStats()
  const todayItems = getTodayItems()
  const upcomingItems = getUpcomingItems()
  const calendarDays = generateCalendarDays()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
            <Calendar className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lịch gia đình
            <span className="block text-2xl md:text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
              Family Scheduler
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Quản lý lịch trình gia đình thông minh với AI hỗ trợ nhắc nhở và đề xuất hoạt động phù hợp cho trẻ.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200">
              <div className="text-2xl font-bold text-purple-600">{todayItems.length}</div>
              <div className="text-sm text-gray-600">Hôm nay</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200">
              <div className="text-2xl font-bold text-pink-600">{taskStats.completed}/{taskStats.total}</div>
              <div className="text-sm text-gray-600">Hoàn thành</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200">
              <div className="text-2xl font-bold text-orange-600">{taskStats.highPriority}</div>
              <div className="text-sm text-gray-600">Ưu tiên cao</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 border border-gray-200">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'calendar'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Calendar className="h-5 w-5 inline mr-2" />
                Lịch tháng
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'tasks'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <CheckCircle className="h-5 w-5 inline mr-2" />
                Công việc
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Đang tải lịch trình gia đình...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'calendar' ? (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {currentDate.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigateMonth('prev')}
                        className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setCurrentDate(new Date())}
                        className="px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                      >
                        Hôm nay
                      </button>
                      <button
                        onClick={() => navigateMonth('next')}
                        className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                      <div key={day} className="p-3 text-center text-sm font-medium text-gray-600">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedDate(day.date)}
                        className={`min-h-[100px] p-2 border border-gray-100 cursor-pointer transition-all duration-200 hover:bg-purple-50 ${
                          !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                        } ${
                          day.isToday ? 'bg-purple-100 border-purple-300' : ''
                        } ${
                          day.isSelected ? 'ring-2 ring-purple-600' : ''
                        }`}
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          day.isToday ? 'text-purple-600' : ''
                        }`}>
                          {day.date.getDate()}
                        </div>
                        
                        {/* Events */}
                        {day.events.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mb-1 truncate"
                          >
                            {getCategoryIcon(event.category)} {event.title}
                          </div>
                        ))}
                        
                        {/* Tasks */}
                        {day.tasks.slice(0, 1).map(task => (
                          <div
                            key={task.id}
                            className={`text-xs px-2 py-1 rounded mb-1 truncate border ${getPriorityColor(task.priority)}`}
                          >
                            ✓ {task.title}
                          </div>
                        ))}
                        
                        {/* More indicator */}
                        {(day.events.length + day.tasks.length) > 3 && (
                          <div className="text-xs text-gray-500">
                            +{(day.events.length + day.tasks.length) - 3} khác
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Danh sách công việc</h2>
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Thêm công việc</span>
                    </button>
                  </div>

                  {/* Task Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                      <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
                      <div className="text-sm text-green-700">Đã hoàn thành</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">{taskStats.total - taskStats.completed}</div>
                      <div className="text-sm text-blue-700">Chưa hoàn thành</div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600">{taskStats.highPriority}</div>
                      <div className="text-sm text-orange-700">Ưu tiên cao</div>
                    </div>
                    <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                      <div className="text-2xl font-bold text-red-600">{taskStats.overdue}</div>
                      <div className="text-sm text-red-700">Quá hạn</div>
                    </div>
                  </div>

                  {/* Tasks List */}
                  <div className="space-y-4">
                    {tasks.map(task => (
                      <div
                        key={task.id}
                        className={`p-4 rounded-xl border transition-all duration-200 ${
                          task.completed 
                            ? 'bg-gray-50 border-gray-200 opacity-75' 
                            : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              task.completed
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-300 hover:border-purple-500'
                            }`}
                          >
                            {task.completed && <CheckCircle className="w-3 h-3" />}
                          </button>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className={`font-semibold ${
                                  task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                                }`}>
                                  {getCategoryIcon(task.category)} {task.title}
                                </h3>
                                <p className={`text-sm mt-1 ${
                                  task.completed ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  {task.description}
                                </p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                                    <Target className="w-3 h-3 mr-1" />
                                    {getPriorityLabel(task.priority)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    <Clock className="w-3 h-3 inline mr-1" />
                                    {formatDate(task.due_date)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {getCategoryLabel(task.category)}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 ml-4">
                                <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Today's Schedule */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-purple-600" />
                  Hôm nay
                </h3>
                {todayItems.length > 0 ? (
                  <div className="space-y-3">
                    {todayItems.map(item => (
                      <div key={`${item.type}-${item.id}`} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm">{getCategoryIcon(item.category)}</span>
                          <span className="text-sm font-medium text-gray-900 line-clamp-1">
                            {item.title}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">
                          {item.type === 'event' 
                            ? `${formatTime(item.start_time)} - ${formatTime(item.end_time)}`
                            : `Hạn: ${formatTime(item.due_date)}`
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Không có lịch trình nào hôm nay</p>
                )}
              </div>

              {/* Upcoming Events */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Sắp tới
                </h3>
                <div className="space-y-3">
                  {upcomingItems.slice(0, 5).map(item => (
                    <div key={`${item.type}-${item.id}`} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm">{getCategoryIcon(item.category)}</span>
                        <span className="text-sm font-medium text-gray-900 line-clamp-1">
                          {item.title}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {formatDate(item.type === 'event' ? item.start_time : item.due_date)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Plus className="h-5 w-5 mr-2 text-green-600" />
                  Thêm nhanh
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Thêm sự kiện</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Thêm công việc</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:border-purple-300 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <Baby className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Lịch cho bé</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 