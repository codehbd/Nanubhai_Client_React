import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    const last = localStorage.getItem("last_url") || "/";
    localStorage.removeItem("last_url");
    return <Navigate to={last} replace />;
  }

  return children;
}
