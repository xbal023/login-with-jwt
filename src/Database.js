import { Sequelize } from 'sequelize';

const db = new Sequelize('db_users', 'root', '1234', {
  host: 'localhost',
  dialect:'mysql',
});

export default db;