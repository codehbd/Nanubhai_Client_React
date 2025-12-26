import ErrorMessage from "../../../../components/ErrorMessage";
import NoData from "../../../../components/NoData";
import ReviewForm from "./ReviewForm";
import ReviewStatus from "./ReviewStatus";
import LinkButton from "../../../../components/button/LinkButton";
import ReviewCard from "../../../../components/cards/review/ReviewCard";
import { useGetSingleProductRatingsQuery } from "../../../../redux/features/rating/ratingApiSlice";

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

export default function ReviewSection({ productId }) {
  const {
    data: dataProductRatings,
    isLoading,
    isError,
    error,
  } = useGetSingleProductRatingsQuery({ id: productId });
  let content = null;

  if (isLoading) {
    content = <LoadingSkeleton />;
  } else if (isError) {
    content = <ErrorMessage message={error?.message} />;
  } else if (dataProductRatings?.rating?.length === 0) {
    content = <NoData message="No reviews found." />;
  } else {
    content = (
      <div className="flex overflow-x-auto gap-6 pb-6 -mx-4 px-4 scrollbar-hide">
        {dataProductRatings?.rating?.map((rating) => (
          <ReviewCard key={rating._id} rating={rating} />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg my-8">
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ReviewStatus ratings={dataProductRatings?.ratings} />
          <ReviewForm productId={productId} />
        </div>
        {content}
      </div>
      <div className="flex justify-center">
        <LinkButton link={`/reviews/${productId}`}>View All</LinkButton>
      </div>
    </div>
  );
}
