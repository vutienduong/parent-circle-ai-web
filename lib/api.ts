import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003'

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth token on unauthorized
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API - Updated to match backend
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/login', { email, password }),
  
  register: (userData: any) =>
    api.post('/register', userData),
  
  logout: () =>
    api.post('/logout'),
  
  getCurrentUser: () =>
    api.get('/users/me'),
}

// Password API - New
export const passwordAPI = {
  forgot: (email: string) =>
    api.post('/forgot-password', { email }),
  
  reset: (token: string, password: string, passwordConfirmation: string) =>
    api.post('/reset-password', { token, password, password_confirmation: passwordConfirmation }),
  
  change: (currentPassword: string, newPassword: string, passwordConfirmation: string) =>
    api.put('/change-password', { current_password: currentPassword, new_password: newPassword, password_confirmation: passwordConfirmation }),
}

// Profile API - New
export const profileAPI = {
  get: () =>
    api.get('/profile'),
  
  update: (userData: any) =>
    api.put('/profile', userData),
  
  delete: (password: string) =>
    api.delete('/profile', { data: { password } }),
}

// Notifications API - New
export const notificationsAPI = {
  getAll: (params?: { unread?: boolean; read?: boolean; type?: string; page?: number; per_page?: number }) =>
    api.get('/notifications', { params }),
  
  getById: (id: number) =>
    api.get(`/notifications/${id}`),
  
  markAsRead: (id: number) =>
    api.patch(`/notifications/${id}`, { mark_as_read: true }),
  
  markAsUnread: (id: number) =>
    api.patch(`/notifications/${id}`, { mark_as_unread: true }),
  
  delete: (id: number) =>
    api.delete(`/notifications/${id}`),
  
  markAllAsRead: () =>
    api.patch('/notifications/mark_all_as_read'),
  
  getUnreadCount: () =>
    api.get('/notifications/unread_count'),
}

// Communities API - Enhanced
export const communitiesAPI = {
  getAll: (params?: { location?: string; category?: string }) =>
    api.get('/communities', { params }),
  
  getById: (id: number) =>
    api.get(`/communities/${id}`),
  
  create: (communityData: any) =>
    api.post('/communities', communityData),
  
  update: (id: number, communityData: any) =>
    api.put(`/communities/${id}`, communityData),
  
  delete: (id: number) =>
    api.delete(`/communities/${id}`),
  
  join: (id: number) =>
    api.post(`/communities/${id}/join`),
  
  leave: (id: number) =>
    api.delete(`/communities/${id}/leave`),
  
  getMembers: (id: number) =>
    api.get(`/communities/${id}/members`),
}

// Posts API - Enhanced and separate from communities
export const postsAPI = {
  getAll: (params?: { 
    community_id?: number; 
    my_posts?: boolean; 
    my_communities?: boolean; 
    search?: string; 
    sort?: 'oldest' | 'title' | 'newest';
    page?: number;
    per_page?: number;
  }) =>
    api.get('/posts', { params }),
  
  getById: (id: number) =>
    api.get(`/posts/${id}`),
  
  create: (postData: any) =>
    api.post('/posts', postData),
  
  update: (id: number, postData: any) =>
    api.put(`/posts/${id}`, postData),
  
  delete: (id: number) =>
    api.delete(`/posts/${id}`),
  
  getMyPosts: (params?: { search?: string; page?: number; per_page?: number }) =>
    api.get('/posts/my_posts', { params }),
  
  getByCommunity: (communityId: number, params?: { search?: string; page?: number; per_page?: number }) =>
    api.get(`/posts/${communityId}/by_community`, { params }),
}

// Chat API - Enhanced
export const chatAPI = {
  sendMessage: (message: string, sessionId?: string) =>
    api.post('/chat/query', { message, session_id: sessionId }),
}

// Family Events API - Enhanced with filters
export const familyEventsAPI = {
  getAll: (params?: { 
    upcoming?: boolean; 
    today?: boolean; 
    start_date?: string; 
    end_date?: string; 
    search?: string; 
  }) =>
    api.get('/family_events', { params }),
  
  getById: (id: number) =>
    api.get(`/family_events/${id}`),
  
  create: (eventData: any) =>
    api.post('/family_events', { family_event: eventData }),
  
  update: (id: number, eventData: any) =>
    api.put(`/family_events/${id}`, { family_event: eventData }),
  
  delete: (id: number) =>
    api.delete(`/family_events/${id}`),
}

// Tasks API - Enhanced with filters and bulk operations
export const tasksAPI = {
  getAll: (params?: { 
    status?: 'pending' | 'completed'; 
    priority?: 'high'; 
    priority_level?: number; 
    due_soon?: boolean; 
    search?: string; 
    due_date?: string; 
    sort?: 'priority' | 'due_date' | 'created_at'; 
  }) =>
    api.get('/tasks', { params }),
  
  getById: (id: number) =>
    api.get(`/tasks/${id}`),
  
  create: (taskData: any) =>
    api.post('/tasks', { task: taskData }),
  
  update: (id: number, taskData: any) =>
    api.put(`/tasks/${id}`, { task: taskData }),
  
  delete: (id: number) =>
    api.delete(`/tasks/${id}`),
  
  toggleComplete: (id: number) =>
    api.patch(`/tasks/${id}/toggle_completed`),
  
  bulkUpdate: (taskIds: number[], action: 'complete' | 'incomplete' | 'delete') =>
    api.patch('/tasks/bulk_update', { task_ids: taskIds, action }),
}

// Marketplace API - Enhanced
export const marketplaceAPI = {
  getAll: (params?: { 
    category?: string; 
    condition?: string; 
    min_price?: number; 
    max_price?: number; 
    search?: string; 
    location?: string; 
  }) =>
    api.get('/marketplace_items', { params }),
  
  getById: (id: number) =>
    api.get(`/marketplace_items/${id}`),
  
  create: (itemData: any) =>
    api.post('/marketplace_items', { marketplace_item: itemData }),
  
  update: (id: number, itemData: any) =>
    api.put(`/marketplace_items/${id}`, { marketplace_item: itemData }),
  
  delete: (id: number) =>
    api.delete(`/marketplace_items/${id}`),
}

// Users API - Enhanced
export const usersAPI = {
  getAll: () =>
    api.get('/users'),
  
  getById: (id: number) =>
    api.get(`/users/${id}`),
  
  update: (id: number, userData: any) =>
    api.put(`/users/${id}`, { user: userData }),
  
  getProfile: () =>
    api.get('/users/me'),
  
  updateProfile: (userData: any) =>
    api.put('/users/me', { user: userData }),
}

// Dashboard API - New
export const dashboardAPI = {
  getEngagement: () =>
    api.get('/dashboard/engagement'),
  
  getStats: () =>
    api.get('/dashboard/stats'),
}

export default api 