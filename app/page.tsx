import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            ParentCircle
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Cộng đồng phụ huynh thông minh với AI hỗ trợ - Kết nối, học hỏi và phát triển cùng nhau
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/communities" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              🏠 Tham gia cộng đồng
            </Link>
            <Link href="/chat" className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              💬 Trò chuyện với AI
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-2">Cộng đồng</h3>
            <p className="text-gray-600">Kết nối với phụ huynh cùng độ tuổi con</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI Hỗ trợ</h3>
            <p className="text-gray-600">Tư vấn nuôi dạy con 24/7</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">Lịch gia đình</h3>
            <p className="text-gray-600">Quản lý hoạt động gia đình thông minh</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🛍️</div>
            <h3 className="text-xl font-bold mb-2">Chợ phụ huynh</h3>
            <p className="text-gray-600">Mua bán đồ dùng trẻ em an toàn</p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-center mb-8">Khám phá ParentCircle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/communities" className="text-center p-4 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="text-2xl mb-2">🏠</div>
              <div className="font-medium">Cộng đồng</div>
            </Link>
            <Link href="/chat" className="text-center p-4 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="text-2xl mb-2">💬</div>
              <div className="font-medium">Chat AI</div>
            </Link>
            <Link href="/scheduler" className="text-center p-4 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="text-2xl mb-2">📅</div>
              <div className="font-medium">Lịch trình</div>
            </Link>
            <Link href="/marketplace" className="text-center p-4 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="text-2xl mb-2">🛍️</div>
              <div className="font-medium">Chợ</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 