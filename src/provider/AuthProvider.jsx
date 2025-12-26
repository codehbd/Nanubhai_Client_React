import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetUserProfileQuery } from "../redux/features/auth/authApiSlice";
import { userLoggedIn, userLoggedOut } from "../redux/features/auth/authSlice";
import { getToken } from "../storage/local-storage";
import Loading from "../components/Loading";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const token = getToken();
  const [initialized, setInitialized] = useState(false); // 🧠 to control first render

  const { data, isLoading, isError, isSuccess } = useGetUserProfileQuery(
    undefined,
    { skip: !token }
  );

  useEffect(() => {
    if (!token) {
      dispatch(userLoggedOut());
      setInitialized(true);
      return;
    }

    if (isSuccess && data?.user) {
      dispatch(userLoggedIn({ user: data.user }));
      setInitialized(true);
    } else if (isError) {
      dispatch(userLoggedOut());
      setInitialized(true);
    }
  }, [isSuccess, isError, data, token, dispatch]);

  // ⏳ Block routes until AuthProvider finishes initializing
  if ((token && isLoading) || !initialized) {
    return <Loading />;
  }

  return children;
}
