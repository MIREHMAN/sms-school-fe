import { useState } from "react";

const Pagination = ({ totalPages = 10, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page) => {
    setCurrentPage(page);
    onPageChange?.(page); // optional callback
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      <div className="flex items-center gap-2 text-sm">
        {[...Array(totalPages).keys()].map((i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => handleClick(page)}
              className={`px-2 rounded-sm ${
                page === currentPage ? "bg-lamaSky text-white" : ""
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
