import { Navigate } from 'react-router-dom';

/**
 * PrivateRoute - protects routes requiring authentication.
 * Uses server-side auth (cookie) - no localStorage.
 * When isAuthenticated/loading are provided, enforces auth. Otherwise passthrough.
 */
const PrivateRoute = ({
  children,
  isAuthenticated,
  loading,
  loginPath = '/login',
}) => {
  // Optional auth: when props not passed, render children (e.g. public site layout)
  const authEnabled = typeof isAuthenticated === 'boolean';
  if (!authEnabled) return children;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to={loginPath} replace />;
  }
  return children;
};

export default PrivateRoute;
