import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Hook to update query parameters (React Router).
 */
export function useUpdateQuery() {
  const navigate = useNavigate();
  const location = useLocation();

  const updateQuery = useCallback(
    (params, replace = false, basePath) => {
      const newParams = new URLSearchParams(location.search);

      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      const queryString = newParams.toString();
      const path = basePath ?? location.pathname;
      const url = queryString ? `${path}?${queryString}` : path;

      navigate(url, { replace });
    },
    [navigate, location]
  );

  return updateQuery;
}
