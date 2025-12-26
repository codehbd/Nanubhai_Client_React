import { useUpdateQuery } from "../../../../hooks/useUpdateQuery";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrderFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const updateQuery = useUpdateQuery();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      updateQuery({
        status: filterStatus,
        search: searchQuery || undefined, // remove empty search param
      });
    }, 500); // wait 500ms after last keystroke

    return () => clearTimeout(handler); // cleanup on new input
  }, [filterStatus, searchQuery, updateQuery]);
  return (
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="relative grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search orders by ID or product name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"
          />
        </div>

        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">
            Status:
          </span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black py-2 px-3"
          >
            <option value="all">All Orders</option>
            <option value="placed">Placed</option>
            <option value="processing">Processing</option>
            <option value="shipping">Shipping</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>
    </div>
  );
}
