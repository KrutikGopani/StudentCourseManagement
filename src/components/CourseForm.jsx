
import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = ({ onCourseCreated }) => {
  const [formData, setFormData] = useState({ courseName: '', description: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.courseName || !formData.description) {
      setError('Both fields are required');
      return;
    }

    try {
      await axios.post('https://localhost:7186/api/Courses/CreateCourse', formData);
      setFormData({ courseName: '', description: '' });
      onCourseCreated(); // Refresh course list
    } catch (err) {
      console.error(err);
      setError('Failed to create course');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-8 border border-gray-200 course_form">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Course</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Course
        </button>
      </div>
    </form>
  );
};

export default CourseForm;