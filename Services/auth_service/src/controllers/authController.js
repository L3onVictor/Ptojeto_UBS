// src/controllers/authController.js

import authService from '../services/authService.js';

const register = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await authService.registerUser(userData);
    res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { cpf, password } = req.body;
    const result = await authService.loginUser(cpf, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default { register, login };
