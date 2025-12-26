import ProductDetailCard from "../../../components/cards/product/ProductDetailCard";
import RelatedProducts from "./_components/RelatedProducts";
import ErrorMessage from "../../../components/ErrorMessage";
import NoData from "../../../components/NoData";
import ReviewSection from "./_components/ReviewSection";
import { useGetSingleProductQuery } from "../../../redux/features/product/productApiSlice";
import { useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 md:p-6 max-w-4xl mx-auto animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Image Section */}
        <div className="flex flex-col items-center">
          {/* Main Image */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
            <div className="w-full h-full bg-gray-200" />
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full bg-gray-200 border-2 border-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col">
          {/* Title */}
          <div className="h-6 w-2/3 bg-gray-200 rounded mb-3" />

          {/* Rating + Stock */}
          <div className="flex items-center gap-x-2 mb-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>

          {/* Price */}
          <div className="flex items-center mb-3">
            <div className="h-5 w-20 bg-gray-200 rounded" />
            <div className="ml-2 h-4 w-12 bg-gray-200 rounded" />
          </div>

          {/* Savings */}
          <div className="h-4 w-28 bg-gray-200 rounded mb-4" />

          {/* Free Shipping */}
          <div className="h-5 w-24 bg-gray-200 rounded mb-6" />

          {/* Quantity */}
          <div className="mb-4">
            <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded" />
              <div className="w-12 h-8 bg-gray-200 rounded" />
              <div className="w-8 h-8 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-x-4 mb-6">
            <div className="w-3/5 h-10 bg-gray-200 rounded-md" />
            <div className="w-3/5 h-10 bg-gray-200 rounded-md" />
          </div>

          {/* Category */}
          <div className="h-3 w-20 bg-gray-200 rounded mb-2" />

          {/* Description */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
            <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-11/12 bg-gray-200 rounded" />
            <div className="h-3 w-2/3 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function generateMetadata({ params }) {
//   try {
//     const { id } = await params;
//     const product = await fetchSingleProduct(id);
//     return product
//       ? {
//           title: `${product.name} | Nanuvaier Rosona Kothon - Your Online Shop`,
//           description: "An online store for all your needs",
//         }
//       : {
//           title: `Product Not Found | Nanuvaier Rosona Kothon - Your Online Shop`,
//           description: "An online store for all your needs",
//         };
//   } catch {
//     return {
//       title: `An Error Occurred | Nanuvaier Rosona Kothon - Your Online Shop`,
//       description: "An online store for all your needs",
//     };
//   }
// }

export default function ProductPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { location } = Object.fromEntries(searchParams.entries());

  const {
    data: dataProduct,
    isLoading,
    isError,
    error,
  } = useGetSingleProductQuery(id);
  let content = null;
  if (isLoading) {
    content = <LoadingSkeleton />;
  } else if (isError) {
    content = <ErrorMessage message={error?.message} />;
  } else if (!dataProduct?.product) {
    content = <NoData message="Product not found." />;
  } else {
    content = (
      <div className="flex flex-col bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <ProductDetailCard product={dataProduct?.product} />
        </div>
        <ReviewSection productId={id} />
        <RelatedProducts
          name={dataProduct?.product?.name}
          location={location}
        />
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>
          {dataProduct?.produc?.name || id} | Nanuvaier Rosona Kothon - Your
          Online Shop
        </title>
        <meta name="description" content="An online store for all your needs" />
      </Helmet>
      {content}
    </>
  );
}
