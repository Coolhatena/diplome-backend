import express from 'express';
import { Register, Login, Logout, forgotPassword } from '../controllers/auth.js';
import Validate from '../middleware/validate.js';
import { check } from 'express-validator';

const router = express.Router();

// Register route - POST
router.post(
	'/register',
	check('email')
		.isEmail()
		.withMessage('Enter a valid email address')
		.normalizeEmail(),
	check('first_name')
		.not()
		.isEmpty()
		.withMessage('Your first name is required')
		.trim()
		.escape(),
	check('last_name')
		.not()
		.isEmpty()
		.withMessage('Your last name is required')
		.trim()
		.escape(),
	check('password')
		.notEmpty()
		.isLength({ min: 1 })
		.withMessage('Your password must be at least 8 characters long'),
	check('phone')
		.notEmpty()
		.withMessage('Your phone number is required'),
	Validate,
	Register	
);

// Login Route - POST
router.post(
	'/login',
	check("email")
		.isEmail()
		.withMessage("Enter a valid email address")
		.normalizeEmail(),
	check("password").not().isEmpty(),
	Validate,
	Login
);

// Logout Route - GET
router.get('/logout', Logout);

// Forgot password Route - POST
router.post("/forgot-password", forgotPassword);

export default router;