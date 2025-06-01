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

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (userData: any) =>
    api.post('/auth/register', userData),
  
  logout: () =>
    api.post('/auth/logout'),
  
  getCurrentUser: () =>
    api.get('/users/me'),
}

// Communities API
export const communitiesAPI = {
  getAll: (params?: { location?: string; category?: string }) =>
    api.get('/communities', { params }),
  
  getById: (id: number) =>
    api.get(`/communities/${id}`),
  
  create: (communityData: any) =>
    api.post('/communities', communityData),
  
  join: (id: number) =>
    api.post(`/communities/${id}/join`),
  
  getPosts: (communityId: number) =>
    api.get(`/communities/${communityId}/posts`),
  
  createPost: (communityId: number, postData: any) =>
    api.post(`/communities/${communityId}/posts`, postData),
}

// Chat API
export const chatAPI = {
  sendMessage: (message: string, sessionId?: string) =>
    api.post('/chat/query', { message, session_id: sessionId }),
}

// Family Events API
export const familyEventsAPI = {
  getAll: () =>
    api.get('/family_events'),
  
  getById: (id: number) =>
    api.get(`/family_events/${id}`),
  
  create: (eventData: any) =>
    api.post('/family_events', eventData),
  
  update: (id: number, eventData: any) =>
    api.put(`/family_events/${id}`, eventData),
  
  delete: (id: number) =>
    api.delete(`/family_events/${id}`),
}

// Tasks API
export const tasksAPI = {
  getAll: () =>
    api.get('/tasks'),
  
  getById: (id: number) =>
    api.get(`/tasks/${id}`),
  
  create: (taskData: any) =>
    api.post('/tasks', taskData),
  
  update: (id: number, taskData: any) =>
    api.put(`/tasks/${id}`, taskData),
  
  delete: (id: number) =>
    api.delete(`/tasks/${id}`),
  
  toggleComplete: (id: number) =>
    api.patch(`/tasks/${id}`, { completed: true }),
}

// Marketplace API
export const marketplaceAPI = {
  getAll: (params?: { category?: string; condition?: string; min_price?: number; max_price?: number }) =>
    api.get('/marketplace_items', { params }),
  
  getById: (id: number) =>
    api.get(`/marketplace_items/${id}`),
  
  create: (itemData: any) =>
    api.post('/marketplace_items', itemData),
  
  update: (id: number, itemData: any) =>
    api.put(`/marketplace_items/${id}`, itemData),
  
  delete: (id: number) =>
    api.delete(`/marketplace_items/${id}`),
}

// Users API
export const usersAPI = {
  getProfile: () =>
    api.get('/users/me'),
  
  updateProfile: (userData: any) =>
    api.put('/users/me', userData),
  
  getEngagement: () =>
    api.get('/dashboard/engagement'),
}

export default api 