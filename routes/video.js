import express from 'express';
import { SendVideo } from '../controllers/video.js'; 
import Validate from '../middleware/validate.js';

const router = express.Router();

router.get('/video/:filename', SendVideo);

export default router;