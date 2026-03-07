import React, { useState, useEffect } from 'react';
import UnauthorizedContent from '../components/ui/UnauthorizedContent';
import { API } from '../services/API';

/**
 * Derives permissions from user role. Extend for custom role-permission mapping.
 */
function getPermissionsFromRole(role) {
  if (!role) return [];
  if (role === 'admin') return ['*']; // admin has all
  return [role];
}

export const PermissionProtectedRoute = ({
  permission,
  children,
  fallback = (
    <div className="flex items-center justify-center min-h-screen">Loading...</div>
  ),
}) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    API.get('/auth/me')
      .then(res => {
        const user = res?.data?.user;
        const permissions = getPermissionsFromRole(user?.role);
        const allowed =
          permissions.includes('*') || permissions.includes(permission);
        setHasPermission(allowed);
      })
      .catch(() => setHasPermission(false))
      .finally(() => setLoading(false));
  }, [permission]);

  if (loading) return fallback;
  if (!hasPermission) return <UnauthorizedContent />;
  return children;
};

export default PermissionProtectedRoute;
