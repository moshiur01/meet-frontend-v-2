/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUpdateDoctorMutation } from "../../../redux/api/doctorApi";
import uploadImage from "../../../utils/UploadImageToCloudinary";

/* eslint-disable react/prop-types */
const EditProfile = ({ doctorData }) => {
  //   console.log(doctorData);

  const [selectFile, setSelectFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2a4xxU0NG6NU0MrfhXkenFNvNMFScB1eDRokLNrMP8seq585qB4EKsddo-1_T6WDTu1g&usqp=CAU",
    gender: "",

    bio: "",
    about: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      phone: doctorData?.phone,
      email: doctorData?.email,
      password: doctorData?.password,
      photo: doctorData?.photo,
      gender: doctorData?.gender,
      bio: doctorData?.bio,
      about: doctorData?.about,
    });
  }, [doctorData]);

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

  //*handle update doctor data api

  const [updateDoctor] = useUpdateDoctorMutation();
  const submitHandler = async (e) => {
    e.preventDefault();

    if (previewUrl) {
      toast.loading("please wait...", {
        duration: 2500,
      });

      const uploadImageLink = await uploadImage(formData?.photo);

      const photoUrl = uploadImageLink?.secure_url;

      formData.photo = photoUrl;

      const res = await updateDoctor({
        id: doctorData?.id,
        body: formData,
      }).unwrap();
      res.id && toast.success("Profile Updated successfully");
    }

    if (!previewUrl) {
      toast.loading("please wait...", {
        duration: 2500,
      });

      const res = await updateDoctor({
        id: doctorData?.id,
        body: formData,
      });

      res.id && toast.success("Profile Updated successfully");
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="max-w-sm mx-auto">
        {/* name */}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData?.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[18px] leading-6 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-sm"
          />
        </div>
        {/* phone */}
        <div className="mb-4">
          <input
            type="text"
            name="phone"
            placeholder="Enter Your Phone number"
            value={formData?.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[18px] leading-6 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-sm"
            required
          />
        </div>
        {/* email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData?.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[18px] leading-6 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-sm"
            required
          />
        </div>
        {/* password */}
        <div className="mb-4 relative">
          <input
            type={!passwordShow ? "text" : "password"}
            name="password"
            placeholder="Enter Your Password"
            value={formData?.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[18px] leading-6 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-sm"
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute top-3 right-0"
          >
            {passwordShow ? (
              <FaEyeSlash className="w-8" />
            ) : (
              <FaEye className="w-8" />
            )}
          </span>
        </div>
        {/* dropdown */}
        <div className="flex justify-between mb-4">
          {/* gender dropdown */}
          <label className="text-headingColor font-bold text-[16px] leading-6">
            Gender:
            <select
              name="gender"
              value={formData?.gender}
              onChange={handleInputChange}
              className="text-textColor font-semibold text-[15px] leading-6 px-3 py-2 focus:outline-none"
            >
              <option value=""> Select</option>
              <option value="male"> Male</option>
              <option value="female"> Female</option>
            </select>
          </label>
          {/* upload image */}
          <div className="flex items-center gap-2">
            <figure className="w-12 h-12 rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img src={previewUrl} alt="" className="w-full rounded-full" />
            </figure>
            <div className="relative w-[100px] h-[40px]">
              <input
                type="file"
                name="photo"
                id="customFile"
                accept=".jpg, .png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 w-full h-full flex items-center px-2 py-1 text-[12px] leading-5 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer "
              >
                Upload
              </label>
            </div>
          </div>
        </div>
        {/* bio */}
        <div className="mb-4">
          <textarea
            type="text"
            name="bio"
            rows={3}
            placeholder="Enter Your Bio"
            value={formData?.bio}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[18px] leading-6 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-sm"
            required
          />
        </div>
        {/* about */}
        <div className="mb-4">
          <textarea
            type="text"
            name="about"
            rows={5}
            placeholder="Write something about yourself"
            value={formData?.about}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[18px] leading-6 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-sm"
            required
          />
        </div>
        {/* user update profile btn */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-primaryColor text-white text-[16px] leading-[26px] rounded-lg px-3 py-2"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
