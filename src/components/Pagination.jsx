import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages = 5, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const renderPages = () => {
    return Array.from({ length: totalPages }, (_, i) => {
      const page = i + 1;
      return (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-md ${
            currentPage === page
              ? "bg-purple-100 text-purple-700 font-medium"
              : "border border-gray-300"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-medium">
          {(currentPage - 1) * 10 + 1}
        </span>{" "}
        to{" "}
        <span className="font-medium">
          {Math.min(currentPage * 10, totalPages * 10)}
        </span>{" "}
        of <span className="font-medium">{totalPages * 10}</span> results
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleClick(currentPage - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
          <span className="sr-only">Previous page</span>
        </button>
        {renderPages()}
        <button
          onClick={() => handleClick(currentPage + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
          <span className="sr-only">Next page</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
