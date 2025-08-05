import axios from 'axios'

const AUTH_SERVICE_URL = 'http://localhost:3001' // Porta do auth_service

const authController = {
  async login(req, res) {
    try {
      const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body)
      res.status(response.status).json(response.data)
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data)
      } else {
        res.status(500).json({ error: 'Erro ao comunicar com o serviço de autenticação' })
      }
    }
  },

  async register(req, res) {
    try {
      const response = await axios.post(`${AUTH_SERVICE_URL}/register`, req.body)
      res.status(response.status).json(response.data)
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data)
      } else {
        res.status(500).json({ error: 'Erro ao comunicar com o serviço de autenticação' })
      }
    }
  }
}

export default authController
