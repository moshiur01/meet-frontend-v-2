import { DatePicker, message } from "antd";
import moment from "moment";
import { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import Loading from "../../../components/Loader/Loading";
import {
  useDeleteDoctorEducationMutation,
  useSpecificDoctorEducationQuery,
  useUpdateDoctorEducationMutation,
} from "../../../redux/api/doctorEducationApi";
import { formatDate } from "../../../utils/FormatDate";

/* eslint-disable react/prop-types */
const ViewQualification = ({ doctorId }) => {
  //get data from the api
  const { data: doctorEducationData, isLoading } =
    useSpecificDoctorEducationQuery(doctorId);

  const [editIndex, setEditIndex] = useState(-1);
  const [editEducationId, setEditEducationId] = useState(null);

  const startEditing = (index, educationId) => {
    setEditIndex(index);
    setEditEducationId(educationId);

    // Set initial values in the form fields
    setQualificationData({
      degreeName: doctorEducationData[index]?.degreeName || "",
      universityName: doctorEducationData[index]?.universityName || "",
      from: doctorEducationData[index]?.from || "",
      to: doctorEducationData[index]?.to || "",
    });
  };

  const stopEditing = () => {
    setEditIndex(-1);
    setEditEducationId(null);
  };

  //store the form data
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

  //*edit educational data
  const [updateDoctorEducation] = useUpdateDoctorEducationMutation();
  const handleUpdateEducation = async (e) => {
    e.preventDefault();

    message.loading("Please wait...");
    try {
      const res = await updateDoctorEducation({
        id: editEducationId,
        body: qualificationData,
      });

      if (res?.data?.id) {
        message.success("Education data updated successfully");
      } else {
        message.error("Failed to update data");
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

    stopEditing();
  };

  //*delete education data api
  const [deleteDoctorEducation] = useDeleteDoctorEducationMutation();
  const handleDeleteEducation = async (editEducationId) => {
    message.loading("Please wait");
    try {
      const res = await deleteDoctorEducation(editEducationId);

      if (res?.data?.id) {
        message.success("Educational Data deleted successfully");
      } else {
        message.error("Failed to delete educational data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
        Education
      </h3>

      {isLoading && <Loading />}

      {!isLoading && doctorEducationData?.length === 0 && (
        <h2 className="mt-5 text-center leading-9 text-[20px] font-semibold text-primaryColor  ">
          You did not add any Educational data!
        </h2>
      )}

      {!isLoading && doctorEducationData?.length !== 0 && (
        <ul className="pt-4 md:p-5">
          {/* mapping  */}

          {doctorEducationData?.map((educationData, index) => (
            <>
              <li
                key={educationData?.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
              >
                <div>
                  <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                    {formatDate(educationData?.from)} -{" "}
                    {formatDate(educationData?.to)}
                  </span>
                  <p className="text-[16px] leading-6 font-medium text-textColor">
                    {educationData?.degreeName}
                  </p>
                </div>

                <p className="text-[14px] leading-5 font-medium text-textColor">
                  {educationData?.universityName}
                </p>
              </li>

              {/* handle edit or delete  */}
              <div className="flex gap-3 mb-4 ">
                <button
                  className=""
                  onClick={() => startEditing(index, educationData?.id)}
                >
                  <MdEditSquare className="text-green-600 text-xl " />
                </button>
                <button
                  onClick={() => handleDeleteEducation(educationData?.id)}
                >
                  <MdDelete className="text-red-500 hover:text-red-700 focus:outline-none text-xl" />
                </button>
              </div>

              {editIndex === index && (
                <form
                  className="mb-4"
                  onSubmit={(e) => handleUpdateEducation(e, index)}
                >
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
                      value={qualificationData?.degreeName}
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
                      value={qualificationData?.universityName}
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
                        value={
                          qualificationData?.from
                            ? moment(qualificationData?.from)
                            : null
                        }
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
                        value={
                          qualificationData?.to
                            ? moment(qualificationData?.to)
                            : null
                        }
                        onChange={(date, dateString) =>
                          handleDateChange("to", date, dateString)
                        }
                      />
                    </div>
                  </div>

                  {/* Submit Button */}

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
                    >
                      Update
                    </button>

                    <button
                      type="button"
                      onClick={stopEditing}
                      className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </>
          ))}
        </ul>
      )}
      {/* map will done here */}
    </div>
  );
};

export default ViewQualification;
