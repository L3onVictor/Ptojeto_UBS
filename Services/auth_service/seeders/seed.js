import sequelize from '../src/config/db.js';
import User from '../src/models/users.js';
import bcrypt from 'bcrypt';

async function seed() {
  try {
    await sequelize.sync();

    const hashedPassword = await bcrypt.hash('123456', 10);

    await User.create({
      name: 'Usuário Teste',
      email: 'teste@teste.com',
      cpf: '12345678900',
      password: hashedPassword
    });

    console.log('Seed finalizado com sucesso!');
    process.exit(0); 
  } catch (error) {
    console.error('Erro ao executar o seed:', error);
    process.exit(1);
  }
}
/*
async function deleteUser(id) {
  const deletedUserCount = await User.destroy({
    where: { id }
  });
}

deleteUser(6) 
*/

seed();
