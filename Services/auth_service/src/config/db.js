import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/config/database.sqlite',
    logging: false,
})

export default sequelize;