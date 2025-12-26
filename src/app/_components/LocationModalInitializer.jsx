import { openLocationModal } from "../../redux/features/location/locationSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function LocationModalInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("location")) {
      dispatch(openLocationModal());
    }
  }, [dispatch]);

  return null; // nothing visible, just runs effect
}
