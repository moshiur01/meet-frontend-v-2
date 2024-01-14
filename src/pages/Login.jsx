import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useUserLoginMutation } from "../redux/api/authApi";
import { storeUserInfo } from "../services/auth.service";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [passwordShow, setPasswordShow] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordShow(!passwordShow);
  };

  const [userLogin] = useUserLoginMutation();
  //*api call for login
  const handleLogin = async () => {
    window.alert("Please wait...");
    try {
      const res = await userLogin({ ...formData }).unwrap();
      // console.log(res);
      if (res?.accessToken) {
        window.alert("User logged in successfully!");
        storeUserInfo({ accessToken: res?.accessToken });

        navigate("/home");
      } else {
        window.alert("User email or password is incorrect");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 text-center">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          <span className="text-primaryColor">WellCome</span> Back
        </h3>
        <form className="py-4 md:py-0">
          {/* email  */}
          <div className="mb-5">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData?.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-lg"
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

          <div className="mt-7">
            <button
              type="button"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              onClick={handleLogin}
            >
              Login{" "}
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Don@apos;t have an account?{" "}
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
