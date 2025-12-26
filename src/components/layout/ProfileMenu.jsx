import { LogOut, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/features/auth/authApiSlice";
import { userLoggedOut } from "../../redux/features/auth/authSlice";
import { apiSlice } from "../../redux/features/apiSlice";
import { getImageUrl } from "../../utils";
import { getToken, removeToken } from "../../storage/local-storage";

export default function ProfileMenu() {
  const [logout] = useLogoutMutation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getToken();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const handleLogout = async () => {
    try {
      await logout(token).unwrap();
      removeToken();
      dispatch(userLoggedOut());
      // Clear RTK Query cache completely
      dispatch(apiSlice.util.resetApiState());
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        showUserMenu
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);
  return (
    <div className="relative" ref={userMenuRef}>
      <button
        className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
        aria-label="User menu"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        {user?.image ? (
          <img
            src={getImageUrl(user.image)}
            alt="User"
            className="h-7 w-7 rounded-full"
          />
        ) : (
          <User className="h-7 w-7 text-black" strokeWidth={2} />
        )}
      </button>

      {/* User dropdown menu */}
      {showUserMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          {user ? (
            <>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowUserMenu(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setShowUserMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </div>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowUserMenu(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowUserMenu(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
