import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loader/Loading";
import { authKey } from "../../constrains/storageKey";
import { usePatientQuery } from "../../redux/api/patient/patientApi";
import { getUserInfo, removeUserInfo } from "../../services/auth.service";
import MyBooking from "./MyBooking";
import ProfileSetting from "./ProfileSetting";

const MyAccount = () => {
  const { id } = getUserInfo();

  // console.log(id);

  const navigate = useNavigate();
  const handleLogout = () => {
    removeUserInfo(authKey);
    navigate("/login");
    window.location.reload();
  };

  //active tab state

  const [tab, setTab] = useState("booking");

  const { data: patientData, isLoading: loading } = usePatientQuery(id);

  //   console.log(patientData);

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loading />}

        {!loading && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                {/* show user info  */}
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={patientData?.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {patientData?.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {patientData?.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Phone Number:
                  <span className="ml-2 text-headingColor text-[18px] leading-8">
                    {patientData?.phone}
                  </span>
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:
                  <span className="ml-2 text-headingColor text-[18px] leading-8">
                    {patientData?.bloodType}
                  </span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100xp]">
                <button
                  className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                {/* <button className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md">Delete Account</button>  */}
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("booking")}
                  className={`${
                    tab === "booking"
                      ? "bg-primaryColor text-white font-normal"
                      : ""
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  My Booking
                </button>
                <button
                  onClick={() => setTab("profileSetting")}
                  className={`${
                    tab === "profileSetting"
                      ? "bg-primaryColor text-white font-normal"
                      : ""
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>

              {/* conditional render tab content  */}

              {tab === "booking" && <MyBooking />}
              {tab === "profileSetting" && (
                <ProfileSetting user={patientData} />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
