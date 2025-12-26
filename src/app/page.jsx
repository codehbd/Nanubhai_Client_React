import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import { useGetAllParentCategoriesQuery } from "../redux/features/category/categoryApiSlice";
import CategoryBannerProducts from "./_components/CategoryBannerProducts";
import CategoryDiscounts from "./_components/CategoryDiscounts";
import BannerSlider from "./_components/BannerSlider";
import CategoryGrid from "./_components/CategoryGrid";
import { Helmet } from "react-helmet-async";
import NoData from "../components/NoData";

export default function HomePage() {
  const {
    data: dataCategories,
    isLoading,
    isError,
    error,
  } = useGetAllParentCategoriesQuery();
  if (isLoading) return <Loading />;
  else if (isError)
    return <ErrorMessage message={error?.data?.message || "Error"} />;
  else if (dataCategories?.categories.length === 0)
    return <NoData message="No categories found!" />;
  return (
    <>
      <Helmet>
        <title>Home | Nanuvaier Rosona Kothon - Your Online Shop</title>
        <meta name="description" content="An online store for all your needs" />
      </Helmet>
      <div className="flex flex-col bg-gray-50">
        <BannerSlider />
        <div className="max-w-7xl mx-auto -mt-32 md:-mt-40 w-full px-2 sm:px-4 py-4 md:py-6 z-[10]">
          <CategoryGrid categories={dataCategories?.categories} />
        </div>
        <CategoryDiscounts />
        <div className="mx-auto w-full flex flex-col gap-y-10 mb-10">
          {dataCategories?.categories?.map((cat) => (
            <CategoryBannerProducts
              key={cat._id}
              id={cat._id}
              categoryName={cat.name}
            />
          ))}
        </div>
      </div>
    </>
  );
}
