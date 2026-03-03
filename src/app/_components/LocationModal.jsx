import Modal from "../../components/modal/Modal";
import {
  closeLocationModal,
  setLocation,
} from "../../redux/features/location/locationSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useUpdateQuery } from "../../hooks/useUpdateQuery";

export default function LocationModal() {
  const dispatch = useDispatch();
  const updateQuery = useUpdateQuery();
  const { isLocationModalOpen } = useSelector((state) => state.location);

  const [locationVal, setLocationVal] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const fetchDivisions = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/shipping/divisions`);
      const data = await res.json();
      if (data.success) {
        setDivisions(data.divisions);
      }
    } catch (error) {
      console.error("Error fetching divisions", error);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  const updateLocationVal = (value) => {
    setLocationVal(value);

    if (value) {
      localStorage.setItem("location", value);
      dispatch(setLocation({ currentLocation: value }));
      updateQuery({ location: value });
      dispatch(closeLocationModal());
    }
  };

  const handleLocationChange = (e) => {
    updateLocationVal(e.target.value);
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          );
          const data = await res.json();

          let foundDivision = "";
          const possibleNames = [
            data.city,
            data.principalSubdivision,
            data.locality,
          ].filter(Boolean);

          for (const division of divisions) {
            const divName = division.value.toLowerCase().replace(" division", "");
            const match = possibleNames.some((name) =>
              name.toLowerCase().includes(divName)
            );

            // Handle alternative names / logic
            const isChattogram =
              divName === "chattogram" &&
              possibleNames.some((name) =>
                name.toLowerCase().includes("chittagong")
              );

            if (match || isChattogram) {
              foundDivision = division.value;
              break;
            }
          }

          if (foundDivision) {
            updateLocationVal(foundDivision);
          } else {
            // Fallback if not found in division list
            updateLocationVal("Insite City");
          }
        } catch (err) {
          setLocationError("Failed to get location from coordinates");
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setLocationError("Unable to retrieve your location");
        setIsLoading(false);
      }
    );
  };

  // Pre-fill dropdown with saved location (if exists)
  useEffect(() => {
    const saved = localStorage.getItem("location");
    if (!saved) return;

    const currentQuery = new URLSearchParams(window.location.search);
    const currentLocation = currentQuery.get("location");

    if (currentLocation !== saved) {
      updateQuery({ location: saved }, true); // use replace to avoid history stack pollution
    }

    setLocationVal(saved);
    dispatch(setLocation({ currentLocation: saved }));
  }, [dispatch, updateQuery]);

  return (
    <Modal
      isOpen={isLocationModalOpen}
      onClose={() => dispatch(closeLocationModal())}
    >
      <h2 className="text-xl text-black font-semibold mb-4">
        Choose Your Location
      </h2>

      <div className="flex flex-col gap-4">
        <select
          value={locationVal}
          onChange={handleLocationChange}
          className="w-full border outline-none rounded-lg p-2"
        >
          <option value="">-- Select Location --</option>
          {divisions.map((division) => (
            <option key={division.value} value={division.value}>
              {division.label}
            </option>
          ))}
        </select>

        <div className="relative flex items-center justify-center w-full">
          <div className="absolute border-t border-gray-300 w-full"></div>
          <span className="bg-white px-4 text-gray-500 text-sm z-10">or</span>
        </div>

        <button
          onClick={handleGetCurrentLocation}
          disabled={isLoading || divisions.length === 0}
          className={`w-full py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${isLoading || divisions.length === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
        >
          {isLoading ? (
            <span className="animate-spin border-2 border-blue-600 border-t-transparent rounded-full w-4 h-4"></span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
          {isLoading ? "Getting Location..." : "Use Current Location"}
        </button>

        {locationError && (
          <p className="text-red-500 text-sm text-center">{locationError}</p>
        )}
      </div>
    </Modal>
  );
}
