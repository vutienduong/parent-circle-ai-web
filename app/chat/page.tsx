'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Heart, Sparkles, MessageCircle, Lightbulb, Clock, Copy, ThumbsUp, RotateCcw } from 'lucide-react'
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
      question: 'Làm thế nào để bé ngủ xuyên đêm?',
      category: 'Giấc ngủ'
    },
    {
      icon: '🍎',
      question: 'Thực đơn dinh dưỡng cho bé 2 tuổi?',
      category: 'Dinh dưỡng'
    },
    {
      icon: '📚',
      question: 'Cách dạy bé tự lập từ sớm?',
      category: 'Giáo dục'
    },
    {
      icon: '🎨',
      question: 'Hoạt động vui chơi phát triển trí tuệ?',
      category: 'Hoạt động'
    },
    {
      icon: '🏥',
      question: 'Dấu hiệu bé bị ốm cần chú ý?',
      category: 'Sức khỏe'
    },
    {
      icon: '👶',
      question: 'Các mốc phát triển quan trọng của trẻ?',
      category: 'Phát triển'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chat Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <MessageCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            ParentChat AI
            <span className="ml-2">🤖</span>
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Trợ lý AI thông minh chuyên về nuôi dạy con
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 mr-1 text-yellow-500" />
              <span>Phản hồi thông minh</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-green-500" />
              <span>24/7 hỗ trợ</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1 text-red-500" />
              <span>Được yêu thích</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Suggested Questions Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                Câu hỏi phổ biến
              </h3>
              <div className="space-y-3">
                {suggestedQuestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(item.question)}
                    className="w-full text-left p-3 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                          {item.question}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{item.category}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleNewChat}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Cuộc trò chuyện mới</span>
                </button>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Messages */}
              <div className="h-[600px] overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-3' : 'mr-3'}`}>
                        {message.role === 'user' ? (
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Bot className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                              : 'bg-gray-50 text-gray-900 border border-gray-200'
                          }`}
                        >
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </div>
                        </div>
                        
                        {/* Message actions */}
                        <div className="flex items-center justify-between mt-2 px-2">
                          <div className={`text-xs ${message.role === 'user' ? 'text-green-600' : 'text-gray-500'}`}>
                            {message.timestamp.toLocaleTimeString('vi-VN', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                          
                          {message.role === 'assistant' && (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleCopyMessage(message.content)}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                title="Sao chép"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleMarkHelpful(message.id)}
                                className={`p-1 transition-colors ${
                                  message.helpful 
                                    ? 'text-blue-600' 
                                    : 'text-gray-400 hover:text-blue-600'
                                }`}
                                title="Hữu ích"
                              >
                                <ThumbsUp className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">ParentChat AI đang suy nghĩ...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-6 bg-white/50">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Hỏi ParentChat AI về bất kỳ vấn đề nuôi dạy con nào..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                      rows={3}
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>Nhấn Enter để gửi, Shift + Enter để xuống dòng</span>
                  <span>Được hỗ trợ bởi AI 🤖</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 