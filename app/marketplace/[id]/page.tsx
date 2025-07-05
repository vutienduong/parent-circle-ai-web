'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, Calendar, User, Phone, Mail, DollarSign, Package, Info } from 'lucide-react'
import { isAuthenticated, authenticatedFetch, handleAuthError } from '@/lib/auth'

interface MarketplaceItem {
  id: number
  title: string
  description: string
  price: number
  category: string
  condition: string
  available: boolean
  seller: {
    id: number
    name: string
    location: string
    email: string
  }
  created_at: string
  updated_at: string
  images: string[]
}

export default function MarketplaceItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState<MarketplaceItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMarketplaceItem = async () => {
      try {
        // Check authentication first
        if (!isAuthenticated()) {
          console.log('Not authenticated, redirecting to login')
          handleAuthError(router)
          return
        }

        console.log('Fetching marketplace item:', params.id) // Debug log
        
        const response = await authenticatedFetch(
          `http://localhost:3003/api/v1/marketplace_items/${params.id}`,
          {},
          router
        )

        if (response.ok) {
          const result = await response.json()
          console.log('Marketplace item data:', result) // Debug log
          setItem(result.data)
        } else {
          const errorData = await response.json().catch(() => ({}))
          console.log('API Error:', errorData) // Debug log
          setError(errorData.error || 'Item not found')
        }
      } catch (err) {
        console.error('Fetch error:', err) // Debug log
        if (err instanceof Error && err.message !== 'Authentication failed') {
          setError('Failed to fetch item details')
        }
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchMarketplaceItem()
    }
  }, [params.id, router])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
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
      'toys': 'bg-pink-100 text-pink-800',
      'clothing': 'bg-purple-100 text-purple-800',
      'books': 'bg-blue-100 text-blue-800',
      'equipment': 'bg-green-100 text-green-800',
      'furniture': 'bg-yellow-100 text-yellow-800',
      'electronics': 'bg-red-100 text-red-800',
      'other': 'bg-gray-100 text-gray-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getConditionColor = (condition: string) => {
    const colors = {
      'new': 'bg-green-100 text-green-800',
      'like_new': 'bg-blue-100 text-blue-800',
      'good': 'bg-yellow-100 text-yellow-800',
      'fair': 'bg-orange-100 text-orange-800',
      'poor': 'bg-red-100 text-red-800'
    }
    return colors[condition as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getConditionText = (condition: string) => {
    const texts = {
      'new': 'Mới',
      'like_new': 'Như mới',
      'good': 'Tốt',
      'fair': 'Khá',
      'poor': 'Kém'
    }
    return texts[condition as keyof typeof texts] || condition
  }

  const handleContactSeller = () => {
    if (item?.seller.email) {
      window.open(`mailto:${item.seller.email}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">📦</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy sản phẩm</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/marketplace')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại marketplace
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
              onClick={() => router.push('/marketplace')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Quay lại marketplace
            </button>
            <div className="flex items-center space-x-4">
              {item.available && (
                <button
                  onClick={handleContactSeller}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Liên hệ người bán
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Product Images */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                {item.images && item.images.length > 0 ? (
                  <img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <Package className="h-16 w-16 mx-auto mb-2" />
                    <p>Không có hình ảnh</p>
                  </div>
                )}
              </div>
              {item.images && item.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {item.images.slice(1, 5).map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`${item.title} ${index + 2}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(item.created_at)}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {item.seller.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatPrice(item.price)}
                  </div>
                  {!item.available && (
                    <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Đã bán
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(item.condition)}`}>
                  {getConditionText(item.condition)}
                </span>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Mô tả sản phẩm
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{item.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Action */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {formatPrice(item.price)}
                </div>
                {item.available ? (
                  <div>
                    <button
                      onClick={handleContactSeller}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-3"
                    >
                      Liên hệ mua hàng
                    </button>
                    <p className="text-sm text-gray-500">
                      Liên hệ trực tiếp với người bán để thương lượng
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <p className="text-lg font-medium mb-2">Sản phẩm đã bán</p>
                    <p className="text-sm">Sản phẩm này không còn khả dụng</p>
                  </div>
                )}
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Thông tin người bán
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-gray-600 w-20">Tên:</span>
                  <span className="font-medium">{item.seller.name}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-gray-600 w-16">Địa chỉ:</span>
                  <span className="font-medium">{item.seller.location}</span>
                </div>

                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-gray-600 w-16">Email:</span>
                  <a 
                    href={`mailto:${item.seller.email}`}
                    className="font-medium text-blue-600 hover:text-blue-700 truncate"
                  >
                    {item.seller.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Chi tiết sản phẩm</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Danh mục:</span>
                  <span className="font-medium">{item.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tình trạng:</span>
                  <span className="font-medium">{getConditionText(item.condition)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span className="font-medium">
                    {item.available ? 'Còn hàng' : 'Đã bán'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày đăng:</span>
                  <span className="font-medium">{formatDate(item.created_at)}</span>
                </div>
                {item.updated_at !== item.created_at && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cập nhật:</span>
                    <span className="font-medium">{formatDate(item.updated_at)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">💡 Lời khuyên an toàn</h3>
              <ul className="text-sm text-yellow-700 space-y-2">
                <li>• Gặp mặt tại nơi công cộng</li>
                <li>• Kiểm tra sản phẩm trước khi thanh toán</li>
                <li>• Không chuyển tiền trước khi nhận hàng</li>
                <li>• Báo cáo nếu có hoạt động đáng ngờ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 