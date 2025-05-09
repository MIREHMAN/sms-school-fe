import React, { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
      navigate('/login');
    }
  }, [user]);

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return null;
  }

  return children;
};