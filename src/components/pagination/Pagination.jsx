import { useSearchParams } from "react-router-dom";
import { useUpdateQuery } from "../../hooks/useUpdateQuery";
import ReactPaginate from "react-paginate";

export default function Pagination({
  total,
  limit,
  paramKey = "page",
  className = "",
}) {
  const [searchParams] = useSearchParams();
  const updateQuery = useUpdateQuery();

  const setPage = (page) => {
    updateQuery({ page });
  };

  const currentPage = Number(searchParams.get(paramKey)) || 1;

  return (
    <div
      className={`w-full px-3 md:px-[55px] flex justify-center md:justify-end items-center my-8 ${className}`}
    >
      <ReactPaginate
        breakLabel="..."
        previousLabel="Prev"
        nextLabel="Next"
        pageCount={Math.ceil(total / limit)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        forcePage={currentPage - 1} // sync with current URL
        onPageChange={(e) => setPage(e.selected + 1)}
        className="text-black flex items-center gap-2 text-sm cursor-pointer"
        previousClassName="text-black text-sm"
        nextClassName="text-black text-sm"
        pageLinkClassName="px-2 border border-black rounded-md text-sm"
        activeClassName="bg-black text-white rounded-md"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
