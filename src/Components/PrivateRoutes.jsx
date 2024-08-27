import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
