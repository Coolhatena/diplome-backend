import express from 'express';
import { GetAllCourses, UpdateCourse, UploadCourse } from '../controllers/course.js';

const router = express.Router();

router.post('/courses', UploadCourse);

router.post('/courses/:id', UpdateCourse);

router.get('/courses', GetAllCourses);

export default router;