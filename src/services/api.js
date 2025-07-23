import axios from 'axios';

// API Base URL - reads from .env file
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor - adds JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handles responses and errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    
    // If unauthorized, redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  refreshToken: () => api.post('/auth/refresh'),
  logout: () => api.post('/auth/logout'),
};

// Jobs API calls
export const jobsAPI = {
  getJobs: (filters = {}) => api.get('/jobs', { params: filters }),
  getJobById: (id) => api.get(`/jobs/${id}`),
  getJobCategories: () => api.get('/jobs/categories'),
  getFeaturedJobs: () => api.get('/jobs/featured'),
  searchJobs: (query) => api.get('/jobs/search', { params: { q: query } }),
  createJob: (jobData) => api.post('/jobs', jobData),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
};

// Companies API calls
export const companiesAPI = {
  getCompanies: (filters = {}) => api.get('/companies', { params: filters }),
  getCompanyById: (id) => api.get(`/companies/${id}`),
  getCompanyJobs: (id) => api.get(`/companies/${id}/jobs`),
  createCompany: (companyData) => api.post('/companies', companyData),
  updateCompany: (id, companyData) => api.put(`/companies/${id}`, companyData),
};

// Applications API calls
export const applicationsAPI = {
  submitApplication: (applicationData) => api.post('/applications', applicationData),
  getUserApplications: () => api.get('/applications/user'),
  getApplicationById: (id) => api.get(`/applications/${id}`),
  updateApplicationStatus: (id, status) => api.patch(`/applications/${id}`, { status }),
  getCompanyApplications: () => api.get('/applications/company'),
  deleteApplication: (id) => api.delete(`/applications/${id}`),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (profileData) => api.put('/user/profile', profileData),
  uploadResume: (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return api.post('/user/resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getSavedJobs: () => api.get('/user/saved-jobs'),
  saveJob: (jobId) => api.post('/user/saved-jobs', { jobId }),
  unsaveJob: (jobId) => api.delete(`/user/saved-jobs/${jobId}`),
  changePassword: (passwordData) => api.post('/user/change-password', passwordData),
};

// Admin API calls (if you have admin functionality)
export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getStats: () => api.get('/admin/stats'),
};

// Export the main api instance as default
export default api;
