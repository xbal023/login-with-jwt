import express from 'express';
import { getAllUser, RegUser, LogUser } from '../models/Controlers/userControl.js';
import { verifyToken } from '../models/middleware/Verify-token.js'
import { refreshToken, Logout } from '../models/Controlers/refreshToken.js'
const router = express.Router();

router.get('/user', verifyToken, getAllUser);
router.post('/user', RegUser);
router.post('/login', LogUser);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;