/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { useAddDoctorServiceMutation } from "../../../redux/api/doctorServiceApi";

const AddService = (props) => {
  const { doctorId, timeSlot: timeData } = props;
  // console.log(doctorId);
  // console.log(timeData);

  const [fees, setFees] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  //*api call for create doctor service

  const [addDoctorService] = useAddDoctorServiceMutation();

  const handleAddService = async () => {
    if (fees && vacancy && selectedTimeSlot) {
      const backendData = {
        fees,
        availableSeats: parseInt(vacancy),
        slotId: selectedTimeSlot,
        doctorId,
      };

      try {
        const res = await addDoctorService({ ...backendData }).unwrap();
        res?.id && toast.success("Doctor Service data added successfully");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Service</h2>

      {/* Fees Input */}
      <div className="mb-4">
        <label
          htmlFor="fees"
          className="block text-sm font-medium text-gray-700"
        >
          Fees:
        </label>
        <input
          type="text"
          id="fees"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Vacancy Input */}
      <div className="mb-4">
        <label
          htmlFor="vacancy"
          className="block text-sm font-medium text-gray-700"
        >
          Vacancy:
        </label>
        <input
          type="text"
          id="vacancy"
          value={vacancy}
          onChange={(e) => setVacancy(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Time Slot Dropdown */}
      <div className="mb-4">
        <label
          htmlFor="timeSlot"
          className="block text-sm font-medium text-gray-700"
        >
          Select Time Slot:
        </label>
        <select
          id="timeSlot"
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select</option>
          {timeData?.map((timeSlot) => (
            <option key={timeSlot?.id} value={timeSlot?.id}>
              {timeSlot?.day} , {timeSlot?.startTime} - {timeSlot?.EndTime}
            </option>
          ))}
        </select>
      </div>

      {/* Button to Add Service */}
      <button
        onClick={handleAddService}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Add Service
      </button>
    </div>
  );
};

export default AddService;
