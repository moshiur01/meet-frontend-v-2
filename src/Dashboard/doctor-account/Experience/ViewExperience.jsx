import { message } from "antd";
import { MdDelete } from "react-icons/md";
import Loading from "../../../components/Loader/Loading";

import {
  useDeleteDoctorExperienceMutation,
  useSpecificDoctorExperienceQuery,
} from "../../../redux/api/doctorExperineceApi";
import { formatDate } from "../../../utils/FormatDate";

/* eslint-disable react/prop-types */
const ViewExperience = ({ doctorId }) => {
  //get data from the api
  const { data: doctorExperienceData, isLoading } =
    useSpecificDoctorExperienceQuery(doctorId);

  //   console.log(doctorExperienceData);

  //*delete education data api
  const [deleteDoctorExperience] = useDeleteDoctorExperienceMutation();

  const handleDeleteExperience = async (experienceId) => {
    message.loading("Please wait");
    try {
      const res = await deleteDoctorExperience(experienceId);

      if (res?.data?.id) {
        message.success("Experience Data deleted successfully");
      } else {
        message.error("Failed to delete experience data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
        Experience
      </h3>

      {isLoading && <Loading />}

      {!isLoading && doctorExperienceData?.length === 0 && (
        <h2 className="mt-5 text-center leading-9 text-[20px] font-semibold text-primaryColor  ">
          You did not add any Experience data Yet!
        </h2>
      )}

      {!isLoading && doctorExperienceData?.length !== 0 && (
        <ul className="pt-4 md:p-5">
          {/* mapping  */}

          {doctorExperienceData?.map((experienceData) => (
            <>
              <li key={experienceData?.id} className="p-4 rounded bg-[#fff9ea]">
                <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                  {formatDate(experienceData?.from)} -{" "}
                  {experienceData?.to === ""
                    ? "Present"
                    : formatDate(experienceData?.to)}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  {experienceData?.designation}
                </p>
                <p className="text-[14px] leading-5 font-medium text-textColor">
                  {experienceData?.WorkPlaceName}
                </p>
                <button
                  onClick={() => handleDeleteExperience(experienceData?.id)}
                >
                  <MdDelete className="text-red-500 text-2xl hover:text-red-700 focus:outline-none mt-2" />
                </button>
              </li>

              {/* handle edit or delete  */}
              <div className="flex gap-3 mb-4 "></div>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewExperience;
