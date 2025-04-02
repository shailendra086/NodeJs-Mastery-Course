import express from 'express';
import {  createContact ,getContact, getContactById,updateContact,deleteContact,getContactByUserId} from '../Controllers/contact.js';
import { isAuthenticated } from '../Middlewares/Auth.js';

const router = express.Router();
//contact Route

router.post('/new',isAuthenticated,createContact);
router.get('/get',getContact);
router.get('/:id',getContactById);
router.put('/:id',isAuthenticated,updateContact);
router.delete('/:id',isAuthenticated,deleteContact);
//get contact by id
router.get('/userid/:id',getContactByUserId)
export default router;