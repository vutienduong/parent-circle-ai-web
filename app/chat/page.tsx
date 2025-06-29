'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { chatAPI } from '@/lib/api'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  helpful?: boolean
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Xin chào! Tôi là ParentChat AI 🤖, trợ lý thông minh chuyên về nuôi dạy con của ParentCircle.\n\nTôi có thể giúp bạn:\n• Giải đáp thắc mắc về chăm sóc trẻ\n• Tư vấn dinh dưỡng và sức khỏe\n• Gợi ý hoạt động giáo dục\n• Kết nối với cộng đồng phù hợp\n\nBạn có câu hỏi gì về việc nuôi dạy con không? 😊',
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
      
      // Enhanced fallback with more intelligent responses
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const getSmartResponse = (question: string) => {
        const lowerQuestion = question.toLowerCase()
        
        if (lowerQuestion.includes('ngủ') || lowerQuestion.includes('sleep')) {
          return `🌙 **Về vấn đề giấc ngủ của bé:**

Dựa trên câu hỏi của bạn, tôi gợi ý một số phương pháp hiệu quả:

• **Thiết lập thói quen:** Tạo rutine ngủ cố định (tắm → đọc sách → ru ngủ)
• **Môi trường phù hợp:** Phòng tối, mát mẻ, yên tĩnh
• **Thời gian phù hợp:** Trẻ 0-3 tháng ngủ 14-17h/ngày, 4-11 tháng ngủ 12-15h/ngày

💡 **Bạn có thể tham gia nhóm ["Sleep Training Việt Nam"](/communities) để chia sẻ kinh nghiệm với 2,847 phụ huynh khác!**`
        }
        
        if (lowerQuestion.includes('ăn') || lowerQuestion.includes('dinh dưỡng') || lowerQuestion.includes('thực đơn')) {
          return `🍎 **Về dinh dưỡng cho bé:**

Tôi hiểu mối quan tâm của bạn về chế độ ăn cho con. Đây là những nguyên tắc cơ bản:

• **0-6 tháng:** Chỉ cho bú mẹ hoặc sữa công thức
• **6-12 tháng:** Bắt đầu ăn dặm với rau củ, trái cây nghiền
• **12+ tháng:** Ăn cùng gia đình với thực phẩm phù hợp

📚 **Thực đơn mẫu theo độ tuổi:**
- 6-8 tháng: Cháo loãng, rau củ nghiền
- 9-11 tháng: Cháo đặc, thịt cá xay nhuyễn
- 12+ tháng: Cơm mềm, thực phẩm finger food

💡 **Tham gia nhóm ["Dinh dưỡng cho bé yêu"](/communities) với 3,200 thành viên để có thêm công thức nấu ăn!**`
        }
        
        if (lowerQuestion.includes('giáo dục') || lowerQuestion.includes('học') || lowerQuestion.includes('phát triển')) {
          return `📚 **Về giáo dục sớm cho trẻ:**

Giáo dục sớm rất quan trọng cho sự phát triển toàn diện của bé:

• **0-2 tuổi:** Kích thích giác quan qua âm thanh, màu sắc, xúc giác
• **2-4 tuổi:** Phát triển ngôn ngữ, kỹ năng vận động tinh
• **4-6 tuổi:** Chuẩn bị cho việc học chữ số, kỹ năng xã hội

🎨 **Hoạt động gợi ý:**
- Đọc sách cùng bé mỗi ngày
- Chơi đồ chơi xếp hình, ghép puzzle
- Hoạt động nghệ thuật: vẽ, nặn đất sét

💡 **Khám phá nhóm ["Hoạt động giáo dục sớm"](/communities) với 1,567 phụ huynh tại TP.HCM!**`
        }
        
        if (lowerQuestion.includes('sức khỏe') || lowerQuestion.includes('bệnh') || lowerQuestion.includes('khám')) {
          return `🏥 **Về sức khỏe trẻ em:**

Sức khỏe của con luôn là ưu tiên hàng đầu của phụ huynh:

• **Khám định kỳ:** Theo lịch tiêm chủng và khám sức khỏe
• **Dấu hiệu cần lưu ý:** Sốt cao, khó thở, ăn uống kém
• **Phòng bệnh:** Vệ sinh tay, dinh dưỡng đủ, vận động

⚠️ **Khi nào cần đến bác sĩ ngay:**
- Sốt trên 39°C ở trẻ dưới 3 tháng
- Khó thở, thở nhanh bất thường
- Tiêu chảy kéo dài với dấu hiệu mất nước

💡 **Tham gia nhóm ["Sức khỏe trẻ em"](/communities) có sự tham gia của các bác sĩ nhi khoa uy tín!**`
        }
        
        // Default response
        return `🤔 **Cảm ơn bạn đã chia sẻ!**

Đây là một câu hỏi rất hay về nuôi dạy con. Dựa trên kinh nghiệm của cộng đồng ParentCircle:

• Mỗi trẻ đều có đặc điểm riêng, hãy quan sát và thấu hiểu con
• Kiên nhẫn và nhất quán trong cách nuôi dạy
• Không ngần ngại tìm kiếm sự hỗ trợ khi cần

💡 **Gợi ý:** Bạn có thể tham gia các nhóm thảo luận phù hợp trên ParentCircle để:
- Chia sẻ kinh nghiệm với phụ huynh khác
- Nhận lời khuyên từ chuyên gia
- Cập nhật kiến thức nuôi dạy con mới nhất

🔗 **[Khám phá cộng đồng](/communities)** với hơn 200 nhóm thảo luận chuyên đề!`
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getSmartResponse(inputMessage),
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

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question)
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    // You could add a toast notification here
  }

  const handleMarkHelpful = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, helpful: !msg.helpful } : msg
    ))
  }

  const handleNewChat = () => {
    setMessages([{
      id: '1',
      content: 'Xin chào! Tôi là ParentChat AI 🤖, trợ lý thông minh chuyên về nuôi dạy con của ParentCircle.\n\nTôi có thể giúp bạn:\n• Giải đáp thắc mắc về chăm sóc trẻ\n• Tư vấn dinh dưỡng và sức khỏe\n• Gợi ý hoạt động giáo dục\n• Kết nối với cộng đồng phù hợp\n\nBạn có câu hỏi gì về việc nuôi dạy con không? 😊',
      role: 'assistant',
      timestamp: new Date()
    }])
    setInputMessage('')
  }

  const suggestedQuestions = [
    {
      icon: '😴',
      text: 'Con tôi khó ngủ, phải làm sao?',
      category: 'Giấc ngủ'
    },
    {
      icon: '🍎',
      text: 'Thực đơn ăn dặm cho bé 6 tháng',
      category: 'Dinh dưỡng'
    },
    {
      icon: '📚',
      text: 'Hoạt động phát triển trí tuệ cho trẻ 2 tuổi',
      category: 'Giáo dục'
    },
    {
      icon: '🤒',
      text: 'Bé sốt và quấy khóc, cần làm gì?',
      category: 'Sức khỏe'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🤖</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ParentChat AI</h1>
              <p className="text-sm text-gray-500">Trợ lý AI chuyên về nuôi dạy con</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleNewChat}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Cuộc trò chuyện mới"
            >
              <span className="text-lg">🔄</span>
            </button>
            <Link
              href="/communities"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              💬 Tham gia cộng đồng
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Suggested Questions - Only show when messages is just the welcome message */}
        {messages.length === 1 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">💡</span>
              Câu hỏi gợi ý
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question.text)}
                  className="text-left p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{question.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm text-blue-600 font-medium mb-1">{question.category}</div>
                      <div className="text-gray-900 font-medium">{question.text}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
              >
                <div className={`flex space-x-3 max-w-3xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gradient-to-br from-purple-500 to-blue-600 text-white'
                  }`}>
                    <span className="text-sm">
                      {message.role === 'user' ? '👤' : '🤖'}
                    </span>
                  </div>
                  <div className={`relative px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    
                    {message.role === 'assistant' && (
                      <div className="flex items-center space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCopyMessage(message.content)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Sao chép"
                        >
                          <span className="text-sm">📋</span>
                        </button>
                        <button
                          onClick={() => handleMarkHelpful(message.id)}
                          className={`p-1 transition-colors ${
                            message.helpful 
                              ? 'text-green-600' 
                              : 'text-gray-400 hover:text-green-600'
                          }`}
                          title="Hữu ích"
                        >
                          <span className="text-sm">👍</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex space-x-3 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Hỏi tôi về nuôi dạy con... (Enter để gửi, Shift+Enter để xuống dòng)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <span>📤</span>
                <span className="hidden sm:inline">Gửi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-4">
            <span>⚡ Phản hồi nhanh</span>
            <span>🔒 Bảo mật thông tin</span>
            <span>🎯 Tư vấn chuyên nghiệp</span>
          </div>
          <p className="mt-2">
            Được hỗ trợ bởi AI và cộng đồng 12,000+ phụ huynh Việt Nam
          </p>
        </div>
      </div>
    </div>
  )
} 