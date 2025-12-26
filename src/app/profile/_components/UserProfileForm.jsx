import { Camera, Edit2, Mail, Phone, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useUpdateProfileMutation } from "../../../redux/features/auth/authApiSlice";
import { updateUserProfileSchema } from "../../../validation/user.dto";
import { getImageUrl } from "../../../utils";
import ShippingAddressList from "../../../components/ShippingAddressList";

export default function UserProfileForm({ shippingAddresses }) {
  const { user } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [updateProfile] = useUpdateProfileMutation();
  const [previewImage, setPreviewImage] = useState("");
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
    },
    resolver: zodResolver(updateUserProfileSchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (file) {
      formData.append("avatar", file);
    }
    formData.append("name", data?.name || "");
    formData.append("phone", data?.phone || "");
    try {
      const resData = await updateProfile(formData).unwrap();
      toast.success(resData?.message || "Profile updated successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to update profile!");
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result);
        }
      };
      setFile(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    reset({
      name: user?.name || "",
      phone: user?.phone || "",
    });
  }, [user, reset]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Profile Header */}
      <div className="bg-linear-to-r from-gray-800 to-black p-6 text-white relative">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
              <img
                src={previewImage || getImageUrl(user?.image || "")}
                alt={user?._id || "Img"}
                className="w-[96px] h-[96px] object-cover"
              />
            </div>
            {isEditing && (
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 w-6 h-6 bg-black text-white flex justify-center items-center rounded-full cursor-pointer"
              >
                <Camera size={16} />
                <input
                  type="file"
                  id="profile-image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-gray-300">
              Member since {dayjs(user?.createdAt).format("MMMM D, YYYY")}
            </p>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute w-10 h-10 top-4 right-4 bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
          >
            {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-2">
          <div className="flex flex-col gap-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-black border-b pb-2">
                Personal Information
              </h2>

              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-black mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      disabled={!isEditing}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black disabled:bg-gray-100"
                    />
                  </div>
                  {errors?.name && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors?.name?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user?.email}
                      disabled={true}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-black mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone")}
                      disabled={!isEditing}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black disabled:bg-gray-100"
                    />
                  </div>
                  {errors?.phone && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors?.phone?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                }}
                className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none cursor-pointer"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </form>
        {/* Address Information */}
        <ShippingAddressList
          addresses={shippingAddresses}
          onSelect={() => {}}
        />
      </div>
    </div>
  );
}
