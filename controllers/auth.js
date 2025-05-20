import User from '../models/User.js';
import Blacklist from '../models/Blacklist.js';
import bycrypt from 'bcrypt';



/**
 * @route POST /api/auth/register
 * @desc Resgister a new user
 * @access Public
*/

export async function Register(req, res) {
	// Get required data from request body
	const { first_name, last_name, email, password, phone, role: user_role } = req.body;
	console.log({ first_name, last_name, email, password, phone, user_role });
	try {
		const newUser = new User({ first_name, last_name, email, password, phone, role: user_role });
		
		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				status: 'error',
				data: [],
				message: 'Email already in use.'
			});
		}

		// Save new user into db
		const savedUser = await newUser.save();
		const {role, ...user_data} = savedUser._doc;
		res.status(200).json({
			status: 'success',
			user: user_data,
			message: 'Registration completed succesfully'
		});
	} catch (err) {
		console.log(err)
		res.status(500).json({
			status: 'error',
			code: 500,
			data: [],
			message: 'Internal server error.'
		});
	} 
	res.end();
}

/**
 * @route POST /diplome/auth/login
 * @desc Logs in a user
 * @access Public
 */
export async function Login(req, res) {
	const { email } = req.body;
	try {
		// Check if user already exists
		const user = await User.findOne({ email }).select('+password');
		if (!user) {
			return res.status(401).json({
				status: "failed",
				data: [],
				message: "Email o contraseña invalidos, por favor intentelo de nuevo."
			});
		}

		// Check if password is correct
		const isPasswordValid = await bycrypt.compare(`${req.body.password}`, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				status: "failed",
				data: [],
				message: "Email o contraseña invalidos, por favor intentelo de nuevo."
			});
		}

		let options = {
			maxAge: 20 * 60 * 1000, // Expires in 20 minutes
			httpOnly: true, // The cookie cant be accessed using `document.cookie`
			secure: false, // true: The token can only be sent in https conections
			sameSite: "Lax",
		};
		const { password, ...user_data} = user._doc;
		const token = user.generateAccessJWT();
		res.cookie("SessionID", token, options);
		res.status(200).json({
			status: "success",
			user: user_data,
			message: "You have successfully logged in."
		});

		// Return user info, except password
		// const { password, ...user_data} = user._doc;
		// res.status(200).json({
		// 	status: "success",
		// 	data: [user_data],
		// 	message: "You have sucessfully logged in",
		// });
	} catch (error) {
		res.status(500).json({
			status: "error",
			data: [user_data],
			message: "Internal Server Error",
		});
	}
	res.end();
}

/**
 * @route GET /diplome/auth/logout
 * @desc Logs out a user
 * @access Public
 */
export async function Logout(req, res) {
	try {
		const authHeader = req.headers["cookie"];
		console.log('Authheader:')
		console.log(authHeader)
		if (!authHeader) return res.sendStatus(401);

		const cookie = authHeader.split('=')[1];
		const accessToken = cookie.split(';')[0];
		const isBlacklisted = await Blacklist.findOne({ token: accessToken });

		if (isBlacklisted) return res.status(204);

		// Blacklist token and delete it from client's cookies
		const newBlacklist = new Blacklist({
			token: accessToken,
		});
		await newBlacklist.save();

		res.setHeader('Clear-Site-Data', '"cookies"');
		res.status(200).json({ message: 'You are logged out!' });

	} catch (err) {
		res.status(500).json({
			status: "error",
			data: [user_data],
			message: "Internal Server Error",
		});
	}
	res.end();
}

/**
 * @route GET /diplome/auth/forgot-password
 * @desc Logs out a user
 * @access Public
 */
export async function passwordRecovery(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: "15m",
  });

  const resetLink = `http://localhost/diplome/auth/forgot-password/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail", // If this doesnt work, use smtp
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Soporte" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Recupera tu contraseña",
    html: `<p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
           <a href="${resetLink}">${resetLink}</a>`,
  });

  res.json({ message: "Correo enviado" });
}