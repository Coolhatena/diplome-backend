import express from 'express';
import { GetAllCourses, UploadCourse } from '../controllers/course.js';

const router = express.Router();

router.post('/courses', UploadCourse);

router.get('/courses', GetAllCourses);

export default router;