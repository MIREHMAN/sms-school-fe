const FilterButton = () => {
    return (
        <div className="flex items-center gap-4 self-end">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <img src="/filter.png" alt="Filter" width={14} height={14} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <img src="/sort.png" alt="Sort" width={14} height={14} />
        </button>
      </div>
    );
  };
  
  export default FilterButton;
  