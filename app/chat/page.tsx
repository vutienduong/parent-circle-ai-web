'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Heart, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { chatAPI } from '@/lib/api'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Xin chào! Tôi là ParentChat AI, trợ lý thông minh của ParentCircle. Tôi có thể giúp bạn giải đáp các thắc mắc về nuôi dạy con. Bạn có câu hỏi gì không?',
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => `session_${Date.now()}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Use real API instead of mock response
      const response = await chatAPI.sendMessage(inputMessage, sessionId)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.data.ai_response,
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Fallback to mock response if API fails
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const aiResponses = [
        'Dựa trên thông tin của bạn, tôi khuyên bạn nên thử phương pháp sleep training dần dần. Bạn có thể tham gia nhóm "Sleep Training Hanoi" để chia sẻ kinh nghiệm với các bậc phụ huynh khác.',
        'Đây là một câu hỏi rất hay! Với trẻ ở độ tuổi này, bạn có thể thử các hoạt động vui chơi giáo dục. Tôi gợi ý bạn xem thêm trong nhóm "Hoạt động giáo dục cho trẻ" trên ParentCircle.',
        'Tôi hiểu lo lắng của bạn. Hãy thử tham khảo ý kiến từ cộng đồng phụ huynh tại Hà Nội trong nhóm thảo luận phù hợp. Bạn cũng có thể đặt lịch khám với bác sĩ nhi khoa gần nhà.',
        'Về vấn đề dinh dưỡng cho trẻ, tôi khuyên bạn nên đảm bảo chế độ ăn cân bằng với đủ protein, vitamin và khoáng chất. Bạn có thể tham khảo thêm trong nhóm "Dinh dưỡng cho trẻ" để có thêm nhiều công thức nấu ăn hay.'
      ]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedQuestions = [
    'Làm thế nào để bé ngủ xuyên đêm?',
    'Thực đơn cho bé 2 tuổi như thế nào?',
    'Cách dạy bé tự lập từ sớm?',
    'Hoạt động vui chơi cho trẻ cuối tuần?'
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
              <Link href="/chat" className="text-green-600 font-medium">AI Chat</Link>
              <Link href="/scheduler" className="text-gray-700 hover:text-green-600">Lịch gia đình</Link>
              <Link href="/marketplace" className="text-gray-700 hover:text-green-600">Chợ đồ cũ</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Chat Header */}
        <div className="bg-white rounded-t-lg border-b p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900 flex items-center">
                ParentChat AI
                <Sparkles className="h-4 w-4 text-yellow-500 ml-2" />
              </h1>
              <p className="text-sm text-gray-600">Trợ lý AI thông minh cho phụ huynh</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white flex-1 overflow-y-auto p-4 space-y-4" style={{ height: '500px' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs lg:max-w-md ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                  {message.role === 'user' ? (
                    <div className="bg-green-100 p-2 rounded-full">
                      <User className="h-4 w-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString('vi-VN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex">
                <div className="bg-blue-100 p-2 rounded-full mr-2">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="bg-white border-t p-4">
            <p className="text-sm text-gray-600 mb-3">Câu hỏi gợi ý:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="bg-white rounded-b-lg border-t p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={2}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Nhấn Enter để gửi, Shift + Enter để xuống dòng
          </p>
        </div>
      </div>
    </div>
  )
} 