/* eslint-disable no-unused-vars */
import { message } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAddRoomMutation } from "../../../redux/api/roomApi";

const CreateRoom = () => {
  const [formData, setFormData] = useState({
    roomNumber: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //*crate specialization api handler
  const [addRoom] = useAddRoomMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      message.loading("Please wait...");
      const res = await addRoom(formData);
      // console.log(res);

      if (res?.data === undefined) {
        message.error("Failed to Create Room");
      }
      res?.data?.id && toast.success("Room created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1  lg:grid-cols-2">
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create Room
            </h3>

            <form onSubmit={submitHandler}>
              {/* name  */}
              <div className="mb-5">
                <input
                  type="text"
                  name="roomNumber"
                  placeholder="Enter Room Number"
                  value={formData?.roomNumber}
                  onChange={handleInputChange}
                  className="w-full px-4  py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-lg"
                  required
                />
              </div>

              {/* create btn  */}
              <div className="mt-7">
                <button
                  type="submit"
                  className="w-40 bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                  // onClick={handleLogin}
                >
                  Create{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateRoom;
