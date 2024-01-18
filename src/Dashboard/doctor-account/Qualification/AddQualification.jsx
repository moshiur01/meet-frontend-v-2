/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

const AddQualification = ({ doctorId }) => {
  const [qualificationData, setQualificationData] = useState({
    degreeName: "",
    universityName: "",
    fromDate: {
      month: "",
      day: "",
      year: "",
    },
    toDate: {
      month: "",
      day: "",
      year: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQualificationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (type, e) => {
    const { name, value } = e.target;
    setQualificationData((prevData) => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [name]: value,
      },
    }));
  };

  const handleUpdateEducation = (e) => {
    e.preventDefault();

    // Format fromDate and toDate values
    const formatDateString = (dateObj) => {
      const { month, day, year } = dateObj;
      return `${month.padStart(2, "0")}-${day.padStart(2, "0")}-${year}`;
    };

    const formattedFromDate = formatDateString(qualificationData.fromDate);
    const formattedToDate = formatDateString(qualificationData.toDate);

    // Now you can use formattedFromDate and formattedToDate in your API call
    console.log("Formatted From Date:", formattedFromDate);
    console.log("Formatted To Date:", formattedToDate);

    // Perform API call to add qualification using qualificationData
    // ...

    // Reset the form or perform any other necessary actions
    setQualificationData({
      degreeName: "",
      universityName: "",
      fromDate: {
        month: "",
        day: "",
        year: "",
      },
      toDate: {
        month: "",
        day: "",
        year: "",
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Educational Data</h2>
      <form onSubmit={handleUpdateEducation}>
        {/* Degree Name */}
        <div className="mb-4">
          <label
            htmlFor="degreeName"
            className="block text-sm font-medium text-gray-700"
          >
            Degree Name
          </label>
          <input
            type="text"
            id="degreeName"
            name="degreeName"
            value={qualificationData.degreeName}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>

        {/* University Name */}
        <div className="mb-4">
          <label
            htmlFor="universityName"
            className="block text-sm font-medium text-gray-700"
          >
            University Name
          </label>
          <input
            type="text"
            id="universityName"
            name="universityName"
            value={qualificationData.universityName}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>

        {/* From Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            From Date
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="day"
              placeholder="Day"
              value={qualificationData.fromDate.day}
              onChange={(e) => handleDateChange("fromDate", e)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />

            <input
              type="text"
              name="month"
              placeholder="Month"
              value={qualificationData.fromDate.month}
              onChange={(e) => handleDateChange("fromDate", e)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />

            <input
              type="text"
              name="year"
              placeholder="Year"
              value={qualificationData.fromDate.year}
              onChange={(e) => handleDateChange("fromDate", e)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
        </div>

        {/* To Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            To Date
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="day"
              placeholder="Day"
              value={qualificationData.toDate.day}
              onChange={(e) => handleDateChange("toDate", e)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />

            <input
              type="text"
              name="month"
              placeholder="Month"
              value={qualificationData.toDate.month}
              onChange={(e) => handleDateChange("toDate", e)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />

            <input
              type="text"
              name="year"
              placeholder="Year"
              value={qualificationData.toDate.year}
              onChange={(e) => handleDateChange("toDate", e)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add Qualification
        </button>
      </form>
    </div>
  );
};

export default AddQualification;
