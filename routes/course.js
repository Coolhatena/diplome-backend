import express from 'express';
import { GetAllCourses, GetTeacher, UpdateCourse, UploadCourse } from '../controllers/course.js';

const router = express.Router();

router.post('/courses', UploadCourse);

router.post('/courses/:id', UpdateCourse);

router.get('/courses', GetAllCourses);

router.get('/courses/teacher/:id', GetTeacher);

export default router;