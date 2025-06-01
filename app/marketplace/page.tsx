'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, Search, Filter, Star, MapPin, Heart, Plus, DollarSign } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface MarketplaceItem {
  id: number
  title: string
  description: string
  price: number
  category: string
  condition: string
  images?: string[]
  seller: {
    id: number
    name: string
    location: string
    rating: number
  }
  created_at: string
}

export default function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCondition, setSelectedCondition] = useState('')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  const categories = [
    { value: 'strollers', label: 'Xe đẩy' },
    { value: 'toys', label: 'Đồ chơi' },
    { value: 'clothing', label: 'Quần áo' },
    { value: 'furniture', label: 'Nội thất' },
    { value: 'books', label: 'Sách' },
    { value: 'safety_gear', label: 'Đồ an toàn' },
    { value: 'feeding', label: 'Đồ ăn dặm' }
  ]

  const conditions = [
    { value: 'new', label: 'Mới' },
    { value: 'like_new', label: 'Như mới' },
    { value: 'good', label: 'Tốt' },
    { value: 'fair', label: 'Khá' }
  ]

  useEffect(() => {
    fetchMarketplaceItems()
  }, [selectedCategory, selectedCondition])

  const fetchMarketplaceItems = async () => {
    try {
      setLoading(true)
      // Mock data - replace with actual API call
      const mockItems: MarketplaceItem[] = [
        {
          id: 1,
          title: 'Xe đẩy em bé Combi',
          description: 'Xe đẩy em bé hãng Combi, sử dụng 6 tháng, còn rất mới. Có thể gấp gọn dễ dàng, bánh xe êm ái.',
          price: 1500000,
          category: 'strollers',
          condition: 'like_new',
          images: ['/placeholder-stroller.jpg'],
          seller: {
            id: 1,
            name: 'Nguyễn Thị Lan',
            location: 'Hà Nội',
            rating: 4.8
          },
          created_at: '2024-05-20'
        },
        {
          id: 2,
          title: 'Bộ đồ chơi gỗ giáo dục',
          description: 'Bộ đồ chơi gỗ phát triển trí tuệ cho trẻ 2-5 tuổi. Gồm các khối hình học và bảng chữ cái.',
          price: 300000,
          category: 'toys',
          condition: 'good',
          images: ['/placeholder-toys.jpg'],
          seller: {
            id: 2,
            name: 'Trần Văn Nam',
            location: 'Hồ Chí Minh',
            rating: 4.5
          },
          created_at: '2024-05-18'
        },
        {
          id: 3,
          title: 'Ghế ăn dặm cho bé',
          description: 'Ghế ăn dặm gỗ tự nhiên, có thể điều chỉnh độ cao. Đệm ngồi có thể tháo rời để giặt.',
          price: 800000,
          category: 'furniture',
          condition: 'like_new',
          images: ['/placeholder-chair.jpg'],
          seller: {
            id: 3,
            name: 'Lê Thị Mai',
            location: 'Hà Nội',
            rating: 4.9
          },
          created_at: '2024-05-15'
        },
        {
          id: 4,
          title: 'Set áo quần Carter\'s 12-18M',
          description: 'Bộ 5 áo và 3 quần của hãng Carter\'s cho bé 12-18 tháng tuổi. Chất liệu cotton mềm mại.',
          price: 450000,
          category: 'clothing',
          condition: 'good',
          images: ['/placeholder-clothes.jpg'],
          seller: {
            id: 1,
            name: 'Nguyễn Thị Lan',
            location: 'Hà Nội',
            rating: 4.8
          },
          created_at: '2024-05-12'
        },
        {
          id: 5,
          title: 'Sách chuyện cổ tích cho bé',
          description: 'Bộ 10 cuốn sách chuyện cổ tích Việt Nam với hình ảnh minh họa đẹp mắt.',
          price: 120000,
          category: 'books',
          condition: 'good',
          images: ['/placeholder-books.jpg'],
          seller: {
            id: 4,
            name: 'Phạm Văn Hùng',
            location: 'Đà Nẵng',
            rating: 4.7
          },
          created_at: '2024-05-10'
        },
        {
          id: 6,
          title: 'Cổng an toàn cầu thang',
          description: 'Cổng an toàn cho cầu thang và cửa ra vào, có thể điều chỉnh độ rộng từ 75-82cm.',
          price: 350000,
          category: 'safety_gear',
          condition: 'like_new',
          images: ['/placeholder-gate.jpg'],
          seller: {
            id: 5,
            name: 'Hoàng Thị Nga',
            location: 'Hà Nội',
            rating: 4.6
          },
          created_at: '2024-05-08'
        }
      ]

      // Filter by category and condition
      let filtered = mockItems
      if (selectedCategory) {
        filtered = filtered.filter(item => item.category === selectedCategory)
      }
      if (selectedCondition) {
        filtered = filtered.filter(item => item.condition === selectedCondition)
      }

      setItems(filtered)
    } catch (error) {
      console.error('Error fetching marketplace items:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPrice = (!priceRange.min || item.price >= parseInt(priceRange.min)) &&
                        (!priceRange.max || item.price <= parseInt(priceRange.max))
    
    return matchesSearch && matchesPrice
  })

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.value === category)?.label || category
  }

  const getConditionLabel = (condition: string) => {
    return conditions.find(c => c.value === condition)?.label || condition
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-800'
      case 'like_new': return 'bg-blue-100 text-blue-800'
      case 'good': return 'bg-yellow-100 text-yellow-800'
      case 'fair': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
              <Link href="/marketplace" className="text-green-600 font-medium">Chợ đồ cũ</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Chợ đồ cũ</h1>
              <p className="text-gray-600">Mua bán đồ dùng trẻ em đã qua sử dụng với AI kiểm duyệt</p>
            </div>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Đăng tin bán
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Tất cả danh mục</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tình trạng</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Tất cả tình trạng</option>
                {conditions.map(condition => (
                  <option key={condition.value} value={condition.value}>{condition.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Giá từ</label>
              <input
                type="number"
                placeholder="0"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Giá đến</label>
              <input
                type="number"
                placeholder="∞"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-t-lg">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                    <ShoppingBag className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {item.title}
                    </h3>
                    <button className="text-gray-400 hover:text-red-500">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
                      {getConditionLabel(item.condition)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {getCategoryLabel(item.category)}
                    </span>
                  </div>
                  
                  <div className="text-2xl font-bold text-green-600 mb-3">
                    {formatPrice(item.price)}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {item.seller.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                      {item.seller.rating}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link 
                      href={`/marketplace/${item.id}`}
                      className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Xem chi tiết
                    </Link>
                    <button className="px-3 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                      <DollarSign className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Đăng bởi <span className="font-medium">{item.seller.name}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy sản phẩm nào</h3>
            <p className="text-gray-600 mb-4">Thử thay đổi bộ lọc hoặc đăng tin bán mới</p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Đăng tin bán
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 