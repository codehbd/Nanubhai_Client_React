export default function ProductSkeleton({ index }) {
  return (
    <article
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full animate-pulse"
      style={{
        animation: `fadeIn 0.5s ease-out ${0.1 * (index ?? 0)}s both`,
      }}
    >
      {/* Image */}
      <figure className="relative aspect-square">
        <div className="w-full h-full bg-gray-200" />
        {/* Discount badge */}
        <div className="absolute top-2 left-2 h-5 w-12 bg-gray-300 rounded" />
      </figure>

      {/* Details */}
      <div className="p-2 flex flex-col grow">
        {/* Category */}
        <div className="h-3 w-16 bg-gray-200 rounded mb-2" />

        {/* Title */}
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-1" />
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />

        {/* Rating */}
        <div className="flex space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
          ))}
        </div>

        {/* Free Shipping */}
        <div className="h-3 w-20 bg-gray-200 rounded mb-2" />

        {/* Price + Old Price */}
        <div className="mt-auto mb-2 text-center">
          <div className="h-4 w-16 bg-gray-200 rounded mx-auto mb-1" />
          <div className="h-3 w-12 bg-gray-200 rounded mx-auto" />
        </div>

        {/* Add to Cart */}
        <div className="w-full h-8 bg-gray-200 rounded-md" />
      </div>
    </article>
  );
}
