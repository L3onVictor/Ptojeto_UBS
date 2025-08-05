import sequelize from '../src/config/db.js';
import User from '../src/models/users.js'; // ajuste o path se necessário
import bcrypt from 'bcrypt';

async function seed() {
  try {
    // Sincroniza o banco (cria a tabela se não existir)
    await sequelize.sync(); // cuidado: isso apaga e recria as tabelas

    // Criptografa uma senha
    const hashedPassword = await bcrypt.hash('123456', 10);

    // Cria um usuário de teste
    await User.create({
      name: 'Usuário Teste',
      email: 'teste@teste.com',
      cpf: '12345678900',
      password: hashedPassword
    });

    console.log('Seed finalizado com sucesso!');
    process.exit(0); // finaliza o processo
  } catch (error) {
    console.error('Erro ao executar o seed:', error);
    process.exit(1);
  }
}

seed();
