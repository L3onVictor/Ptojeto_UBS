import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

app.use(cors());
app.use(express.json());

// Proxy manual via axios para /register
app.post('/api/auth/register', async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/auth/register`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { error: 'Erro ao registrar' };
    res.status(status).json(data);
  }
});

// Proxy manual via axios para /login
app.post('/api/auth/login', async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/auth/login`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { error: 'Erro ao autenticar' };
    res.status(status).json(data);
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'API Gateway rodando com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`API Gateway rodando na porta ${PORT}`);
});
