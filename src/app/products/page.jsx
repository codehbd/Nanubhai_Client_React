import ProductCard from "../../components/cards/product/ProductCard";
import Pagination from "../../components/pagination/Pagination";
import NoData from "../../components/NoData";
import ErrorMessage from "../../components/ErrorMessage";
import ProductSkeleton from "../../components/skeleton/ProductSkeleton";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/features/product/productApiSlice";
import { Helmet } from "react-helmet-async";

// Extracted loading skeleton
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 px-2 sm:px-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <ProductSkeleton key={index} index={index} />
      ))}
    </div>
  );
}

// Main component
export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const limit = 20;
  const { name, type, page } = Object.fromEntries(searchParams.entries());
  const {
    data: dataProducts,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery({
    location: "",
    type,
    name,
    page,
    limit,
  });

  let content = null;
  if (isLoading) {
    content = <LoadingSkeleton />;
  } else if (isError) {
    content = <ErrorMessage message={error?.message} />;
  } else if (dataProducts?.products?.length === 0) {
    content = <NoData message="No products found." />;
  } else {
    content = (
      <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 px-2 sm:px-4">
          {dataProducts?.products.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>
        {/* Pagination */}
        <Pagination total={dataProducts?.total} limit={limit} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Products | Nanuvaier Rosona Kothon - Your Online Shop</title>
        <meta name="description" content="An online store for all your needs" />
      </Helmet>
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-extrabold text-black mb-6"
            style={{ color: "black" }}
          >
            All Products
          </h2>

          {content}
        </div>
      </section>
    </>
  );
}
