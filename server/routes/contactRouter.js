import express from 'express'
import { createContact, getContacts } from '../controllers/contactController.js';
const router = express.Router()



router.get('/contact',getContacts)
router.post('/contact',createContact)


export default router