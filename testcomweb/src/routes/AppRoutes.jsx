import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import StudentPage from '../pages/StudentPage';
import TeacherPage from '../pages/TeacherPage';
import { useAuth } from '../auth/AuthContext';

export const AppRoutes = () => {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student" element={currentUser?.role === 'student' ? <StudentPage /> : <Navigate to="/" />} />
      <Route path="/teacher" element={currentUser?.role === 'teacher' ? <TeacherPage /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
