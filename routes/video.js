import express from 'express';
import multer from 'multer';
import { DeleteVideo, EditVideo, GetAllVideos, SendVideo, UploadVideo } from '../controllers/video.js'; 
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

router.get('/video', GetAllVideos);

router.get('/video/:filename', SendVideo);

router.put('/video/:id', upload.none(), EditVideo);

router.post('/video', upload.single('video'), UploadVideo);

router.delete('/video/:id', DeleteVideo)

export default router;