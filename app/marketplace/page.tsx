'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, Search, Filter, Star, MapPin, Heart, Plus, DollarSign, Eye, MessageCircle, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { marketplaceAPI } from '@/lib/api'

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
  views?: number
  liked?: boolean
}

export default function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCondition, setSelectedCondition] = useState('')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('newest')

  const categories = [
    { value: 'strollers', label: 'Xe đẩy', icon: '🚼', count: 45 },
    { value: 'toys', label: 'Đồ chơi', icon: '🧸', count: 123 },
    { value: 'clothing', label: 'Quần áo', icon: '👶', count: 89 },
    { value: 'furniture', label: 'Nội thất', icon: '🪑', count: 67 },
    { value: 'books', label: 'Sách', icon: '📚', count: 34 },
    { value: 'safety_gear', label: 'Đồ an toàn', icon: '🛡️', count: 56 },
    { value: 'feeding', label: 'Đồ ăn dặm', icon: '🍼', count: 78 }
  ]

  const conditions = [
    { value: 'new', label: 'Mới 100%', icon: '✨', color: 'green' },
    { value: 'like_new', label: 'Như mới', icon: '⭐', color: 'blue' },
    { value: 'good', label: 'Tình trạng tốt', icon: '👍', color: 'yellow' },
    { value: 'fair', label: 'Còn sử dụng được', icon: '👌', color: 'orange' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'price_low', label: 'Giá thấp đến cao' },
    { value: 'price_high', label: 'Giá cao đến thấp' },
    { value: 'popular', label: 'Phổ biến nhất' }
  ]

  useEffect(() => {
    fetchMarketplaceItems()
  }, [selectedCategory, selectedCondition])

  const fetchMarketplaceItems = async () => {
    try {
      setLoading(true)
      
      // Try to fetch from real API
      const response = await marketplaceAPI.getAll({
        category: selectedCategory || undefined,
        condition: selectedCondition || undefined
      })
      
      // Transform API data to match interface
      const apiItems = response.data.data.map((item: any) => ({
        ...item,
        seller: {
          id: 1,
          name: 'Người bán',
          location: item.location || 'Hà Nội',
          rating: 4.5
        }
      }))
      
      setItems(apiItems)
    } catch (error) {
      console.error('Error fetching marketplace items:', error)
      
      // Enhanced fallback to mock data if API fails
      const mockItems: MarketplaceItem[] = [
        {
          id: 1,
          title: 'Xe đẩy em bé Combi Aprica',
          description: 'Xe đẩy em bé hãng Combi Aprica cao cấp, sử dụng 6 tháng, còn rất mới. Có thể gấp gọn dễ dàng, bánh xe êm ái, phanh an toàn. Kèm theo túi đựng và ô che nắng.',
          price: 1500000,
          category: 'strollers',
          condition: 'like_new',
          images: ['/placeholder-stroller.jpg'],
          seller: {
            id: 1,
            name: 'Nguyễn Thị Lan',
            location: 'Quận Cầu Giấy, Hà Nội',
            rating: 4.8
          },
          created_at: '2024-05-20',
          views: 156,
          liked: false
        },
        {
          id: 2,
          title: 'Bộ đồ chơi gỗ giáo dục Montessori',
          description: 'Bộ đồ chơi gỗ phát triển trí tuệ cho trẻ 2-5 tuổi theo phương pháp Montessori. Gồm các khối hình học, bảng chữ cái và số đếm. Chất liệu gỗ tự nhiên an toàn.',
          price: 300000,
          category: 'toys',
          condition: 'good',
          images: ['/placeholder-toys.jpg'],
          seller: {
            id: 2,
            name: 'Trần Văn Nam',
            location: 'Quận 1, TP.HCM',
            rating: 4.5
          },
          created_at: '2024-05-18',
          views: 89,
          liked: true
        },
        {
          id: 3,
          title: 'Ghế ăn dặm gỗ cao cấp',
          description: 'Ghế ăn dặm gỗ tự nhiên cao cấp, có thể điều chỉnh độ cao 3 cấp. Đệm ngồi có thể tháo rời để giặt. Thiết kế chắc chắn, an toàn cho bé.',
          price: 800000,
          category: 'furniture',
          condition: 'like_new',
          images: ['/placeholder-chair.jpg'],
          seller: {
            id: 3,
            name: 'Lê Thị Mai',
            location: 'Quận Ba Đình, Hà Nội',
            rating: 4.9
          },
          created_at: '2024-05-15',
          views: 234,
          liked: false
        },
        {
          id: 4,
          title: 'Set áo quần Carter\'s 12-18M (5 bộ)',
          description: 'Bộ 5 áo và 3 quần của hãng Carter\'s cho bé 12-18 tháng tuổi. Chất liệu cotton mềm mại, thấm hút mồ hôi tốt. Màu sắc tươi sáng, họa tiết đáng yêu.',
          price: 450000,
          category: 'clothing',
          condition: 'good',
          images: ['/placeholder-clothes.jpg'],
          seller: {
            id: 1,
            name: 'Nguyễn Thị Lan',
            location: 'Quận Cầu Giấy, Hà Nội',
            rating: 4.8
          },
          created_at: '2024-05-12',
          views: 67,
          liked: false
        },
        {
          id: 5,
          title: 'Bộ sách chuyện cổ tích Việt Nam (10 cuốn)',
          description: 'Bộ 10 cuốn sách chuyện cổ tích Việt Nam với hình ảnh minh họa đẹp mắt, in màu chất lượng cao. Phù hợp cho trẻ 3-8 tuổi, giúp phát triển khả năng đọc hiểu.',
          price: 120000,
          category: 'books',
          condition: 'good',
          images: ['/placeholder-books.jpg'],
          seller: {
            id: 4,
            name: 'Phạm Văn Hùng',
            location: 'Quận Hải Châu, Đà Nẵng',
            rating: 4.7
          },
          created_at: '2024-05-10',
          views: 45,
          liked: true
        },
        {
          id: 6,
          title: 'Cổng an toàn cầu thang Lindam',
          description: 'Cổng an toàn cho cầu thang và cửa ra vào hãng Lindam, có thể điều chỉnh độ rộng từ 75-82cm. Khóa an toàn kép, dễ lắp đặt không cần khoan tường.',
          price: 350000,
          category: 'safety_gear',
          condition: 'like_new',
          images: ['/placeholder-gate.jpg'],
          seller: {
            id: 5,
            name: 'Hoàng Thị Nga',
            location: 'Quận Đống Đa, Hà Nội',
            rating: 4.6
          },
          created_at: '2024-05-08',
          views: 123,
          liked: false
        },
        {
          id: 7,
          title: 'Bộ bình sữa Pigeon 240ml (3 chiếc)',
          description: 'Bộ 3 bình sữa Pigeon 240ml với núm ti silicon mềm mại. Thiết kế chống sặc, dễ cầm nắm cho bé. Sử dụng 2 tháng, vệ sinh sạch sẽ.',
          price: 280000,
          category: 'feeding',
          condition: 'like_new',
          images: ['/placeholder-bottles.jpg'],
          seller: {
            id: 6,
            name: 'Vũ Thị Hương',
            location: 'Quận 7, TP.HCM',
            rating: 4.4
          },
          created_at: '2024-05-05',
          views: 78,
          liked: false
        },
        {
          id: 8,
          title: 'Xe tập đi cho bé Fisher Price',
          description: 'Xe tập đi Fisher Price với nhiều hoạt động giải trí, âm nhạc vui nhộn. Giúp bé phát triển kỹ năng vận động và khả năng cân bằng. Còn rất mới.',
          price: 650000,
          category: 'toys',
          condition: 'like_new',
          images: ['/placeholder-walker.jpg'],
          seller: {
            id: 7,
            name: 'Đỗ Văn Minh',
            location: 'Quận Long Biên, Hà Nội',
            rating: 4.7
          },
          created_at: '2024-05-03',
          views: 145,
          liked: true
        }
      ]

      // Filter by category and condition for fallback data
      let filtered = mockItems
      if (selectedCategory) {
        filtered = filtered.filter(item => item.category === selectedCategory)
      }
      if (selectedCondition) {
        filtered = filtered.filter(item => item.condition === selectedCondition)
      }

      setItems(filtered)
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

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price
      case 'price_high':
        return b.price - a.price
      case 'popular':
        return (b.views || 0) - (a.views || 0)
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
  })

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.value === category)?.label || category
  }

  const getCategoryIcon = (category: string) => {
    return categories.find(c => c.value === category)?.icon || '🛍️'
  }

  const getConditionLabel = (condition: string) => {
    return conditions.find(c => c.value === condition)?.label || condition
  }

  const getConditionIcon = (condition: string) => {
    return conditions.find(c => c.value === condition)?.icon || '👍'
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const getConditionColor = (condition: string) => {
    const conditionObj = conditions.find(c => c.value === condition)
    switch (conditionObj?.color) {
      case 'green': return 'bg-green-100 text-green-800'
      case 'blue': return 'bg-blue-100 text-blue-800'
      case 'yellow': return 'bg-yellow-100 text-yellow-800'
      case 'orange': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleLikeItem = (itemId: number) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, liked: !item.liked } : item
    ))
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl mb-4">
            <ShoppingBag className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Chợ phụ huynh
            <span className="block text-2xl md:text-3xl bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mt-2">
              Mua bán đồ dùng trẻ em
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nơi mua bán đồ dùng trẻ em chất lượng cao với giá cả hợp lý. Được kiểm duyệt bởi AI và cộng đồng tin cậy.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200">
              <div className="text-2xl font-bold text-orange-600">500+</div>
              <div className="text-sm text-gray-600">Sản phẩm</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200">
              <div className="text-2xl font-bold text-pink-600">95%</div>
              <div className="text-sm text-gray-600">Hài lòng</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">AI</div>
              <div className="text-sm text-gray-600">Kiểm duyệt</div>
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
              placeholder="Tìm kiếm đồ dùng trẻ em..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <Filter className="h-5 w-5" />
                <span>Bộ lọc</span>
              </button>
              <div className="text-sm text-gray-500">
                {sortedItems.length} sản phẩm
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              
              <Link
                href="/marketplace/create"
                className="bg-gradient-to-r from-orange-600 to-pink-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Đăng bán</span>
              </Link>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-200">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">🏷️ Danh mục</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={selectedCategory === ''}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-3 text-orange-600"
                    />
                    <span className="text-sm">Tất cả danh mục</span>
                  </label>
                  {categories.map(category => (
                    <label key={category.value} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.value}
                          checked={selectedCategory === category.value}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mr-3 text-orange-600"
                        />
                        <span className="text-sm mr-2">{category.icon}</span>
                        <span className="text-sm">{category.label}</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Condition Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">⭐ Tình trạng</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="condition"
                      value=""
                      checked={selectedCondition === ''}
                      onChange={(e) => setSelectedCondition(e.target.value)}
                      className="mr-3 text-orange-600"
                    />
                    <span className="text-sm">Tất cả tình trạng</span>
                  </label>
                  {conditions.map(condition => (
                    <label key={condition.value} className="flex items-center">
                      <input
                        type="radio"
                        name="condition"
                        value={condition.value}
                        checked={selectedCondition === condition.value}
                        onChange={(e) => setSelectedCondition(e.target.value)}
                        className="mr-3 text-orange-600"
                      />
                      <span className="text-sm mr-2">{condition.icon}</span>
                      <span className="text-sm">{condition.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">💰 Khoảng giá</label>
                <div className="space-y-3">
                  <div>
                    <input
                      type="number"
                      placeholder="Giá từ"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Giá đến"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Safety Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">🛡️ An toàn</label>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center mb-2">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">Được kiểm duyệt</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Tất cả sản phẩm được AI và cộng đồng kiểm tra về chất lượng và an toàn.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Đang tìm kiếm sản phẩm cho bạn...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((item) => (
              <div key={item.id} className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-orange-300 transition-all duration-300 overflow-hidden">
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-4xl">{getCategoryIcon(item.category)}</span>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
                      {getConditionIcon(item.condition)} {getConditionLabel(item.condition)}
                    </span>
                    {item.views && item.views > 100 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Hot
                      </span>
                    )}
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={() => handleLikeItem(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200"
                  >
                    <Heart className={`w-4 h-4 ${item.liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                </div>

                <div className="p-4">
                  {/* Title and Price */}
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-orange-600">
                        {formatPrice(item.price)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getCategoryLabel(item.category)}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {item.seller.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.seller.name}</div>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {item.seller.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{item.seller.rating}</span>
                    </div>
                  </div>

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      {item.views && (
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          <span>{item.views}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <span>{getTimeAgo(item.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link
                      href={`/marketplace/${item.id}`}
                      className="flex-1 bg-gradient-to-r from-orange-600 to-pink-600 text-white text-center py-2 px-3 rounded-xl hover:shadow-lg transition-all duration-200 text-sm font-medium"
                    >
                      Xem chi tiết
                    </Link>
                    <button className="px-3 py-2 border-2 border-orange-600 text-orange-600 rounded-xl hover:bg-orange-50 transition-all duration-200 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {sortedItems.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-12 max-w-md mx-auto">
              <ShoppingBag className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Không tìm thấy sản phẩm</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn. Hãy thử thay đổi bộ lọc hoặc đăng bán sản phẩm mới.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('')
                    setSelectedCondition('')
                    setPriceRange({ min: '', max: '' })
                  }}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Xóa bộ lọc
                </button>
                <Link
                  href="/marketplace/create"
                  className="block w-full bg-gradient-to-r from-orange-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200"
                >
                  Đăng bán sản phẩm
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 