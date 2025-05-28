import Course from '../models/Course.js';

export const UploadCourse = async (req, res) => {
  try {
    const { title, description, imageUrl, userId } = req.body;

    const course = new Course({ title, description, imageUrl, userId });
    await course.save();

    res.status(201).json({ message: 'Course uploaded successfully', video: course });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload course', message: error.message });
  }
};

export const GetAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses', message: error.message });
  }
};