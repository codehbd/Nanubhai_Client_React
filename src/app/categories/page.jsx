import CategoryList from "./_components/CategoryList";
import NoData from "../../components/NoData";
import ErrorMessage from "../../components/ErrorMessage";
import { useGetFlatAllCategoriesQuery } from "../../redux/features/category/categoryApiSlice";
import { Helmet } from "react-helmet-async";

// Extracted loading skeleton
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="aspect-square rounded-lg bg-gray-200 animate-pulse border-2 border-gray-200"
        />
      ))}
    </div>
  );
}
export default function CategoriesPage() {
  const {
    data: dataCategories,
    isLoading,
    isError,
    error,
  } = useGetFlatAllCategoriesQuery();
  let content = null;
  if (isLoading) {
    content = <LoadingSkeleton />;
  } else if (isError) {
    content = <ErrorMessage message={error?.message} />;
  } else if (dataCategories?.categories?.length === 0) {
    content = <NoData message="No categories found!" />;
  } else {
    content = <CategoryList categories={dataCategories?.categories} />;
  }

  return (
    <>
      <Helmet>
        <title>Categories | Nanuvaier Rosona Kothon - Your Online Shop</title>
        <meta name="description" content="An online store for all your needs" />
      </Helmet>

      <div className="flex flex-col bg-gray-50">
        <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 py-4 md:py-6">
          {content}
        </div>
      </div>
    </>
  );
}
