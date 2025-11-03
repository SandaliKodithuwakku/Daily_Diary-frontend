import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (userData) => api.post('/users/login', userData);

// Diary APIs
export const getAllDiaries = () => api.get('/diary');
export const getDiaryById = (id) => api.get(`/diary/${id}`);
export const createDiary = (diaryData) => api.post('/diary', diaryData);
export const updateDiary = (id, diaryData) => api.put(`/diary/${id}`, diaryData);
export const deleteDiary = (id) => api.delete(`/diary/${id}`);

export default api;