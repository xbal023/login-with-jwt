import User from '../user.js';
import jsontoken from 'jsonwebtoken';
import { ball } from '../settings/conf.js'


export const getAllUser = async (req, res) => {
  try {
     let all = await User.findAll({
       attributes: ['id', 'email', 'nohp', 'ttl']
     });
     res.json(all)
  } catch (e) {
     console.log(e);
  }
};

export const RegUser = async (req, res) => {
  const { fristname, lastname, ttl, email, nohp, password, confpass } = req.body
  if (confpass !== password) return res.status(400).json({ msg: 'Password anda tidak cocok' });
  try {
    await User.create({
      fristname: fristname,
      lastname: lastname,
      ttl: ttl,
      email: email,
      nohp: nohp,
      password: password
    });
    res.json({msg: 'Register Berhasil'});
  } catch (e) {
    console.log(e);
  }
};

export const LogUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findAll({
      where: {
        email: email
      }
  });
  if (password !== user[0].password) return res.status(400).json({msg: 'Password salah!!!'});
  const userId = user[0].id;
  const fname = user[0].firstname;
  const lname = user[0].lastname;
  const mail = user[0].email;
  const ttl = user[0].ttl
  const secret = jsontoken.sign({ userId, fname, lname, mail, ttl }, ball.secret, {
    expiresIn: '20s'
  });
  const refresh = jsontoken.sign({ userId, fname, lname, mail, ttl }, ball.refresh, {
    expiresIn: '1d'
  });
  await User.update({ expired_token: refresh }, {
    where: {
      id: userId
    }
  });
  res.cookie('Halo_bang', refresh, {
    httpOnly: true,
    maxAge: 24*60*60*1000,
    //secure: true
  });
  res.json({msg: secret})
  } catch (e) {
    res.status(404).json({msg: 'Email anda tidak ditemukan'});
  }
}