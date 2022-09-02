import User from '../user.js';
import jsontoken from 'jsonwebtoken';
import { ball } from '../settings/conf.js';

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.Halo_bang;
    if (!refreshToken) return res.sendStatus(401);
    const user = await User.findAll({
      where: {
        expired_token: refreshToken
      }
    });
    if (!user[0]) return res.sendStatus(403);
    jsontoken.verify(refreshToken, ball.secret, (err, decoded) => {
      if (err) return res.sendStatus(403)
      const userId = user[0].id;
      const fname = user[0].firstname;
      const lname = user[0].lastname;
      const email = user[0].email;
      const ttl = user[0].ttl;
      const access = jsontoken.sign({ userId, fname, lname, email, ttl }, ball.secret, {
        expiresIn: '25s'
      });
      res.json({ msg: access })
    })
  } catch (e) {
    console.log(e);
  }
}

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.Halo_bang;
      if (!refreshToken) return res.sendStatus(204);
      const user = await User.findAll({
        where: {
          expired_token: refreshToken
        }
      });
      if (!user[0]) return res.sendStatus(204);
      const userId = user[0].id;
      await User.update({ expired_token: null }, {
        where: {
          id: userId
        }
      });
      res.clearCookie({ Halo_bang });
      return res.sendStatus(200);
}