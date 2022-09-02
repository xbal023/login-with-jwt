import { Sequelize } from 'sequelize';
import db from '../src/Database.js';

const { DataTypes } = Sequelize;

const User = db.define('users', {
  firstname: {
    type: DataTypes.STRING
  },
  lastname: {
    type: DataTypes.STRING
  },
  ttl: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  nohp: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  expired_token: {
    type: DataTypes.TEXT
  }
},{
    freezeTableName: true
  });

export default User
