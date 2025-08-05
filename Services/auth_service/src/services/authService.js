// src/services/authService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import { Op } from 'sequelize';

const SALT_ROUNDS = 10; // para bcrypt
const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

// Cadastrar usuário
async function registerUser({ name, email, cpf, password }) {
  // Verificar se email ou cpf já existem
  const exists = await User.findOne({
    where: { 
      [Op.or]: [{ email }, { cpf }]
    }
  });
  if (exists) throw new Error('Email ou CPF já cadastrado');

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Criar usuário no banco
  const user = await User.create({
    name,
    email,
    cpf,
    password: hashedPassword,
  });

  // Retorna dados sem a senha
  const { password: _, ...userData } = user.toJSON();
  return userData;
}

// Login usuário
async function loginUser(cpf, password) {
  const user = await User.findOne({ where: { cpf } });
  if (!user) throw new Error('Usuário não encontrado');

  // Comparar senha
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Senha incorreta');

  // Gerar token JWT
  const token = jwt.sign(
    { id: user.id, cpf: user.cpf, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return{
     token, name: user.name
  };
}

export default { registerUser, loginUser };
