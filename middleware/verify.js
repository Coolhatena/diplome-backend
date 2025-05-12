import { SECRET_ACCESS_TOKEN } from '../config/index.js';
import Blacklist from '../models/Blacklist.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export async function Verify(req, res, next) {
	try {
		// Get the session cookie from request header
		const authHeader = req.headers["cookie"];
		if (!authHeader) return res.sendStatus(401);

		const cookie = authHeader.split('=')[1];
		const accessToken = cookie.split(";")[0];
		const isBlacklisted = await Blacklist.findOne({ token: accessToken });

		// If token is blacklisted, ask for re-auth
		if (isBlacklisted) {
			return res.status(401).json({
				message: "This session has expired, please login"
			})
		}

		// Verify jwt for tampering or expiration
		jwt.verify(cookie, SECRET_ACCESS_TOKEN, async (err, decoded) => {
			// Return status 401 if theres a problem with the token
			if (err) {
				return res.status(401).json({ message: "This session has expired. Please login" });
			}

			const { id } = decoded;
			const user = await User.findById(id);
			const { password, ...data} = user._doc; // Get the user object without the password
			req.user = data;
			next();
		})
	} catch (err) {
		res.status(401).json({
			status: "error",
			code: 500,
			data: [],
			message: "Internal Server Error"
		});
	}
}

export function VerifyRole(req, res, next) {
	try {
		// Get user role
		const user = req.user;
		const { role } = user;

		if (role !== "0x88") {
			return res.status(401).json({
				status: "failed",
				message: "You are not autorized to view this page."
			});
		}
		next(); 
	} catch (err) {
		res.status(500).json({
			status: "error", 
			message: "Internal Server Error"
		});
	}

}