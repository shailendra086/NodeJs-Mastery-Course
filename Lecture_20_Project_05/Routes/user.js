import express from 'express';
import {register,userLogin}  from '../Controllers/user.js';
const router = express.Router();


//register route of the user
// POST /api/user/register
router.post('/register',register);
//login route of the user
// POST /api/user/login
router.post('/login',userLogin);



//export
export default router;