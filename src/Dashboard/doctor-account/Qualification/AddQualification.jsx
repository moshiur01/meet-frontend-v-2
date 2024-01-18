/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { DatePicker, message } from "antd";
import { useState } from "react";
import { useAddDoctorEducationMutation } from "../../../redux/api/doctorEducationApi";
import ViewQualification from "./ViewQualification";

const AddQualification = ({ doctorId }) => {
  const [tab, setTab] = useState("viewEducation");

  const [qualificationData, setQualificationData] = useState({
    degreeName: "",
    universityName: "",
    from: "",
    to: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQualificationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (type, date, dateString) => {
    setQualificationData((prevData) => ({
      ...prevData,
      [type]: dateString,
    }));
  };

  //* API call
  const [addDoctorEducation] = useAddDoctorEducationMutation();
  const handleUpdateEducation = async (e) => {
    e.preventDefault();

    message.loading("Please wait...");
    try {
      const res = await addDoctorEducation({ ...qualificationData, doctorId });

      console.log(res);

      if (res?.data?.id) {
        message.success("Education data added successfully");
      }
    } catch (error) {
      console.log(error);
    }

    // Reset the form
    setQualificationData({
      degreeName: "",
      universityName: "",
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
            <h2 className="text-2xl font-semibold mb-4">
              Add Educational Data
            </h2>
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
              onClick={() => setTab("viewEducation")}
              className={` ${
                tab === "viewEducation" &&
                "border-b border-solid border-primaryColor"
              } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
            >
              View
            </button>
          </div>

          <div className="mt-[50px]">
            {tab === "viewEducation" && (
              <ViewQualification doctorId={doctorId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQualification;
