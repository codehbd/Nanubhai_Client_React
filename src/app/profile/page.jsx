import UserProfile from "./_components/UserProfile";
import DashSidebar from "./_components/DashSidebar";
import MyOrders from "./_components/MyOrders";
import { CreditCard, Heart, Settings } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function ProfilePage() {
  const [searchParams] = useSearchParams();
  const { tab, page, status, search } = Object.fromEntries(
    searchParams.entries()
  );
  const activeTab = tab || "profile";

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;
      case "orders":
        return <MyOrders page={page} status={status} search={search} />;
      case "wishlist":
        return (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black! mb-2">
              Wishlist Coming Soon
            </h3>
            <p className="text-gray-500">
              We&apos;re working on this feature. Check back soon!
            </p>
          </div>
        );
      case "payment":
        return (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black! mb-2">
              Payment Methods Coming Soon
            </h3>
            <p className="text-gray-500">
              We&apos;re working on this feature. Check back soon!
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black! mb-2">
              Account Settings Coming Soon
            </h3>
            <p className="text-gray-500">
              We&apos;re working on this feature. Check back soon!
            </p>
          </div>
        );
      default:
        return <UserProfile />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile | Nanuvaier Rosona Kothon - Your Online Shop</title>
        <meta name="description" content="An online store for all your needs" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-black mb-8">My Account</h1>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar (Client) */}
            <DashSidebar activeTab={activeTab} />

            {/* Main Content */}
            <div className="w-full lg:w-3/4">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
