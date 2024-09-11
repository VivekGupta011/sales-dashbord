"use client";
import salesData, { getUniqueMenuTypesWithPrices } from "@/constants/modifiedDataSet";
import React, { useState } from "react";
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from "react-icons/fi";

const ITEMS_PER_PAGE = 10;

export const ScoopStation = () => {
  // Get unique menu types with prices
  const uniqueMenuTypesWithPrices = getUniqueMenuTypesWithPrices(salesData);
  const entries = Object.entries(uniqueMenuTypesWithPrices);

  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last item to be shown
  const firstItemIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const lastItemIndex = firstItemIndex + ITEMS_PER_PAGE;

  // Slice the data to get only the items for the current page
  const currentItems = entries.slice(firstItemIndex, lastItemIndex);

  // Calculate total pages
  const totalPages = Math.ceil(entries.length / ITEMS_PER_PAGE);

  // Handler for page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          Ice Cream Scoop Collection
        </h3>
      </div>
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {currentItems.map(([name, { price }], index) => (
            <TableRow
              key={index}
              cusId={`${firstItemIndex + index + 1}`}
              sku={name}
              date={`Creamy Dreams`}
              price={`₹${price}`}
              order={firstItemIndex + index + 1}
            />
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="text-sm text-black font-bold bg-gray-200 px-4 py-1 rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">ID</th>
        <th className="text-start p-1.5">SKU</th>
        <th className="text-start p-1.5">Price</th>
        <th className="text-start p-1.5">Items</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  cusId,
  sku,
  date,
  price,
  order,
}: {
  cusId: string;
  sku: string;
  date: string;
  price: string;
  order: number;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <a
          href="#"
          className="text-violet-600 underline flex items-center gap-1"
        >
          {cusId} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">{sku}</td>
      <td className="p-1.5">{price}</td>
      <td className="p-1.5">{date}</td>
      <td className="w-8">
        <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
          <FiMoreHorizontal />
        </button>
      </td>
    </tr>
  );
};
