import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import OrderSummery from "./OrderSummery";
import { useDispatch } from "react-redux";
import PaymentMethodIcon from "./PaymentMethodIcon";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../../../redux/features/order/orderApiSlice";
import { getToken } from "../../../storage/local-storage";
import ShippingAddressList from "../../../components/ShippingAddressList";
import { getOrCreateGuestId } from "../../../utils";
import { useGetAllCartQuery } from "../../../redux/features/cart/cartApiSlice";

export default function CheckoutForm({ addresses }) {
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getToken();
  const { user } = useSelector((state) => state.auth);
  const guestId = getOrCreateGuestId();
  const { data } = useGetAllCartQuery({
    userId: user?._id,
    guestId,
  });
  const [activeTab, setActiveTab] = useState("info"); // 'info' or 'payment'
  const [paymentType, setPaymentType] = useState("cod");
  const [shippingAddressId, setShippingAddressId] = useState("");

  const [serverError, setServerError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const shipping = 60; // Fixed shipping cost
  const discount = 0;
  const total = data?.cart?.total + shipping;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData?.phone) {
      return toast.error("Phone number is required");
    }

    // Process checkout
    setServerError("");
    try {
      const resData = await createOrder({
        token,
        bodyData: {
          cartId: data?.cart?._id,
          phone: formData?.phone,
          shippingAddressId,
          totalAmount: data?.cart?.total,
          shippingAmount: shipping,
          paymentType,
        },
      }).unwrap();
      toast.success(resData?.message || "Order placed successfully!");
      // const userId = user?._id ?? "";
      // const { cart, items } = await getCarts(userId);
      // dispatch(setCart({ cart, items }));
      dispatch(clearCart());
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to place order!");
    }
  };
  const handleAddressSelect = (shippingId) => {
    setShippingAddressId(shippingId);
  };
  const handleContinuePayment = ()=>{
    if(!shippingAddressId)
    {
      toast.error("Please add/select shipping address");
      return;
    }
    setActiveTab("payment");
  }
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user?.name,
        email: user?.email,
        phone: user?.phone || "",
      }));
    } else {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
      {/* Checkout Header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-black "
          style={{ color: "black" }}
        >
          Checkout Info
        </h1>
        <div className="flex mt-4 border-b border-gray-300">
          <div
            className="py-2 px-4 font-bold cursor-pointer"
            style={{
              backgroundColor: activeTab === "info" ? "#2563eb" : "#f3f4f6",
              color: activeTab === "info" ? "white" : "black",
            }}
            onClick={() => setActiveTab("info")}
          >
            Cart Overview
          </div>
          <div
            className="py-2 px-4 font-bold cursor-pointer"
            style={{
              backgroundColor: activeTab === "payment" ? "#2563eb" : "#f3f4f6",
              color: activeTab === "payment" ? "white" : "black",
            }}
            onClick={() => setActiveTab("payment")}
          >
            Payment
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {activeTab === "info" ? (
          <>
            {/* Contact Info Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
              <h2
                className="text-lg font-bold mb-4 text-black "
                style={{ color: "black" }}
              >
                Contact Info
              </h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    disabled
                    className="w-full p-3 rounded border border-gray-300 bg-white text-black "
                    style={{ color: "black" }}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    disabled
                    className="w-full p-3 rounded border border-gray-300 bg-white text-black "
                    style={{ color: "black" }}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full p-3 rounded border border-gray-300 bg-white text-black "
                    style={{ color: "black" }}
                    required
                  />
                </div>
              </div>
            </div>

            <ShippingAddressList
              onSelect={handleAddressSelect}
              addresses={addresses}
            />

            {serverError && (
              <p className="text-red-500 text-sm bg-red-100 p-2 rounded">
                {serverError}
              </p>
            )}
            {/* Order Summary */}
            <OrderSummery
              subtotal={data?.cart?.total}
              discount={discount}
              shipping={shipping}
              total={total}
            />

            {/* Continue Button */}
            <div className="flex justify-end">
              <button
                type="button"
                className="flex items-center space-x-2 font-bold group hover:bg-gray-800 transition-colors bg-black px-6 py-3 rounded-md shadow-md cursor-pointer"
                onClick={handleContinuePayment}
                style={{ backgroundColor: "black" }}
              >
                <span className="text-white!" style={{ color: "white" }}>
                  Continue to Payment
                </span>
                <span className="text-xl group-hover:translate-x-1 transition-transform text-white">
                  →
                </span>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Order Summary for Payment Tab */}
            <OrderSummery
              subtotal={data?.cart?.total}
              discount={discount}
              shipping={shipping}
              total={total}
            />

            {/* Info */}
            <p className="text-center text-black font-medium text-sm">
              You will get the delivery{" "}
              <span
                className="text-primary font-bold !text-primary"
                style={{ color: "#2563eb" }}
              >
                within 2-3 Days
              </span>{" "}
              after confirmation.
            </p>

            {/* Payment Options */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
              <h2
                className="text-lg font-bold mb-4 text-black "
                style={{ color: "black" }}
              >
                Payment Options
              </h2>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <label className="flex items-center justify-start border border-gray-300 rounded-md p-4 cursor-pointer hover:border-primary transition-colors shadow-sm h-16">
                  <input
                    type="radio"
                    name="paymentType"
                    value="cod"
                    checked={paymentType === "cod"}
                    onChange={() => setPaymentType("cod")}
                    className="mr-2"
                  />
                  <PaymentMethodIcon method="cod" />
                </label>
                <label className="flex items-center justify-start border border-gray-300 rounded-md p-4 cursor-pointer hover:border-primary transition-colors shadow-sm h-16">
                  <input
                    type="radio"
                    name="paymentType"
                    value="card"
                    checked={paymentType === "card"}
                    onChange={() => setPaymentType("card")}
                    className="mr-2"
                  />
                  <PaymentMethodIcon method="card" />
                </label>
                <label className="flex items-center justify-start border border-gray-300 rounded-md p-4 cursor-pointer hover:border-primary transition-colors shadow-sm h-16">
                  <input
                    type="radio"
                    name="paymentType"
                    value="bkash"
                    checked={paymentType === "bkash"}
                    onChange={() => setPaymentType("bkash")}
                    className="mr-2"
                  />
                  <PaymentMethodIcon method="bkash" />
                </label>
              </div>
            </div>

            {/* Submit Order Button */}
            <div className="flex justify-between">
              <button
                type="button"
                className="flex items-center space-x-2 font-bold group hover:bg-gray-800 transition-colors bg-black px-6 py-3 rounded-md shadow-md cursor-pointer"
                onClick={() => setActiveTab("info")}
                style={{ backgroundColor: "black" }}
              >
                <span className="text-xl group-hover:-translate-x-1 transition-transform text-white">
                  ←
                </span>
                <span className="text-white!" style={{ color: "white" }}>
                  Back
                </span>
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 font-bold group hover:bg-gray-800 transition-colors bg-black px-6 py-3 rounded-md shadow-md cursor-pointer"
                style={{ backgroundColor: "black" }}
              >
                <span className="text-white!" style={{ color: "white" }}>
                  Place Order
                </span>
                <span className="text-xl group-hover:translate-x-1 transition-transform text-white">
                  →
                </span>
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
}
