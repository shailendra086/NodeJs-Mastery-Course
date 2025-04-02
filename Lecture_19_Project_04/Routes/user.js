import express from 'express';
import { login, register } from '../Controllers/user.js';

const router = express.Router();

//user Route
//user Route
//@api name : - user Register 
//@api method : - POST
//@api endpoint : - /api /user/register 
router.post('/register',register);
router.post('/login',login);
export default router;