import express from 'express';
import { UploadCourse } from '../controllers/course.js';

const router = express.Router();

router.post('/courses', UploadCourse);

export default router;