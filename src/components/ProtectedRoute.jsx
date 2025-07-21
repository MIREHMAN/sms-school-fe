import React, { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  const userRole = user?.role?.toLowerCase();
  const isAuthorized = user && (!allowedRoles || allowedRoles.includes(userRole));

  useEffect(() => {
    if (!isLoading && !isAuthorized) {
      navigate('/login');
    }
  }, [isAuthorized, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!isAuthorized) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
