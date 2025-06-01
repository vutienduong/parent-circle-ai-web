import { Users, MessageCircle, Calendar, ShoppingBag, BarChart3, Heart } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ParentCircle</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/communities" className="text-gray-700 hover:text-green-600">Cộng đồng</Link>
              <Link href="/chat" className="text-gray-700 hover:text-green-600">AI Chat</Link>
              <Link href="/scheduler" className="text-gray-700 hover:text-green-600">Lịch gia đình</Link>
              <Link href="/marketplace" className="text-gray-700 hover:text-green-600">Chợ đồ cũ</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-green-600">Dashboard</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-green-600">Đăng nhập</Link>
              <Link href="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Cộng đồng phụ huynh
            <span className="text-green-600"> thông minh</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Kết nối với các bậc phụ huynh khác, chia sẻ kinh nghiệm nuôi dạy con và nhận hỗ trợ từ AI ConnectSphere
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700">
              Tham gia ngay
            </Link>
            <Link href="/communities" className="border border-green-600 text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50">
              Khám phá cộng đồng
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tính năng nổi bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">ConnectSphere AI</h3>
              <p className="text-gray-600">AI thông minh gợi ý nhóm thảo luận và lời khuyên phù hợp với bạn</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">ParentChat AI</h3>
              <p className="text-gray-600">Chatbot AI trả lời mọi thắc mắc về nuôi dạy con 24/7</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lịch gia đình</h3>
              <p className="text-gray-600">Quản lý lịch trình và công việc gia đình một cách thông minh</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <ShoppingBag className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Chợ đồ cũ</h3>
              <p className="text-gray-600">Mua bán đồ dùng trẻ em đã qua sử dụng với AI kiểm duyệt</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">12,000+</div>
              <div className="text-green-100">Phụ huynh tham gia</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-green-100">Câu hỏi được giải đáp</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-100">Mức độ hài lòng</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-green-600" />
                <span className="ml-2 text-lg font-bold">ParentCircle</span>
              </div>
              <p className="text-gray-400">
                Cộng đồng phụ huynh thông minh với AI hỗ trợ
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tính năng</h3>
              <ul className="space-y-2 text-gray-400">
                <li>ConnectSphere AI</li>
                <li>ParentChat AI</li>
                <li>Lịch gia đình</li>
                <li>Chợ đồ cũ</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Trung tâm trợ giúp</li>
                <li>Liên hệ</li>
                <li>Điều khoản</li>
                <li>Bảo mật</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Kết nối</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Email</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ParentCircle. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
