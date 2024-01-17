/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { bloodGroupOptions } from "../../constrains/Global";
import { useUpdatePatientMutation } from "../../redux/api/patient/patientApi";
import uploadImage from "../../utils/UploadImageToCloudinary";

const ProfileSetting = ({ user }) => {
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

    bloodType: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      password: user?.password,
      gender: user?.gender,
      bloodType: user?.bloodType,
    });
  }, [user]);

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

  //*signUp api handler
  const [updatePatient] = useUpdatePatientMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData?.photo) {
      const res = await updatePatient({
        id: user?.id,
        body: formData,
      }).unwrap();

      res.id && toast.success("Profile Updated successfully");
    }

    if (formData?.photo) {
      const uploadImageLink = await uploadImage(formData?.photo);

      const photoUrl = uploadImageLink?.secure_url;

      formData.photo = photoUrl;

      const res = await updatePatient({
        id: user?.id,
        body: formData,
      }).unwrap();

      res.id && toast.success("Profile Updated successfully");
    }

    // const uploadImageLink = await uploadImage(formData?.photo);

    // console.log(uploadImageLink);
    console.log(formData);
    // console.log(res);
    // console.log(formData);
  };

  return (
    <section>
      <div>
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
          {/* phone  */}
          <div className="mb-5">
            <input
              type="text"
              name="phone"
              placeholder="Enter Your Phone number"
              value={formData?.phone}
              onChange={handleInputChange}
              className="w-full px-4  py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-sm"
              required
            />
          </div>
          {/* email  */}
          <div className="mb-5">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData?.email}
              onChange={handleInputChange}
              className="w-full  px-4  py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-sm"
              required
            />
          </div>
          {/* password  */}
          <div className="mb-5 relative">
            <input
              type={!passwordShow ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              value={formData?.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-sm"
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
          {/* dropdown  */}
          <div className="mb-5 flex items-center justify-between">
            {/* bloodGroup dropdown */}

            <label className="text-headingColor font-bold text-[16px] leading-7">
              Select Blood Group
              <select
                name="bloodType"
                value={formData?.bloodType}
                onChange={handleInputChange}
                className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              >
                <option value=""> Select</option>
                {bloodGroupOptions.map((bloodGroup) => (
                  <option key={bloodGroup.value} value={bloodGroup.value}>
                    {bloodGroup.label}
                  </option>
                ))}
              </select>
            </label>

            {/* gender dropdown */}
            <label className="text-headingColor font-bold text-[16px] leading-7">
              Gender:
              <select
                name="gender"
                value={formData?.gender}
                onChange={handleInputChange}
                className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              >
                <option value=""> Select</option>
                <option value="male"> Male</option>
                <option value="female"> Female</option>
              </select>
            </label>
          </div>
          upload image
          <div className="mb-5 flex items-center gap-3">
            <figure className="w-[60px] h-[60px] rounded-full border-4 border-solid border-primaryColor flex items-center justify-center">
              <img src={previewUrl} alt="" className="w-full rounded-full" />
            </figure>

            <div className="relative w-[130px] h-[50px]">
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
                className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer "
              >
                Upload Photo
              </label>
            </div>
          </div>
          {/* user update profile btn  */}
          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              // onClick={handleLogin}
            >
              Update Profile{" "}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfileSetting;
