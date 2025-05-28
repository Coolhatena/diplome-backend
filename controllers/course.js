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

export const UpdateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, userId } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, description, imageUrl, userId },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course', message: error.message });
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