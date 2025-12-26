import ProductCard from "../../components/cards/product/ProductCard";
import NoData from "../../components/NoData";
import ErrorMessage from "../../components/ErrorMessage";
import ProductSkeleton from "../../components/skeleton/ProductSkeleton";
import { getImageUrl } from "../../utils";
import CategoryBannerSlider from "../categories/_components/CategoryBannerSlider";
import LinkButton from "../../components/button/LinkButton";
import { useGetProductsQuery } from "../../redux/features/product/productApiSlice";

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 px-2 sm:px-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <ProductSkeleton key={index} index={index} />
      ))}
    </div>
  );
}

export default function CategoryBannerProducts({ id, categoryName }) {
  const {
    data: dataProducts,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery({
    location: "",
    type: undefined,
    name: undefined,
    page: 1,
    limit: 5,
    category: id,
  });

  // ✅ Handle states
  let content = null;
  if (isLoading) {
    content = <LoadingSkeleton />;
  } else if (isError) {
    content = (
      <ErrorMessage message={error?.data?.message || "Something went wrong"} />
    );
  } else if (!dataProducts?.products?.length) {
    content = <NoData message="No category products available." />;
  } else {
    content = (
      <>
        <CategoryBannerSlider
          images={dataProducts?.products[0]?.images?.map((img) => ({
            image: getImageUrl(img.image),
            _id: img._id,
          }))}
        />

        <div className="-mt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 px-2 sm:px-4">
            {dataProducts?.products?.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-10 text-center w-full flex justify-center">
            <LinkButton link={`/products?category=${id}`}>View All</LinkButton>
          </div>
        </div>
      </>
    );
  }

  return (
    <section className="py-6">
      <h2
        className="text-lg md:text-3xl text-center font-normal text-black mb-6"
        style={{ color: "black" }}
      >
        {categoryName}
      </h2>

      {content}
    </section>
  );
}
