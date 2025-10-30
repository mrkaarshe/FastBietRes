import express from 'express'
import { createContact, deleteContact, getContacts } from '../controllers/contactController.js';
const router = express.Router()



router.get('/contact',getContacts)
router.post('/contact',createContact)
router.delete('/contact/:id', deleteContact);

export default router