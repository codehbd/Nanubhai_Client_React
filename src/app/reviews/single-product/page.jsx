import ErrorMessage from "../../../components/ErrorMessage";
import NoData from "../../../components/NoData";
import Pagination from "../../../components/pagination/Pagination";
import ReviewCard from "../../../components/cards/review/ReviewCard";
import { useGetSingleProductRatingsQuery } from "../../../redux/features/rating/ratingApiSlice";
import { Helmet } from "react-helmet-async";

// Extracted loading skeleton
function LoadingSkeleton() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="min-w-[320px] bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-xl p-6 mb-4 shadow-lg animate-pulse"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              {/* Avatar */}
              <div className="bg-gray-200 rounded-full p-5 mr-4 shadow-sm" />

              {/* User info */}
              <div>
                <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-4 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
            </div>

            {/* Date placeholder */}
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>

          {/* Review text */}
          <div className="space-y-2 border-l-4 border-blue-100 pl-4">
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-11/12 bg-gray-200 rounded" />
            <div className="h-3 w-2/3 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ReviewsPage({ productId, page = 1, limit = 5 }) {
  // ✅ Fetch data via RTK Query
  const { data, isLoading, isError, error } = useGetSingleProductRatingsQuery({
    id: productId,
    page,
    limit,
  });

  let content = null;
  if (isLoading) {
    content = <LoadingSkeleton />;
  } else if (isError) {
    content = (
      <ErrorMessage message={error?.data?.message || "Something went wrong"} />
    );
  } else if (data?.rating?.length === 0) {
    content = <NoData message="No reviews found." />;
  } else {
    content = (
      <>
        <div className="flex overflow-x-auto gap-6 pb-6 -mx-4 px-4 scrollbar-hide">
          {data?.rating?.map((rating) => (
            <ReviewCard key={rating._id} rating={rating} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination total={data?.total} limit={limit} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Reviews | Nanuvaier Rosona Kothon - Your Online Shop</title>
        <meta name="description" content="An online store for all your needs" />
      </Helmet>
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-black mb-6">
            All Reviews
          </h2>

          {content}
        </div>
      </section>
    </>
  );
}
