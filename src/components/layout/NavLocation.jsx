import { openLocationModal } from "../../redux/features/location/locationSlice";
import { Locate, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function NavLocation() {
  const { currentLocation } = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const locationMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationMenuRef.current &&
        !locationMenuRef.current.contains(event.target) &&
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
    <div className="relative" ref={locationMenuRef}>
      <button
        className="p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
        aria-label="User menu"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        <MapPin className="h-7 w-7 text-black" strokeWidth={2} />
      </button>

      {/* User dropdown menu */}
      {showUserMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <p
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setShowUserMenu(false)}
          >
            {currentLocation ? currentLocation : "No Location"}
          </p>
          <button
            onClick={() => dispatch(openLocationModal())}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <div className="flex items-center">
              <Locate className="h-4 w-4 mr-2" />
              <span>Change Location</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
