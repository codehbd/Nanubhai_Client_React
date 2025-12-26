import {
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Package,
  RotateCcw,
  Truck,
  Undo2,
  X,
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";

import { getImageUrl } from "../../../../utils";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setOrderCount } from "../../../../redux/features/order/orderSlice";
import Pagination from "../../../../components/pagination/Pagination";
import { Link } from "react-router-dom";

export default function OrderList({ orders, total, limit }) {
  // State for expanded order details
  const [expandedOrderId, setExpandedOrderId] = useState(null > null);
  const dispatch = useDispatch();

  // Toggle order details expansion
  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "placed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Placed
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </span>
        );
      case "shipping":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Truck className="w-3 h-3 mr-1" />
            Shipping
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="w-3 h-3 mr-1" />
            Delivered
          </span>
        );
      case "returned":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <RotateCcw className="w-3 h-3 mr-1" />
            Returned
          </span>
        );
      case "refunded":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
            <Undo2 className="w-3 h-3 mr-1" />
            Refunded
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
            <X className="w-3 h-3 mr-1" />
            Cancelled
          </span>
        );

      default:
        return null;
    }
  };

  // set order count
  useEffect(() => {
    dispatch(setOrderCount({ count: total || 0 }));
  }, [dispatch, total]);

  return (
    <>
      {/* Orders List */}
      <div className="divide-y divide-gray-200">
        {orders?.length > 0 ? (
          orders?.map((order) => (
            <div
              key={order?._id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              {/* Order Summary */}
              <div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer"
                onClick={() => toggleOrderDetails(order?._id)}
              >
                <div className="flex flex-col mb-2 sm:mb-0">
                  <div className="flex items-center">
                    <span className="font-bold text-black">
                      {order?.orderId}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-600">
                      {dayjs(order?.createdAt).format(
                        "DD MMM YYYY, hh:mm:ss A"
                      )}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center">
                    <Package className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      {order?.orderitems?.length}
                      {order?.orderitems?.length === 1 ? "item" : "items"}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="font-medium text-black">
                      ৳{order?.totalAmount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  {getStatusBadge(order?.status)}
                  <button className="ml-4 text-gray-500 focus:outline-none">
                    {expandedOrderId === order?._id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Order Details (Expanded) */}
              {expandedOrderId === order?._id && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  {/* Order Items */}
                  <h3 className="text-lg font-medium text-black mb-3">
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {order?.orderitems.map((item) => (
                      <div
                        key={item?._id}
                        className="flex items-center p-3 border border-gray-200 rounded-md"
                      >
                        <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={
                              item?.image
                                ? getImageUrl(item?.image)
                                : "/images/product-placeholder.jpg"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 grow">
                          <Link
                            to={`/products/${item?.productId}`}
                            className="text-black font-medium hover:text-primary"
                          >
                            {item?.name}
                          </Link>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm text-gray-600">
                              Qty: {item?.quantity}
                            </span>
                            <span className="font-medium text-black">
                              ৳{item?.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping & Payment Info */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-black mb-2">
                        Shipping Information
                      </h3>
                      {order?.shippingaddress?.map((shipping) => (
                        <div
                          key={shipping?._id}
                          className="bg-gray-50 p-3 rounded-md"
                        >
                          <p className="text-gray-600">{shipping?.street}</p>
                          <p className="text-gray-600">
                            {shipping?.city},{shipping?.postCode}
                          </p>
                          <p className="text-gray-600">{shipping?.country}</p>

                          {/* {order?.trackingNumber && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm font-medium text-black">
                              Tracking Number:
                            </p>
                            <p className="text-blue-600">
                              {order.trackingNumber}
                            </p>
                          </div>
                        )} */}
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-black mb-2">
                        Payment Information
                      </h3>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Method:</span>
                          <span className="text-black">
                            {order?.paymentType}
                          </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="text-black">
                              ৳{order?.grossAmount}
                            </span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-gray-600">Shipping:</span>
                            <span className="text-black">
                              ৳{order?.shippingAmount}
                            </span>
                          </div>
                          <div className="flex justify-between mt-2 pt-2 border-t border-gray-200 font-bold">
                            <span className="text-gray-600">Total:</span>
                            <span className="text-black">
                              ৳{order?.netAmount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3 justify-end">
                    <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                      Contact Support
                    </button>
                    {order.status === "delivered" && (
                      <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none">
                        Write a Review
                      </button>
                    )}
                    {(order?.status === "processing" ||
                      order?.status === "shipping") && (
                      <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none">
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-1">
              No orders found
            </h3>
            {/* <p className="text-gray-500">
              {searchQuery || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "You haven't placed any orders yet"}
            </p> */}
          </div>
        )}
      </div>

      {/* Pagination Info */}
      <Suspense fallback={null}>
        <Pagination total={total} limit={limit} />
      </Suspense>
    </>
  );
}
