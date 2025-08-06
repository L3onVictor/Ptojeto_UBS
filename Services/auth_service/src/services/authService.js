import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import { Op } from 'sequelize';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

// Cadastrar usuário
async function registerUser({ name, email, cpf, password }) {
  const exists = await User.findOne({
    where: { 
      [Op.or]: [{ email }, { cpf }]
    }
  });
  if (exists) throw new Error('Email ou CPF já cadastrado');

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    name,
    email,
    cpf,
    password: hashedPassword,
  });

  const { password: _, ...userData } = user.toJSON();
  return userData;
}

async function loginUser(cpf, password) {
  const user = await User.findOne({ where: { cpf } });
  if (!user) throw new Error('Usuário não encontrado');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Senha incorreta');

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
