import React from "react";

type Props = {
  total?: number;
  range: any[];
  rowsPerPage: number;
  page: number;
  previous?: () => void;
  next?: () => void;
  onPageChange: (val: number) => void;
  count: number;
};

const Pagination = (props: Props) => {
  const { total, range, rowsPerPage, previous, next, page, count, onPageChange } = props;
  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-800 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{" "}
        <span className="font-semibold text-gray-900">{count > 1 ? `1-${rowsPerPage}`: count && count}</span> of{" "}
        <span className="font-semibold text-gray-900">{total && total}</span>
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button
            type="button"
            onClick={previous}
            disabled={page === 0}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-black border border-gray-400 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>
        {range?.length > 0 &&
          range?.map((i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => onPageChange(i)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-black border border-gray-400 hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white ${
                (page + 1) === i && "!bg-gray-700 !text-white"
                }`}
              >
                {i}
              </button>
            </li>
          ))}
        <li>
          <button
            type="button"
            onClick={next}
            disabled={page + 1 === range[range.length - 1]}
            className="flex items-center justify-center px-3 h-8 leading-tight text-black border border-gray-400 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
