import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ParentCircle
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Cộng đồng phụ huynh thông minh với AI hỗ trợ
        </p>
        <div className="space-y-4">
          <Link href="/communities" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Tham gia cộng đồng
          </Link>
          <br />
          <Link href="/chat" className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50">
            Trò chuyện với AI
          </Link>
        </div>
      </div>
    </div>
  );
} 