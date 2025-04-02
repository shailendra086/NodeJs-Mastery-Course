import express from 'express';
import {  createContact ,getContact} from '../Controllers/contact.js';


const router = express.Router();
//contact Route

router.post('/new',createContact);
router.get('/get',getContact);

export default router;