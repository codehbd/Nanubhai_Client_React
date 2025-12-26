import { ArrowLeft } from "lucide-react";
import CheckoutForm from "./_components/CheckoutForm";
import { Link } from "react-router-dom";
import { useGetAllShippingAddressesQuery } from "../../redux/features/shippingAddress/shippingAddressApiSlice";
import { Helmet } from "react-helmet-async";

export default function CheckoutPage() {
  const { data: dataAddress } = useGetAllShippingAddressesQuery();
  return (
    <>
      <Helmet>
        <title>Checkout | Nanuvaier Rosona Kothon - Your Online Shop</title>
        <meta name="description" content="An online store for all your needs" />
      </Helmet>
      <div className="flex flex-col bg-gray-50 min-h-screen py-6">
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            to="/cart"
            className="flex items-center text-gray-700 mb-6 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Cart</span>
          </Link>

          <CheckoutForm addresses={dataAddress?.addresses} />
        </div>
      </div>
    </>
  );
}
