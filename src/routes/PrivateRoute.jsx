import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    localStorage.setItem("last_url", location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }

  return children;
}
