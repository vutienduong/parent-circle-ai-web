interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  color?: 'blue' | 'green' | 'gray' | 'white'
  text?: string
  className?: string
}

export default function LoadingSpinner({ 
  size = 'medium', 
  color = 'blue', 
  text,
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  }

  const colorClasses = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    gray: 'border-gray-600',
    white: 'border-white'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div 
          className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]} mx-auto`}
        />
        {text && (
          <p className="mt-2 text-sm text-gray-600">{text}</p>
        )}
      </div>
    </div>
  )
}

// Full page loading component
export function FullPageLoader({ text = "Đang tải..." }: { text?: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <LoadingSpinner size="large" text={text} />
    </div>
  )
}

// Button loading component
export function ButtonLoader({ size = 'small' }: { size?: 'small' | 'medium' }) {
  return (
    <LoadingSpinner 
      size={size} 
      color="white" 
      className="inline-flex" 
    />
  )
} 