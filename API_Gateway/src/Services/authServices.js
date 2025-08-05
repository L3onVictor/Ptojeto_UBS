import axios from 'axios';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001'; // Porta do auth_service

export async function login(data) {
  return axios.post(`${AUTH_SERVICE_URL}/login`, data);
}

export async function register(data) {
  return axios.post(`${AUTH_SERVICE_URL}/register`, data);
}
