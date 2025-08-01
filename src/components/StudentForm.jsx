import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const StudentForm = ({ editingStudent, onSuccess, onCancel }) => {
  const isEditMode = !!editingStudent;

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      dateOfBirth: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      dateOfBirth: Yup.date().required('Date of birth is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isEditMode) {
          await axios.put(`https://localhost:7186/api/students/UpdateStudent/${editingStudent.studentId}`, {
            studentId: editingStudent.studentId,
            fullName: values.fullName,
            email: values.email,
            dateOfBirth: values.dateOfBirth
          });
        } else {
          await axios.post(`https://localhost:7186/api/students/AddStudent`, values);
        }
        resetForm();
        onSuccess();
      } catch (error) {
        console.error('Error saving student:', error);
      }
    }
  });

  useEffect(() => {
    if (editingStudent) {
      formik.setValues({
        fullName: editingStudent.fullName || '',
        email: editingStudent.email || '',
        dateOfBirth: editingStudent.dateOfBirth?.substring(0, 10) || ''
      });
    }
  }, [editingStudent]);

  return (
    <form onSubmit={formik.handleSubmit} className="p-4 bg-white rounded shadow-md student_form">
      <h2 className="text-xl mb-4">{isEditMode ? 'Edit Student' : 'Add Student'}</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
          <p className="text-red-500 text-sm">{formik.errors.dateOfBirth}</p>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditMode ? 'Update' : 'Add'} Student
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
