import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearch } from '../hooks/useSearch';
import { usePagination } from '../hooks/usePagination';
import SearchBox from '../common/SearchBox';
import Pagination from '../common/Pagination';
import CourseForm from './CourseForm';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const { filteredData, searchTerm, setSearchTerm } = useSearch(courses, ['courseName', 'description']);
  const { currentData, currentPage, totalPages, goToPage, hasNext, hasPrev } = usePagination(filteredData, 4);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://localhost:7186/api/Courses/GetAllCourses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleEdit = async (courseId) => {
    try {
      const response = await axios.get(`https://localhost:7186/api/Courses/GetCourseById/${courseId}`);
      setSelectedCourse(response.data); // Pass this to form
    } catch (error) {
      console.error('Error fetching course by ID:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200">

      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <CourseForm onCourseCreated={fetchCourses} selectedCourse={selectedCourse} />
      </div>
      
      <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Course List</h2>
        <div className="w-full md:w-72 course_search">
          <SearchBox
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search by course name or description..."
          />
        </div>
      </div>

      <div className="overflow-x-auto px-6 py-4 bg-gray-50">
        {currentData.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left course_table">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Course Name</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Student Count</th>
                <th className="px-4 py-3">Enrolled Students</th>
                <th className="px-4 py-3">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {currentData.map((course) => (
                <tr key={course.courseId}>
                  <td className="px-4 py-3 font-medium text-indigo-700">{course.courseName}</td>
                  <td className="px-4 py-3 text-gray-700">{course.description}</td>
                  <td className="px-4 py-3">{course.studentCourses?.length || 0}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {course.studentCourses?.length > 0
                      ? course.studentCourses.map((s) => s.studentName || s.name).join(', ')
                      : <span className="text-gray-400">No students</span>}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(course.courseId)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 py-8">No courses found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 pb-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
        </div>
      )}
    </div>
  );
};

export default CourseList;
