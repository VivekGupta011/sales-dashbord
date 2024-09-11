"use client";
import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";

const TopBar = ({ selectedDate, setSelectedDate }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateChange = (event: any) => {
    const selectedDate = new Date(event.target.value);
    const start = new Date("2019-01-01");
    const end = new Date("2019-03-31");

    if (selectedDate >= start && selectedDate <= end) {
      setSelectedDate(event.target.value);
    } else {
      alert("Please select a date within January, February, or March 2019.");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterApply = () => {
    // Extract month and year from the selected date
    const date = new Date(selectedDate);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    // Format the date as "YYYY-MM-DD"
    const formattedDate = date.toISOString().split("T")[0];

    handleCloseModal();
  };

  const handleClickOutside = (event: any) => {
    if (event.target.classList.contains("modal-overlay")) {
      handleCloseModal();
    }
  };

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        {/* Filter Button */}
        <button
          onClick={handleOpenModal}
          className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
        >
          <FiCalendar />
          <span>Filter by Date</span>
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 modal-overlay"
            onClick={handleClickOutside}
          >
            <div
              className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full z-60"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Select Month</h2>
              {/* Inform the user about available data */}
              <p className="text-sm text-red-500 mb-4">
                Note: We only have data available for January, February, and
                March of the year 2019.
              </p>
              <div className="flex flex-col mb-4">
                <label htmlFor="date" className="text-sm text-stone-600 mb-1">
                  Select Date:
                </label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  min="2019-01-01"
                  max="2019-03-31"
                  className="p-3 border border-stone-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCloseModal}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
