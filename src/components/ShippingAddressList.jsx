import { CircleX, PencilLine, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createShippingAddressSchema } from "../validation/shipping-address.dto";
import {
  useCreateShippingAddressMutation,
  useDeleteShippingAddressMutation,
  useUpdateShippingAddressMutation,
} from "../redux/features/shippingAddress/shippingAddressApiSlice";
import { getToken } from "../storage/local-storage";

export default function ShippingAddressList({ onSelect, addresses }) {
  const [createShippingAddress] = useCreateShippingAddressMutation();
  const [updateShippingAddress] = useUpdateShippingAddressMutation();
  const [deleteShippingAddress] = useDeleteShippingAddressMutation();
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const token = getToken();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createShippingAddressSchema),
    defaultValues: {
      street: "",
      city: "",
      postCode: 0,
      country: "",
    },
  });

  useEffect(() => {
    if (addresses?.length > 0) {
      const defaultAddress = addresses[0];
      setSelectedId(defaultAddress._id);
      onSelect(defaultAddress._id);
    }
  }, [addresses]);

  const handleSelect = (address) => {
    setSelectedId(address._id);
    onSelect(address._id);
  };

  const handleAddNew = () => {
    reset({ street: "", city: "", postCode: 0, country: "" });
    setEditingId(null);
    setMode("add");
  };

  const handleEdit = (e, address) => {
    e.preventDefault();
    e.stopPropagation();

    reset({
      street: address.street ?? "",
      city: address.city ?? "",
      postCode: address.postCode ?? 0,
      country: address.country ?? "",
    });
    setEditingId(address._id);
    setMode("edit");
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (!confirmDelete) return;

    try {
      const resData = await deleteShippingAddress({ token, id }).unwrap();
      toast.success(resData?.message || "Address deleted successfully!");
      if (selectedId === id) {
        setSelectedId(null);
        onSelect("");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete address!");
    }
  };

  const onSubmit = async (data) => {
    let resData;
    try {
      if (mode === "add") {
        resData = await createShippingAddress({
          token,
          bodyData: data,
        }).unwrap();
      } else if (mode === "edit" && editingId) {
        resData = await updateShippingAddress({
          token,
          id: editingId,
          bodyData: data,
        }).unwrap();
      }
      toast.success(
        resData?.message ||
          (mode === "add"
            ? "Shipping address added successfully"
            : "Shipping address updated successfully")
      );
    } catch (error) {
      toast.error(error?.message || "Failed to add/update shipping!");
    }

    setMode(null);
    setEditingId(null);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-700">Shipping Addresses</h2>
        <button
          type="button"
          onClick={handleAddNew}
          className="bg-gray-200 text-gray-700 hover:text-green-500 hover:bg-green-200 transition-colors cursor-pointer rounded-md p-1"
          title="Add"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-4">
        {addresses?.length > 0 ? (
          addresses?.map((address) => (
            <label
              key={address._id}
              className={`flex items-start p-3 rounded-xl border relative transition cursor-pointer ${
                selectedId === address._id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                name="shippingAddress"
                className="h-4 w-4 accent-blue-600 mt-1"
                checked={selectedId === address._id}
                onChange={() => handleSelect(address)}
              />
              <div className="ml-4 text-sm text-gray-800">
                <p className="font-medium">
                  {address.street}, {address.city}, {address.postCode},{" "}
                  {address.country}
                </p>
              </div>
              <div className="absolute top-2 right-2 flex items-center gap-x-4">
                <button
                  type="button"
                  onClick={(e) => handleEdit(e, address)}
                  className=" bg-gray-200 text-gray-700 hover:text-blue-500 hover:bg-blue-200 transition-colors cursor-pointer rounded-md p-1"
                  title="Edit"
                >
                  <PencilLine className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleDelete(e, address._id)}
                  className=" bg-gray-200 text-gray-700 hover:text-red-500 hover:bg-red-200 transition-colors cursor-pointer rounded-md p-1"
                  title="Delete"
                >
                  <Trash2 className="h-6 w-6" />
                </button>
              </div>
            </label>
          ))
        ) : (
          <p className="text-center text-gray-500">No address found</p>
        )}
      </div>

      {/* Shipping Info Form */}
      {mode && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-700">
              {mode === "add" ? "Add New Address" : "Edit Address"}
            </h2>
            <div className="flex items-center gap-x-4">
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="bg-gray-200 text-gray-700 hover:text-green-500 hover:bg-green-200 transition-colors cursor-pointer rounded-md px-2 py-1 text-base"
              >
                <Save className="h-6 w-6 inline-block mr-1" />{" "}
                {isSubmitting ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setMode(null)}
                className="bg-gray-200 text-gray-700 hover:text-red-500 hover:bg-red-200 transition-colors cursor-pointer rounded-md px-2 py-1 text-base"
              >
                <CircleX className="h-6 w-6 inline-block mr-1" /> Cancel
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                {...register("street")}
                placeholder="Street Address"
                className="w-full p-3 rounded border border-gray-300 bg-white text-black"
              />
              {errors?.street && (
                <p className="text-red-500 text-sm">
                  {errors?.street?.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  {...register("city")}
                  placeholder="City"
                  className="w-full p-3 rounded border border-gray-300 bg-white text-black"
                />
                {errors?.city && (
                  <p className="text-red-500 text-sm">
                    {errors?.city?.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  {...register("postCode")}
                  placeholder="Post Code"
                  className="w-full p-3 rounded border border-gray-300 bg-white text-black"
                />
                {errors?.postCode && (
                  <p className="text-red-500 text-sm">
                    {errors?.postCode?.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  {...register("country")}
                  placeholder="Country"
                  className="w-full p-3 rounded border border-gray-300 bg-white text-black"
                />
                {errors?.country && (
                  <p className="text-red-500 text-sm">
                    {errors?.country?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
