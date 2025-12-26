import CategoryItem from "./CategoryItem";
import ErrorMessage from "../ErrorMessage";
import NoData from "../NoData";
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApiSlice";

// Loading skeleton
function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Category Row */}
      <div className="w-full flex items-center justify-between px-4 py-2 rounded-md">
        <div className="h-4 w-32 bg-gray-300 rounded" />
        <div className="h-3 w-3 bg-gray-300 rounded" />
      </div>

      {/* Subcategories (example: 2 placeholders) */}
      <ul className="pl-6 mt-1 space-y-1">
        {[1, 2].map((i) => (
          <li key={i}>
            <div className="block px-4 py-1 rounded-md">
              <div className="h-3 w-28 bg-gray-200 rounded" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CategoryNav() {
  const {
    data: dataCategories,
    isLoading,
    isError,
    error,
  } = useGetAllCategoriesQuery();

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorMessage message={error?.message} />;
  if (dataCategories?.categories?.length === 0)
    return <NoData message="No categories found." />;

  return (
    <div className="space-y-2">
      {dataCategories?.categories.map((category) => (
        <CategoryItem
          key={category._id}
          category={category}
          onClose={() => {}}
        />
      ))}
    </div>
  );
}
