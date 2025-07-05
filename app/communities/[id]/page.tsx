'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Users, MapPin, Calendar, MessageCircle } from 'lucide-react'
import { isAuthenticated, authenticatedFetch, handleAuthError } from '@/lib/auth'

interface Community {
  id: number
  name: string
  description: string
  location: string
  category: string
  members_count: number
  created_at: string
  recent_posts: Post[]
}

interface Post {
  id: number
  title: string
  content: string
  author: string
  created_at: string
}

export default function CommunityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [community, setCommunity] = useState<Community | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        // Check authentication first
        if (!isAuthenticated()) {
          console.log('Not authenticated, redirecting to login')
          handleAuthError(router)
          return
        }

        console.log('Fetching community:', params.id) // Debug log
        
        const response = await authenticatedFetch(
          `http://localhost:3003/api/v1/communities/${params.id}`,
          {},
          router
        )

        if (response.ok) {
          const result = await response.json()
          console.log('Community data:', result) // Debug log
          setCommunity(result.data)
        } else {
          const errorData = await response.json().catch(() => ({}))
          console.log('API Error:', errorData) // Debug log
          setError(errorData.error || 'Community not found')
        }
              } catch (err) {
          console.error('Fetch error:', err) // Debug log
          if (err instanceof Error && err.message !== 'Authentication failed') {
            setError('Failed to fetch community details')
          }
        } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCommunity()
    }
  }, [params.id, router])

  const handleJoinCommunity = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3003/api/v1/communities/${params.id}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        // Refresh community data
        window.location.reload()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to join community')
      }
    } catch (err) {
      alert('Failed to join community')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'general': 'bg-blue-100 text-blue-800',
      'sleep_training': 'bg-purple-100 text-purple-800',
      'nutrition': 'bg-green-100 text-green-800',
      'activities': 'bg-yellow-100 text-yellow-800',
      'education': 'bg-red-100 text-red-800',
      'health': 'bg-pink-100 text-pink-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin cộng đồng...</p>
        </div>
      </div>
    )
  }

  if (error || !community) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy cộng đồng</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/communities')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại danh sách cộng đồng
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push('/communities')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Quay lại
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleJoinCommunity}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tham gia cộng đồng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Community Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{community.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {community.members_count} thành viên
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {community.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(community.created_at)}
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(community.category)}`}>
                  {community.category}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{community.description}</p>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Bài viết gần đây
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {community.recent_posts && community.recent_posts.length > 0 ? (
                  community.recent_posts.map((post) => (
                    <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-3">{post.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Bởi {post.author}</span>
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Chưa có bài viết nào trong cộng đồng này.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cộng đồng</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Thành viên:</span>
                  <span className="font-medium">{community.members_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Danh mục:</span>
                  <span className="font-medium">{community.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Địa điểm:</span>
                  <span className="font-medium">{community.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày tạo:</span>
                  <span className="font-medium">{formatDate(community.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động nhanh</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Tạo bài viết mới
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  Xem tất cả bài viết
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  Xem thành viên
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 