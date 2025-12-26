import ErrorMessage from "../../../components/ErrorMessage";
import NoData from "../../../components/NoData";
import ProductSkeleton from "../../../components/skeleton/ProductSkeleton";
import CategoryGrid from "../../_components/CategoryGrid";
import CategoryBannerProducts from "../../../app/_components/CategoryBannerProducts";
import CategoryDiscounts from "../../../app/_components/CategoryDiscounts";
import { useParams } from "react-router-dom";
import {
  useGetAllChildCategoriesQuery,
  useGetSingleCategoryQuery,
} from "../../../redux/features/category/categoryApiSlice";
import { Helmet } from "react-helmet-async";

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 px-2 sm:px-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <ProductSkeleton key={index} index={index} />
      ))}
    </div>
  );
}

export default function CategoryPage() {
  const { id } = useParams();
  const {
    data: dataCategory,
    isLoading,
    isError,
    error,
  } = useGetSingleCategoryQuery({ id });
  const { data: dataChildCategories } = useGetAllChildCategoriesQuery({ id });
  let content = null;

  if (isLoading) {
    content = <LoadingSkeleton />;
  } else if (isError) {
    content = <ErrorMessage message={error?.message} />;
  } else if (!dataCategory?.category) {
    content = <NoData message="Category not found" />;
  } else {
    content = (
      <>
        <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 py-4 md:py-6 z-[10]">
          <CategoryGrid categories={dataChildCategories?.categories} />
        </div>
        <div className="max-w-7xl mx-auto w-full">
          <CategoryBannerProducts
            id={id}
            categoryName={dataCategory?.category?.name}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {dataCategory?.category?.name || id} | Nanuvaier Rosona Kothon - Your
          Online Shop
        </title>
        <meta name="description" content="An online store for all your needs" />
      </Helmet>
      <div className="flex flex-col bg-gray-50">
        <CategoryDiscounts />
        <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 py-4 md:py-6">
          {content}
        </div>
      </div>
    </>
  );
}
