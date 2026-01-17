import React from 'react';
import UnauthorizedContent from '../components/ui/UnauthorizedContent';

export const PermissionProtectedRoute = ({
  permission,
  children,
  fallback = <div className="flex items-center justify-center min-h-screen">Loading...</div>,
}) => {
  // Get permissions from localStorage
  const storedPermissions = localStorage.getItem('userPermissions');
  const userPermissions = storedPermissions ? JSON.parse(storedPermissions) : [];

  // Simple permission check
  const hasPermission = userPermissions.includes(permission);

  if (!hasPermission) {
    return <UnauthorizedContent />;
  }

  return children;
};

export default PermissionProtectedRoute;
