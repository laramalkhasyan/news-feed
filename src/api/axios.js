import axios from 'axios';

const api = axios.create({
    baseURL: `https://newsapi.org/`
});

api.interceptors.request.use(async config => {
    config.headers = { 
        'X-Api-Key': `4720662bf00749e5983d807c8d0f2117`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      return config;
    },
    error => {
      Promise.reject(error)
});

export default api;