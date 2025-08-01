import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2 } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../common/Pagination';
import SearchBox from '../common/SearchBox';

const StudentList = ({ onEdit }) => {
  const [students, setStudents] = useState([]);


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://localhost:7186/api/students/GetAllStudents');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const { filteredData, searchTerm, setSearchTerm } = useSearch(students, ['fullName', 'email']);
  const {
    currentData,
    currentPage,
    totalPages,
    goToPage,
    hasNext,
    hasPrev,
  } = usePagination(filteredData, 5);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`https://localhost:7186/api/Students/DeleteStudent/${id}`);
        setStudents(prev => prev.filter(s => s.studentId !== id));
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleEdit = async (student) => {
    try {
      const response = await axios.get(`https://localhost:7186/api/students/GetStudentById/${student.studentId}`);
      onEdit(response.data);
    } catch (error) {
      console.error('Error fetching student by ID:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Students</h2>
          <div className="w-64 student_search">
            <SearchBox
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search students..."
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 student_table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((student) => (
              <tr key={student.studentId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{student.fullName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{student.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {student.courses?.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {student.courses.map((course, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {course.courseName}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">No courses enrolled</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2 student_edit">
                    <button
                      onClick={() => handleEdit(student)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(student.studentId)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      )}
    </div>
  );
};

export default StudentList;
