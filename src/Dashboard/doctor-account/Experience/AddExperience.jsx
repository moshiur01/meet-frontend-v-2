/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { DatePicker, message } from "antd";
import { useState } from "react";

import { useAddDoctorExperienceMutation } from "../../../redux/api/doctorExperineceApi";
import ViewExperience from "./ViewExperience";

const AddExperience = ({ doctorId }) => {
  console.log(doctorId);
  const [tab, setTab] = useState("view");

  const [ExperienceData, setExperienceData] = useState({
    designation: "",
    WorkPlaceName: "",
    from: "",
    to: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExperienceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (type, date, dateString) => {
    setExperienceData((prevData) => ({
      ...prevData,
      [type]: dateString,
    }));
  };

  //* API call
  const [addDoctorExperience] = useAddDoctorExperienceMutation();
  const handleUpdateEducation = async (e) => {
    e.preventDefault();

    message.loading("Please wait...");
    try {
      const res = await addDoctorExperience({ ...ExperienceData, doctorId });

      if (res?.data?.id) {
        message.success("Experience data added successfully");
      }
    } catch (error) {
      console.log(error);
    }

    // Reset the form
    setExperienceData({
      designation: "",
      WorkPlaceName: "",
      from: "",
      to: "",
    });
  };

  return (
    <div className="max-w-[1170px] px-5 mx-auto">
      <div className="grid md:grid-cols-3 gap-[50px]">
        <div className="md:col-span-3">
          {/* //*add education data  */}

          <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add Experience Data</h2>
            <form onSubmit={handleUpdateEducation}>
              {/* designation Name */}
              <div className="mb-4">
                <label
                  htmlFor="designationName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Designation Name
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={ExperienceData.designation}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
              </div>

              {/* work place Name */}
              <div className="mb-4">
                <label
                  htmlFor="universityName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Work Place Name
                </label>
                <input
                  type="text"
                  id="WorkPlaceName"
                  name="WorkPlaceName"
                  value={ExperienceData.WorkPlaceName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
              </div>

              <div className="flex justify-between">
                {/* From Date */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    From Date
                  </label>
                  <DatePicker
                    onChange={(date, dateString) =>
                      handleDateChange("from", date, dateString)
                    }
                  />
                </div>

                {/* To Date */}
                <div className="mb-4 ">
                  <label className="block text-sm font-medium text-gray-700">
                    To Date
                  </label>
                  <DatePicker
                    onChange={(date, dateString) =>
                      handleDateChange("to", date, dateString)
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Add
              </button>
            </form>
          </div>

          {/* navigate between view and edit  */}

          <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
            <button
              onClick={() => setTab("view")}
              className={` ${
                tab === "view" && "border-b border-solid border-primaryColor"
              } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
            >
              View
            </button>
          </div>

          <div className="mt-[50px]">
            {tab === "view" && <ViewExperience doctorId={doctorId} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExperience;
