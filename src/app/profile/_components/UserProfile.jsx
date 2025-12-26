import { useGetAllShippingAddressesQuery } from "../../../redux/features/shippingAddress/shippingAddressApiSlice";
import { getToken } from "../../../storage/local-storage";
import UserProfileForm from "./UserProfileForm";

export default function UserProfile() {
  const token = getToken();
  const { data: dataAddress } = useGetAllShippingAddressesQuery(token);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Client-side form + interactivity */}
      <UserProfileForm shippingAddresses={dataAddress?.addresses} />
    </div>
  );
}
