import SectionHeader from "../../../_components/SectionHeader";
import LinkButton from "../../../../components/button/LinkButton";
import ProductCard from "../../../../components/cards/product/ProductCard";
import ErrorMessage from "../../../../components/ErrorMessage";
import NoData from "../../../../components/NoData";
import ProductSkeleton from "../../../../components/skeleton/ProductSkeleton";
import { useGetProductsQuery } from "../../../../redux/features/product/productApiSlice";

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

export default function RelatedProducts({ name, location }) {
  const {
    data: dataProducts,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery({
    location: "",
    type: "related",
    name,
    page: 1,
    limit: 5,
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
        {/* CTA Button */}
        <div className="mt-10 text-center w-full flex justify-center">
          <LinkButton link="/products?type=related">View All</LinkButton>
        </div>
      </>
    );
  }

  return (
    <section className="py-8 md:py-12">
      {/* Section Header */}
      <SectionHeader content="Related Products" />

      {content}
    </section>
  );
}
