/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loader/Loading";
import {
  useSpecializationQuery,
  useUpdateSpecializationMutation,
} from "../../../redux/api/specializationApi";

const EditSpecialization = () => {
  const { id } = useParams();

  //*get specialization data

  const { data, isLoading } = useSpecializationQuery(id);

  const [selectFile, setSelectFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData({
      name: data?.name,
    });
  }, [data]);

  //*update data api handler
  const [updateSpecialization] = useUpdateSpecializationMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    message.loading("Please wait...");

    try {
      const res = await updateSpecialization({
        id,

        body: formData,
      });

      //   console.log(res);

      if (res?.data?.id) {
        message.success("Specialization name updated");
      } else {
        message.error("Failed to create specialization");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      {isLoading && <Loading />}

      {!isLoading && (
        <div className="w-[400px] mx-auto">
          <form onSubmit={submitHandler}>
            {/* name  */}
            <div className="mb-5">
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formData?.name}
                onChange={handleInputChange}
                className="w-full px-4  py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-sm"
                required
              />
            </div>

            {/* specialization update profile btn  */}
            <div className="mt-7">
              <button
                type="submit"
                className="w-30 bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-3 py-2"
              >
                Update{" "}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default EditSpecialization;
