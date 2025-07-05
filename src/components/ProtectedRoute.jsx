import React, { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const userRole = user?.role?.toLowerCase();
  const isAuthorized = user && (!allowedRoles || allowedRoles.includes(userRole));

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
  }, [isAuthorized, navigate]);

  if (!isAuthorized) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
