import React, { useState } from "react";
export const DatePicker = ({ onDateChange }) => {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  const formatDate = (date) => date.toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleStartChange = (e) => {
    const newStart = e.target.value;
    setStartDate(newStart);
    if (endDate && new Date(newStart) > new Date(endDate)) {
      setEndDate(""); // reset end date if invalid
    }
    onDateChange(newStart, endDate);
  };
  const handleEndChange = (e) => {
    const newEnd = e.target.value;
    setEndDate(newEnd);
    if (startDate && new Date(newEnd) < new Date(startDate)) {
      setStartDate(""); // reset start date if invalid
    }
    onDateChange(startDate, newEnd);
  };
  return (
    <div className="flex sm:flex-row gap-4 items-center justify-center w-full">
      <div className="flex flex-col sm:w-auto">
        <label className="text-sm text-center font-medium mb-1">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartChange}
          min={formatDate(oneYearAgo)}
          max={formatDate(today)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col sm:w-auto">
        <label className="text-sm text-center font-medium mb-1">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndChange}
          min={formatDate(oneYearAgo)}
          max={formatDate(today)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};
