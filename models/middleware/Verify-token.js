import jsontoken from 'jsonwebtoken';
import { ball } from '../settings/conf.js';


export const verifyToken = (req, res, next) => {
  const authHeader = req.header['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jsontoken.verify(token, ball.secret, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.email = decoded.email;
    next();
  });
}