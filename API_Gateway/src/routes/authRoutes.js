import express from 'express';
import { login, register } from '../Services/authServices.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const response = await login(req.body);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Erro ao autenticar' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const response = await register(req.body);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Erro ao registrar' });
  }
});

export default router;
