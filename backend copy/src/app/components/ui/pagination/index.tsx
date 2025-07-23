import React from "react";

type PaginationProps = {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
  range?: number; // сколько номеров вокруг активного показывать (по умолчанию 2)
};

export default function Pagination({
  current,
  total,
  onPageChange,
  className = "",
  range = 2,
}: PaginationProps) {
  if (total <= 1) return null;

  // Показывать максимум (range*2+1) номеров вокруг активной
  const pageNumbers = [];
  const start = Math.max(1, current - range);
  const end = Math.min(total, current + range);
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  // Для очень длинной пагинации добавим "..."
  const showFirst = start > 1;
  const showLast = end < total;

  return (
    <nav className={`flex items-center justify-center gap-1 mt-8 select-none ${className}`}>
      <button
        className={`px-3 py-2 rounded-md font-bold transition-colors ${
          current === 1 ? "text-gray-400" : "text-white hover:bg-[#2d3141]"
        }`}
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
      >
        ←
      </button>

      {showFirst && (
        <>
          <button
            className={`px-3 py-2 rounded-md font-bold text-white hover:bg-[#2d3141]`}
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {start > 2 && <span className="px-1 text-gray-400">...</span>}
        </>
      )}
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-2 rounded-md font-bold transition-colors ${
            current === num
              ? "bg-[#e01a31] text-white"
              : "text-gray-400 hover:bg-[#2d3141]"
          }`}
        >
          {num}
        </button>
      ))}
      {showLast && (
        <>
          {end < total - 1 && <span className="px-1 text-gray-400">...</span>}
          <button
            className={`px-3 py-2 rounded-md font-bold text-white hover:bg-[#2d3141]`}
            onClick={() => onPageChange(total)}
          >
            {total}
          </button>
        </>
      )}
      <button
        className={`px-3 py-2 rounded-md font-bold transition-colors ${
          current === total ? "text-gray-400" : "text-white hover:bg-[#2d3141]"
        }`}
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
      >
        →
      </button>
    </nav>
  );
}
