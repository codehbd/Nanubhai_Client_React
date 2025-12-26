import { Helmet } from "react-helmet-async";
import Wishlist from "./_components/Wishlist";

export default function WishlistPage() {
  return (
    <>
      <Helmet>
        <title>Wishlist | Nanuvaier Rosona Kothon - Your Online Shop</title>
        <meta name="description" content="An online store for all your needs" />
      </Helmet>
      <div className="flex flex-col bg-gray-50 min-h-screen py-6">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <Wishlist />
        </div>
      </div>
    </>
  );
}
