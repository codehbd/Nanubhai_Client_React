import {
  LogOut,
  Package,
  User,
  Heart,
  CreditCard,
  Settings,
} from "lucide-react";
import QuickStatus from "./QuickStatus";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../../redux/features/auth/authSlice";
import { apiSlice } from "../../../redux/features/apiSlice";
import { useLogoutMutation } from "../../../redux/features/auth/authApiSlice";

export default function DashSidebar({ activeTab }) {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const handleTabChange = (tab) => {
    navigate(`/profile?tab=${tab}`);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(userLoggedOut());
      // Clear RTK Query cache completely
      dispatch(apiSlice.util.resetApiState());
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full lg:w-1/4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => handleTabChange("profile")}
                className={`w-full flex items-center px-4 py-3 rounded-md cursor-pointer hover:text-gray-700 hover:bg-gray-100 ${
                  activeTab === "profile"
                    ? "bg-black text-white"
                    : "text-gray-700"
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                <span>My Profile</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("orders")}
                className={`w-full flex items-center px-4 py-3 rounded-md cursor-pointer hover:text-gray-700 hover:bg-gray-100 ${
                  activeTab === "orders"
                    ? "bg-black text-white"
                    : "text-gray-700"
                }`}
              >
                <Package className="h-5 w-5 mr-3" />
                <span>My Orders</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("wishlist")}
                className={`w-full flex items-center px-4 py-3 rounded-md cursor-pointer hover:text-gray-700 hover:bg-gray-100 ${
                  activeTab === "wishlist"
                    ? "bg-black text-white"
                    : "text-gray-700"
                }`}
              >
                <Heart className="h-5 w-5 mr-3" />
                <span>Wishlist</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("payment")}
                className={`w-full flex items-center px-4 py-3 rounded-md cursor-pointer hover:text-gray-700 hover:bg-gray-100 ${
                  activeTab === "payment"
                    ? "bg-black text-white"
                    : "text-gray-700"
                }`}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                <span>Payment Methods</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("settings")}
                className={`w-full flex items-center px-4 py-3 rounded-md cursor-pointer hover:text-gray-700 hover:bg-gray-100 ${
                  activeTab === "settings"
                    ? "bg-black text-white"
                    : "text-gray-700"
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Account Settings</span>
              </button>
            </li>
          </ul>

          <div className="pt-4 mt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 rounded-md cursor-pointer  text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        {/* Quick Stats */}
        <QuickStatus />
      </div>
    </div>
  );
}
