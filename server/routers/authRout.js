import express from 'express'
import { isAuthenticated, login, Logout, register, resetPassword, sendResetPasswordOtp } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
import { sendverificationCode, verifyEmail } from '../controllers/authController.js';
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Auth route is working');
});


router.post('/register', register);
router.post('/login',login)
router.post('/logout', Logout)
router.post('/send-verify-opt', userAuth,sendverificationCode);
router.post('/verify-acount', userAuth,verifyEmail);
router.get('/is-auth', userAuth,isAuthenticated);
router.post('/send-reset-opt',sendResetPasswordOtp);
router.post('/reset-password',resetPassword);





export default router;