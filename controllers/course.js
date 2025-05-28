import Course from '../models/Course.js';

export const UploadCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    const course = new Course({ title, description });
    await course.save();

    res.status(201).json({ message: 'Course uploaded successfully', video: course });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload course', message: error.message });
  }
};