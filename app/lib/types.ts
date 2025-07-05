// User Types
export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  full_name: string
  location: string
  children_ages: number[]
  parenting_goals: string[]
  preferences: Record<string, any>
  engagement_score?: number
  created_at: string
  updated_at?: string
}

// Authentication Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  password_confirmation: string
  first_name: string
  last_name: string
  location: string
  children_ages?: number[]
  parenting_goals?: string[]
  preferences?: Record<string, any>
}

export interface AuthResponse {
  token: string
  exp: string
  user: User
  message?: string
}

// API Response Types
export interface ApiResponse<T = any> {
  data: T
  message: string
}

export interface PaginationMeta {
  current_page: number
  per_page: number
  total_count: number
}

export interface PaginatedResponse<T = any> {
  data: T[]
  pagination: PaginationMeta
}

// Community Types
export interface Community {
  id: number
  name: string
  description: string
  location: string
  category: string
  members_count: number
  created_at: string
}

// Post Types
export interface Post {
  id: number
  title: string
  content: string
  author: {
    id: number
    name: string
    location: string
  }
  community: {
    id: number
    name: string
    category: string
  }
  created_at: string
  updated_at: string
  time_ago: string
  is_author: boolean
}

// Task Types
export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  priority: number
  priority_label: string
  due_date: string | null
  is_overdue: boolean
  is_due_soon: boolean
  days_until_due: number | null
  created_at: string
  updated_at: string
}

// Family Event Types
export interface FamilyEvent {
  id: number
  title: string
  description: string
  start_time: string
  end_time: string
  duration: string
  is_upcoming: boolean
  is_today: boolean
  created_at: string
  updated_at: string
}

// Chat Types
export interface ChatMessage {
  id: number
  content: string
  role: 'user' | 'assistant'
  session_id: string
  created_at: string
}

export interface ChatResponse {
  session_id: string
  user_message: string
  ai_response: string
  created_at: string
}

// Marketplace Types
export interface MarketplaceItem {
  id: number
  title: string
  description: string
  price: number
  category: string
  condition: string
  location: string
  seller: {
    id: number
    name: string
    location: string
    phone?: string
    email?: string
  }
  created_at: string
  images: string[]
}

// Notification Types
export interface Notification {
  id: number
  title: string
  message: string
  notification_type: string
  read: boolean
  read_at: string | null
  data: Record<string, any>
  created_at: string
  time_ago: string
}

// Dashboard Types
export interface DashboardActivity {
  type: string
  title: string
  description: string
  created_at: string
}

export interface UpcomingEvent {
  id: number
  title: string
  start_time: string
  days_until: number
}

export interface PendingTask {
  id: number
  title: string
  priority: number
  due_date: string
  days_until: number | null
}

export interface DashboardStats {
  total_communities: number
  total_posts: number
  total_users: number
  user_engagement: number
  recent_activities: DashboardActivity[]
  upcoming_events: UpcomingEvent[]
  pending_tasks: PendingTask[]
}

// Error Types
export interface ApiError {
  message: string
  errors?: string[]
  status?: number
}

// Form Types
export interface FormState {
  loading: boolean
  error: string
  success: string
}

// Common Filter Types
export interface BaseFilters {
  page?: number
  per_page?: number
  search?: string
}

export interface TaskFilters extends BaseFilters {
  status?: 'pending' | 'completed'
  priority?: 'high'
  priority_level?: number
  due_soon?: boolean
  due_date?: string
  sort?: 'priority' | 'due_date' | 'created_at'
}

export interface PostFilters extends BaseFilters {
  community_id?: number
  my_posts?: boolean
  my_communities?: boolean
  sort?: 'oldest' | 'title' | 'newest'
}

export interface EventFilters extends BaseFilters {
  upcoming?: boolean
  today?: boolean
  start_date?: string
  end_date?: string
}

export interface MarketplaceFilters extends BaseFilters {
  category?: string
  condition?: string
  min_price?: number
  max_price?: number
  location?: string
} 