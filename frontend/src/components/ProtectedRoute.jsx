import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    // Jika tidak ada token, alihkan pengguna ke halaman login
    return <Navigate to="/login" />;
  }

  // Jika ada token, tampilkan halaman yang diminta
  return children;
};

export default ProtectedRoute;