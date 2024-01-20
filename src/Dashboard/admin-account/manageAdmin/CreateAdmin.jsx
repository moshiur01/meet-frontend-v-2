/* eslint-disable no-unused-vars */
import { message } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAddAdminMutation } from "../../../redux/api/adminApi";

const CreateAdmin = () => {
  const [selectFile, setSelectFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    photo:
      "https://www.shutterstock.com/image-vector/user-icon-vector-260nw-393536320.jpg",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //* image upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    // Preview the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setSelectFile(file);
      setPreviewUrl(reader.result);

      // Set the photo in formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        photo: file,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  //* password icon visibility
  const [passwordShow, setPasswordShow] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordShow(!passwordShow);
  };

  //*crate admin api handler
  const [addAdmin] = useAddAdminMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if the email contains "@gmail.com"
    if (!formData.email.includes("@gmail.com")) {
      toast.error("Invalid Email");
      return;
    }
    try {
      message.loading("Please wait...");
      const res = await addAdmin(formData);
      // console.log(res);
      res?.data?.id && toast.success("Admin data inserted successfully");
    } catch (error) {
      console.log(error);
    }

    // console.log(formData);
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1  lg:grid-cols-2">
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create New Admin
            </h3>

            <form onSubmit={submitHandler}>
              {/* name  */}
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  className="w-full px-4  py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-lg"
                  required
                />
              </div>

              {/* phone  */}
              <div className="mb-5">
                <input
                  type="number"
                  name="phoneNumber"
                  placeholder="Enter Phone number"
                  value={formData?.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4  py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-lg"
                  required
                />
              </div>

              {/* email  */}
              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  className="w-full  px-4  py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-lg"
                  required
                />
              </div>

              {/* password  */}
              <div className="mb-5 relative">
                <input
                  type={!passwordShow ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData?.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-lg"
                  required
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute top-5 right-0"
                >
                  {passwordShow ? (
                    <FaEyeSlash className="w-10" />
                  ) : (
                    <FaEye className="w-10" />
                  )}
                </span>
              </div>

              {/* create btn  */}
              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                  // onClick={handleLogin}
                >
                  Create New Admin{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateAdmin;
