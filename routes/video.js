import express from 'express';
import multer from 'multer';
import { SendVideo, UploadVideo } from '../controllers/video.js'; 
import Validate from '../middleware/validate.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
	cb(null, 'videos/');
  },
  filename: (req, file, cb) => {
	const uniqueName = `${Date.now()}-${file.originalname}`;
	cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.get('/video/:filename', SendVideo);

router.post('/video', upload.single('video'), UploadVideo);

export default router;