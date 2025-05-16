import { Verify, VerifyRole } from '../middleware/verify.js';
import Auth from './auth.js';
import Video from './video.js';

const Router = (server) => {
	// Home route with GET method and a handler
	server.get('/diplome', (req, res) => {
		try {
			res.status(200).json({
				status: "success",
				data: [],
				message: "Welcome to Anthos Lab's Bar Inventory API homepage!"
			});
		} catch (err) {
			res.status(500).json({
				status: "error", 
				message: "Internal Server Error"
			});
		}
	})

	// Normal user route
	server.get('/diplome/user', Verify, (req, res) => {
		res.status(200).json({
			status: "success",
			message: "Welcome, User",
			user: req.user,
		})
	})

	// Admin user route
	server.get("/diplome/admin", Verify, VerifyRole, (req, res) => {
		res.status(200).json({
			status: "success",
			message: "Welcome, Admin ;)"
		});
	});

	// Auth route
	server.use('/diplome/auth', Auth);

	// Video streaming route
	server.use('/diplome/courses', Video);
};
export default Router;