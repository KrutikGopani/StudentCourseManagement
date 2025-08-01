import React, { useState } from 'react';
import { BookOpen, Users, UserCheck, Plus } from 'lucide-react';
import StudentList from './components/StudentList';
import CourseList from './components/CourseList';
import EnrollmentForm from './components/EnrollForm';
import StudentForm from './components/StudentForm';

export default function App() {
  const [activeTab, setActiveTab] = useState('students');
  const [editingStudent, setEditingStudent] = useState(null);

  const tabs = [
    { id: 'students', label: 'Students', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'enrollment', label: 'Enrollment', icon: UserCheck },
    { id: 'add-student', label: 'Add Student', icon: Plus }
  ];

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setActiveTab('add-student');
  };

  const handleStudentFormSuccess = () => {
    setEditingStudent(null);
    setActiveTab('students');
  };

  const handleCancel = () => {
    setEditingStudent(null);
    setActiveTab('students');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentList onEdit={handleEditStudent} />;
      case 'courses':
        return <CourseList />;
      case 'enrollment':
        return <EnrollmentForm onSuccess={() => console.log('Enrollment successful')} />;
      case 'add-student':
        return (
          <StudentForm
            editingStudent={editingStudent}
            onSuccess={handleStudentFormSuccess}
            onCancel={handleCancel}
          />
        );
      default:
        return <StudentList onEdit={handleEditStudent} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 border">
      
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Student & Course Manager</h1>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 tab_row">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id !== 'add-student') setEditingStudent(null);
                  }}
                  className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${isActive
                      ? 'border-blue-500 text-blue-600 active'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <Icon size={16} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="px-4 sm:px-6 lg:px-8 py-8">{renderContent()}</main>
    </div>
  );
}
