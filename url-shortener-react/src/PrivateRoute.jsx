import { Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
export default function PrivateRoute({ children, publicPage }) {
  const { token } = useAuthContext();
  if (publicPage) {
    return token ? <Navigate to="/dashboard" /> : children;
  }
  return !token ? <Navigate to="/" /> : children;
}
