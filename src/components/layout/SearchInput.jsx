import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateQuery } from "../../hooks/useUpdateQuery";
import { useLocation } from "react-router-dom";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const { pathname } = useLocation();

  const updateQuery = useUpdateQuery();

  // Debounce search input
  useEffect(() => {
    if (pathname === "/products" || search) {
      const handler = setTimeout(() => {
        updateQuery(
          {
            name: search || undefined, // remove empty search param
          },
          true,
          "/products"
        );
      }, 500); // wait 500ms after last keystroke

      return () => clearTimeout(handler); // cleanup on new input
    }
  }, [search, updateQuery, pathname]);

  return (
    <div className="border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="relative flex items-center bg-gray-200 rounded-md border-none">
          <SearchIcon className="absolute left-3 h-5 w-5 text-gray-500" />

          <input
            type="text"
            placeholder="Search For Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 outline-none text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
