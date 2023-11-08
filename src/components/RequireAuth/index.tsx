import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface RequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const auth = useAuth();
  return auth.authenticated ? children : <Navigate to="/login" replace />;
}
