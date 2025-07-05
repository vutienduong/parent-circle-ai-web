'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
      }
      
      return <DefaultErrorFallback error={this.state.error!} resetError={this.resetError} />
    }

    return this.props.children
  }
}

// Default error fallback component
function DefaultErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Có lỗi xảy ra</h1>
          <p className="text-gray-600 mb-4">
            Ứng dụng gặp phải lỗi không mong muốn. Vui lòng thử lại hoặc liên hệ hỗ trợ.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left bg-gray-100 rounded p-4 mb-4">
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                Chi tiết lỗi (Development)
              </summary>
              <pre className="text-sm text-red-600 whitespace-pre-wrap">
                {error.message}
                {error.stack}
              </pre>
            </details>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={resetError}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Thử lại
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            <Home className="w-4 h-4" />
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  )
}

// Simple error message component for inline errors
export function ErrorMessage({ 
  message, 
  onRetry, 
  className = '' 
}: { 
  message: string; 
  onRetry?: () => void; 
  className?: string;
}) {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-md p-4 ${className}`}>
      <div className="flex items-center">
        <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
        <div className="flex-1">
          <p className="text-sm text-red-800">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-3 text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Thử lại
          </button>
        )}
      </div>
    </div>
  )
}

// API Error handler component
export function ApiErrorHandler({ 
  error, 
  onRetry, 
  className = '' 
}: { 
  error: any; 
  onRetry?: () => void; 
  className?: string;
}) {
  let message = 'Có lỗi xảy ra khi tải dữ liệu'
  
  if (error?.response?.status === 401) {
    message = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
  } else if (error?.response?.status === 403) {
    message = 'Bạn không có quyền truy cập tài nguyên này.'
  } else if (error?.response?.status === 404) {
    message = 'Không tìm thấy dữ liệu yêu cầu.'
  } else if (error?.response?.status >= 500) {
    message = 'Lỗi máy chủ. Vui lòng thử lại sau.'
  } else if (error?.message) {
    message = error.message
  }
  
  return <ErrorMessage message={message} onRetry={onRetry} className={className} />
}

export default ErrorBoundary 