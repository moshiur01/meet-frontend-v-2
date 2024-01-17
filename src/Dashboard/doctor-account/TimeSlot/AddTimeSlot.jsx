/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../components/Loader/Loading";
import {
  useAddTimeSlotMutation,
  useTimeSlotForDoctorQuery,
} from "../../../redux/api/timeSlotByDoctorApi";

const AddTimeSlot = ({ doctorId }) => {
  console.log(doctorId);

  const [selectedDay, setSelectedDay] = useState("");

  //start time
  const [selectedStartHour, setSelectedStartHour] = useState("");
  const [selectedStartMinute, setSelectedStartMinute] = useState("");
  const [selectedStartPeriod, setSelectedStartPeriod] = useState("");

  //end time
  const [selectedEndHour, setSelectedEndHour] = useState("");
  const [selectedEndMinute, setSelectedEndMinute] = useState("");
  const [selectedEndPeriod, setSelectedEndPeriod] = useState("");

  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const hours = Array.from({ length: 12 }, (_, index) =>
    (index + 1).toString()
  );
  const minutes = Array.from(
    { length: 60 },
    (_, index) => (index < 10 ? "0" : "") + index.toString()
  );
  const periods = ["AM", "PM"];

  //*time slot api call
  const [addTimeSlot] = useAddTimeSlotMutation();
  const handlePrintTimeSlot = async () => {
    if (
      selectedDay &&
      selectedStartHour &&
      selectedStartMinute &&
      selectedStartPeriod &&
      selectedEndHour &&
      selectedEndMinute &&
      selectedEndPeriod
    ) {
      const formattedStartTime = `${selectedStartHour}:${selectedStartMinute} ${selectedStartPeriod}`;

      const formattedEndTime = `${selectedEndHour}:${selectedEndMinute} ${selectedEndPeriod}`;

      // console.log(selectedDay, formattedStartTime, formattedEndTime);

      const backendData = {
        doctorId: doctorId,
        day: selectedDay,
        startTime: formattedStartTime,
        EndTime: formattedEndTime,
      };

      try {
        const res = await addTimeSlot({ ...backendData }).unwrap();

        res !== undefined &&
          res?.id &&
          toast.success("Time slot created successfully");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please select all fields.");
    }
  };

  //*api for show time slot data
  const { data: timeSlotData, isLoading: loading } =
    useTimeSlotForDoctorQuery(doctorId);

  // console.log(timeSlotData);

  return (
    <>
      {loading && <Loading />}

      {!loading && (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md text-[20px] font-semibold">
          Your Taken Date and Time:
          <ol type="1" className="mt-8">
            {timeSlotData?.map((timeSlot) => (
              <li key={timeSlot?.id} className="text__pera ">
                {timeSlot?.day}, {timeSlot?.startTime} - {timeSlot?.EndTime}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Time Slot</h2>

        {/* Day Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="day"
            className="block text-sm font-medium text-gray-700"
          >
            Select Day:
          </label>

          {/* ====day==== */}
          <select
            id="day"
            value={selectedDay}
            required
            onChange={(e) => setSelectedDay(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* =====Time Dropdowns==== */}

        <div>
          {/* ===========start Time ============ */}
          <div>
            <label
              htmlFor="day"
              className="block font-[600] text-xl text-gray-700 mb-3"
            >
              Start Time
            </label>

            <div className="flex gap-4 mb-4">
              <div>
                <label
                  htmlFor="hour"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Hour:
                </label>
                <select
                  id="hour"
                  required
                  value={selectedStartHour}
                  onChange={(e) => setSelectedStartHour(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select</option>
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="minute"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Minute:
                </label>
                <select
                  id="minute"
                  required
                  value={selectedStartMinute}
                  onChange={(e) => setSelectedStartMinute(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select</option>
                  {minutes.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="period"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Period:
                </label>
                <select
                  id="period"
                  required
                  value={selectedStartPeriod}
                  onChange={(e) => setSelectedStartPeriod(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select</option>
                  {periods.map((period) => (
                    <option key={period} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ===========end Time ============ */}
          <div>
            <label
              htmlFor="day"
              className="block font-[600] text-xl text-gray-700 mb-3"
            >
              End Time
            </label>

            <div className="flex gap-4 mb-4">
              <div>
                <label
                  htmlFor="hour"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Hour:
                </label>
                <select
                  id="hour"
                  required
                  value={selectedEndHour}
                  onChange={(e) => setSelectedEndHour(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select</option>
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="minute"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Minute:
                </label>
                <select
                  id="minute"
                  required
                  value={selectedEndMinute}
                  onChange={(e) => setSelectedEndMinute(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select</option>
                  {minutes.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="period"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Period:
                </label>
                <select
                  id="period"
                  required
                  value={selectedEndPeriod}
                  onChange={(e) => setSelectedEndPeriod(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select</option>
                  {periods.map((period) => (
                    <option key={period} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Button to Print Selected Time Slot */}
        <button
          onClick={handlePrintTimeSlot}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add Time Slot
        </button>
      </div>
    </>
  );
};

export default AddTimeSlot;
