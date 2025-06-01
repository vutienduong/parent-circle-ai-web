'use client'

import { useState, useEffect } from 'react'
import { Users, MapPin, Tag, Plus, Search, Heart } from 'lucide-react'
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

  const categories = [
    { value: 'general', label: 'Tổng quát' },
    { value: 'sleep_training', label: 'Rèn luyện giấc ngủ' },
    { value: 'nutrition', label: 'Dinh dưỡng' },
    { value: 'activities', label: 'Hoạt động' },
    { value: 'education', label: 'Giáo dục' },
    { value: 'health', label: 'Sức khỏe' }
  ]

  const locations = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Toàn quốc']

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
      
      // Fallback to mock data if API fails
      const mockCommunities: Community[] = [
        {
          id: 1,
          name: 'Sleep Training Hà Nội',
          description: 'Nhóm chia sẻ kinh nghiệm về việc rèn luyện giấc ngủ cho trẻ em tại Hà Nội',
          location: 'Hà Nội',
          category: 'sleep_training',
          members_count: 245,
          created_at: '2024-01-15'
        },
        {
          id: 2,
          name: 'Dinh dưỡng cho trẻ',
          description: 'Thảo luận về chế độ dinh dưỡng phù hợp cho trẻ em các độ tuổi',
          location: 'Toàn quốc',
          category: 'nutrition',
          members_count: 1200,
          created_at: '2024-01-10'
        },
        {
          id: 3,
          name: 'Hoạt động giáo dục Hà Nội',
          description: 'Chia sẻ các hoạt động giáo dục vui chơi cho trẻ em tại Hà Nội',
          location: 'Hà Nội',
          category: 'education',
          members_count: 567,
          created_at: '2024-01-20'
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
      // You might want to refetch the data or update the state
      alert('Đã tham gia nhóm thành công!')
    } catch (error) {
      console.error('Error joining community:', error)
      alert('Có lỗi xảy ra khi tham gia nhóm')
    }
  }

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.value === category)?.label || category
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
              <Link href="/communities" className="text-green-600 font-medium">Cộng đồng</Link>
              <Link href="/chat" className="text-gray-700 hover:text-green-600">AI Chat</Link>
              <Link href="/scheduler" className="text-gray-700 hover:text-green-600">Lịch gia đình</Link>
              <Link href="/marketplace" className="text-gray-700 hover:text-green-600">Chợ đồ cũ</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cộng đồng phụ huynh</h1>
          <p className="text-gray-600">Tham gia các nhóm thảo luận để chia sẻ kinh nghiệm nuôi dạy con</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm nhóm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Tất cả địa điểm</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chủ đề</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Tất cả chủ đề</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center">
                <Plus className="h-4 w-4 mr-2" />
                Tạo nhóm mới
              </button>
            </div>
          </div>
        </div>

        {/* Communities Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => (
              <div key={community.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {community.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Tag className="h-3 w-3 mr-1" />
                      {getCategoryLabel(community.category)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {community.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {community.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {community.members_count} thành viên
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link 
                      href={`/communities/${community.id}`}
                      className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Xem chi tiết
                    </Link>
                    <button 
                      onClick={() => handleJoinCommunity(community.id)}
                      className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      Tham gia
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCommunities.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy nhóm nào</h3>
            <p className="text-gray-600 mb-4">Thử thay đổi bộ lọc hoặc tạo nhóm mới</p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Tạo nhóm mới
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 