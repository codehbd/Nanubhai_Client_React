import { Heart, ShoppingBag } from "lucide-react";
import { useGetMyOrdersQuery } from "../../../redux/features/order/orderApiSlice";
import { getToken } from "../../../storage/local-storage";

export default function QuickStatus() {
  const token = getToken();
  const { data: dataOrders } = useGetMyOrdersQuery({ token });
  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-black! mb-4">Quick Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-md text-center">
          <ShoppingBag className="h-6 w-6 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-black">{dataOrders?.total}</p>
          <p className="text-sm text-gray-600">Orders</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md text-center">
          <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-black">{0}</p>
          <p className="text-sm text-gray-600">Wishlist</p>
        </div>
      </div>
    </div>
  );
}
