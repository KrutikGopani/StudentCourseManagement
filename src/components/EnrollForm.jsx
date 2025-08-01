import React, { useState, useEffect } from 'react';

const EnrollmentForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
  });

  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, courseRes] = await Promise.all([
          fetch('https://localhost:7186/api/students/GetAllStudents'),
          fetch('https://localhost:7186/api/Courses/GetAllCourses')
        ]);
        const studentsData = await studentRes.json();
        const coursesData = await courseRes.json();
        setStudents(studentsData);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.studentId) newErrors.studentId = 'Please select a student';
    if (!formData.courseId) newErrors.courseId = 'Please select a course';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const enrollmentData = {
      studentId: Number(formData.studentId),
      courseId: Number(formData.courseId),
      enrollmentDate: new Date().toISOString()
    };

    try {
      const response = await fetch('https://localhost:7186/api/studentcourses/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrollmentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Enrollment failed:', errorData);
        alert('Enrollment failed: ' + (errorData?.title || 'Unknown error'));
        return;
      }


      setFormData({ studentId: '', courseId: '' });
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting enrollment:', error);
    }
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Enroll Student in Course</h2>
      <div className="space-y-4 enroll_form">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
          <select
            value={formData.studentId}
            onChange={(e) => handleSelectChange('studentId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.studentId} value={student.studentId}>
                {student.fullName} ({student.email})
              </option>
            ))}
          </select>
          {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <select
            value={formData.courseId}
            onChange={(e) => handleSelectChange('courseId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.courseId} value={course.courseId}>
                {course.courseName}
              </option>
            ))}
          </select>
          {errors.courseId && <p className="text-red-500 text-sm mt-1">{errors.courseId}</p>}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Enroll Student
        </button>
      </div>
    </div>
  );
};

export default EnrollmentForm;
