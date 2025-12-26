import OrderList from "./order/OrderList";
import NoData from "../../../components/NoData";
import ErrorMessage from "../../../components/ErrorMessage";
import OrderFilter from "./order/OrderFilter";
import { useGetMyOrdersQuery } from "../../../redux/features/order/orderApiSlice";
import { getToken } from "../../../storage/local-storage";

function LoadingSkeleton() {
  return (
    <div className="divide-y divide-gray-200">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="p-4 animate-pulse">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex flex-col mb-2 sm:mb-0">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-28 bg-gray-200 rounded" />
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <div className="h-3 w-16 bg-gray-200 rounded" />
                <div className="h-3 w-12 bg-gray-200 rounded" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
              <div className="h-5 w-5 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Main component
export default function MyOrders({ page, status, search }) {
  const limit = 5;
  let content = null;
  const token = getToken();
  const {
    data: dataOrders,
    isLoading,
    isError,
    error,
  } = useGetMyOrdersQuery({ token, page, limit, status, search });

  if (isLoading) {
    content = <LoadingSkeleton />;
  } else if (isError) {
    content = <ErrorMessage message={error?.message} />;
  } else if (dataOrders?.orders?.length === 0) {
    content = <NoData message="No orders found." />;
  } else {
    content = (
      <OrderList
        orders={dataOrders?.orders}
        total={dataOrders?.total}
        limit={limit}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-linear-to-r from-gray-800 to-black p-6 text-white">
        <h2 className="text-2xl font-bold">My Orders</h2>
        <p className="text-gray-300">View and track your order history</p>
      </div>

      {/* Filters */}
      <OrderFilter />

      {content}
    </div>
  );
}
