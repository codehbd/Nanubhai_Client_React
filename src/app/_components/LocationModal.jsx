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

  const divisions = [
    { label: "Barishal", value: "Barishal" },
    { label: "Chattogram", value: "Chattogram" },
    { label: "Dhaka", value: "Dhaka" },
    { label: "Khulna", value: "Khulna" },
    { label: "Mymensingh", value: "Mymensingh" },
    { label: "Rajshahi", value: "Rajshahi" },
    { label: "Rangpur", value: "Rangpur" },
    { label: "Sylhet", value: "Sylhet" },
  ];

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationVal(value);

    if (value) {
      localStorage.setItem("location", value);
      dispatch(setLocation({ currentLocation: value }));
      updateQuery({ location: value });
      dispatch(closeLocationModal());
    }
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

      <select
        value={locationVal}
        onChange={handleLocationChange}
        className="w-full border outline-none rounded-lg p-2 mb-4"
      >
        <option value="">-- Select Location --</option>
        {divisions.map((division) => (
          <option key={division.value} value={division.value}>
            {division.label}
          </option>
        ))}
      </select>
    </Modal>
  );
}
