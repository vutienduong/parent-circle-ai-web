'use client'

import { useState, useEffect } from 'react'
import { Users, MapPin, Tag, Plus, Search, Heart, Star, TrendingUp, Clock, Filter } from 'lucide-react'
import Link from 'next/link'
import { communitiesAPI } from '@/lib/api'

interface Community {
  id: number
  name: string
  description: string
  location: string
  category: string
  members_count: number
  created_at: string
}

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { value: 'general', label: 'Tổng quát', icon: '💬' },
    { value: 'sleep_training', label: 'Rèn luyện giấc ngủ', icon: '😴' },
    { value: 'nutrition', label: 'Dinh dưỡng', icon: '🍎' },
    { value: 'activities', label: 'Hoạt động', icon: '🎨' },
    { value: 'education', label: 'Giáo dục', icon: '📚' },
    { value: 'health', label: 'Sức khỏe', icon: '🏥' }
  ]

  const locations = [
    { value: 'Hà Nội', label: 'Hà Nội', count: 45 },
    { value: 'Hồ Chí Minh', label: 'TP. Hồ Chí Minh', count: 67 },
    { value: 'Đà Nẵng', label: 'Đà Nẵng', count: 23 },
    { value: 'Toàn quốc', label: 'Toàn quốc', count: 89 }
  ]

  useEffect(() => {
    fetchCommunities()
  }, [selectedLocation, selectedCategory])

  const fetchCommunities = async () => {
    try {
      setLoading(true)
      
      // Use real API instead of mock data
      const response = await communitiesAPI.getAll({
        location: selectedLocation || undefined,
        category: selectedCategory || undefined
      })
      
      setCommunities(response.data.data)
    } catch (error) {
      console.error('Error fetching communities:', error)
      
      // Enhanced fallback to mock data if API fails
      const mockCommunities: Community[] = [
        {
          id: 1,
          name: 'Mẹ bỉm sữa Hà Nội',
          description: 'Cộng đồng các mẹ có con nhỏ dưới 2 tuổi tại Hà Nội. Chia sẻ kinh nghiệm chăm sóc, nuôi dạy và những khó khăn trong quá trình làm mẹ.',
          location: 'Hà Nội',
          category: 'general',
          members_count: 1245,
          created_at: '2024-01-15'
        },
        {
          id: 2,
          name: 'Sleep Training Việt Nam',
          description: 'Nhóm chia sẻ kinh nghiệm về việc rèn luyện giấc ngủ cho trẻ em. Phương pháp khoa học, an toàn và phù hợp với văn hóa Việt Nam.',
          location: 'Toàn quốc',
          category: 'sleep_training',
          members_count: 2847,
          created_at: '2024-01-10'
        },
        {
          id: 3,
          name: 'Dinh dưỡng cho bé yêu',
          description: 'Thảo luận về chế độ dinh dưỡng phù hợp cho trẻ em các độ tuổi. Thực đơn, công thức nấu ăn và lời khuyên từ chuyên gia dinh dưỡng.',
          location: 'Toàn quốc',
          category: 'nutrition',
          members_count: 3200,
          created_at: '2024-01-08'
        },
        {
          id: 4,
          name: 'Hoạt động giáo dục sớm',
          description: 'Chia sẻ các hoạt động giáo dục, trò chơi phát triển trí tuệ cho trẻ từ 0-6 tuổi. Phương pháp Montessori, Waldorf và các phương pháp hiện đại.',
          location: 'Hồ Chí Minh',
          category: 'education',
          members_count: 1567,
          created_at: '2024-01-20'
        },
        {
          id: 5,
          name: 'Sức khỏe trẻ em',
          description: 'Nhóm trao đổi về sức khỏe trẻ em, phòng bệnh, chăm sóc khi ốm. Có sự tham gia của các bác sĩ nhi khoa uy tín.',
          location: 'Toàn quốc',
          category: 'health',
          members_count: 2156,
          created_at: '2024-01-12'
        },
        {
          id: 6,
          name: 'Hoạt động vui chơi Đà Nẵng',
          description: 'Tổ chức các hoạt động vui chơi, dã ngoại cho gia đình có con nhỏ tại Đà Nẵng và các tỉnh miền Trung.',
          location: 'Đà Nẵng',
          category: 'activities',
          members_count: 456,
          created_at: '2024-01-25'
        }
      ]

      // Filter by location and category for fallback data
      let filtered = mockCommunities
      if (selectedLocation) {
        filtered = filtered.filter(c => c.location === selectedLocation)
      }
      if (selectedCategory) {
        filtered = filtered.filter(c => c.category === selectedCategory)
      }

      setCommunities(filtered)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinCommunity = async (communityId: number) => {
    try {
      await communitiesAPI.join(communityId)
      // Update the UI to reflect the change
      setCommunities(prev => prev.map(c => 
        c.id === communityId 
          ? { ...c, members_count: c.members_count + 1 }
          : c
      ))
      alert('🎉 Chào mừng bạn đến với cộng đồng! Hãy bắt đầu chia sẻ và kết nối.')
    } catch (error) {
      console.error('Error joining community:', error)
      alert('Có lỗi xảy ra khi tham gia nhóm. Vui lòng thử lại sau.')
    }
  }

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.value === category)?.label || category
  }

  const getCategoryIcon = (category: string) => {
    return categories.find(c => c.value === category)?.icon || '💬'
  }

  const formatMemberCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Hôm qua'
    if (diffDays < 7) return `${diffDays} ngày trước`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} tuần trước`
    return `${Math.ceil(diffDays / 30)} tháng trước`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cộng đồng phụ huynh
            <span className="block text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
              ConnectSphere AI
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tham gia hơn 200+ nhóm thảo luận để chia sẻ kinh nghiệm nuôi dạy con và nhận hỗ trợ từ cộng đồng
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">12,000+</div>
              <div className="text-sm text-gray-600">Thành viên tích cực</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200">
              <div className="text-2xl font-bold text-purple-600">200+</div>
              <div className="text-sm text-gray-600">Nhóm thảo luận</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200">
              <div className="text-2xl font-bold text-green-600">50,000+</div>
              <div className="text-sm text-gray-600">Bài viết hữu ích</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm nhóm theo tên hoặc mô tả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Bộ lọc nâng cao</span>
            </button>
            <div className="text-sm text-gray-500">
              Tìm thấy {filteredCommunities.length} nhóm
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">📍 Địa điểm</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="location"
                      value=""
                      checked={selectedLocation === ''}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="mr-3 text-blue-600"
                    />
                    <span className="text-sm">Tất cả địa điểm</span>
                  </label>
                  {locations.map(location => (
                    <label key={location.value} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="location"
                          value={location.value}
                          checked={selectedLocation === location.value}
                          onChange={(e) => setSelectedLocation(e.target.value)}
                          className="mr-3 text-blue-600"
                        />
                        <span className="text-sm">{location.label}</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {location.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">🏷️ Chủ đề</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={selectedCategory === ''}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-3 text-blue-600"
                    />
                    <span className="text-sm">Tất cả chủ đề</span>
                  </label>
                  {categories.map(category => (
                    <label key={category.value} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-3 text-blue-600"
                      />
                      <span className="text-sm mr-2">{category.icon}</span>
                      <span className="text-sm">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Create Community */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">✨ Tạo nhóm mới</label>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                  <p className="text-sm text-gray-600 mb-3">
                    Không tìm thấy nhóm phù hợp? Hãy tạo nhóm của riêng bạn!
                  </p>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo nhóm mới
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Communities Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Đang tìm kiếm nhóm phù hợp cho bạn...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCommunities.map((community) => (
              <div key={community.id} className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getCategoryIcon(community.category)}</span>
                      <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                        {getCategoryLabel(community.category)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>Hot</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {community.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {community.description}
                  </p>
                  
                  {/* Community Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="font-medium">{community.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-purple-500" />
                        <span className="font-medium">{formatMemberCount(community.members_count)}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-xs">{getTimeAgo(community.created_at)}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link 
                      href={`/communities/${community.id}`}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                    >
                      Xem chi tiết
                    </Link>
                    <button 
                      onClick={() => handleJoinCommunity(community.id)}
                      className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-medium"
                    >
                      Tham gia
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredCommunities.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-12 max-w-md mx-auto">
              <Users className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Không tìm thấy nhóm nào</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Không có nhóm nào phù hợp với tiêu chí tìm kiếm của bạn. Hãy thử thay đổi bộ lọc hoặc tạo nhóm mới.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedLocation('')
                    setSelectedCategory('')
                  }}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Xóa bộ lọc
                </button>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200">
                  Tạo nhóm mới
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 