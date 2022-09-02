import express from 'express';
import db from './src/Database.js';
import User from './models/user.js';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import cors from 'cors'
import { ball } from './models/settings/conf.js';
const app = express();

/***CONFIG DATABASE MYSQL***/
try {
  await db.authenticate();
  /*
  PERINTAH KETIKA DI DATABASE BELOM ADA TABLE
  BOLEH MENGHIDUPKAN INI
  
  await User.sync();
  */
  console.log('berhasil koneksi ke database');
} catch(err) {
  console.error(err);
}

/***RENDERING HTML***/
app.get('/', (req, res) => {
  res.send('app berjalan disini');
});

/****MIDDLEWARES****/
app.use(cors({ credential: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(router);
app.use(express.json());

/****PORT****/
app.listen(ball.port, () => {
  console.log('app berjalan');
});