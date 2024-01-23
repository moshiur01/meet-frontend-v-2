import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loader/Loading";
import { authKey } from "../../constrains/storageKey";

import { useMedicineManQuery } from "../../redux/api/medicineManApi";
import { getUserInfo, removeUserInfo } from "../../services/auth.service";
import MedicineManChangePassword from "./MedicineManChangePassword";
import MedicineManProfile from "./MedicineManProfile";
import MedicineStatus from "./MedicineStatus";

const MedicineManAccount = () => {
  const { id } = getUserInfo();

  // console.log(id);

  const navigate = useNavigate();
  const handleLogout = () => {
    removeUserInfo(authKey);
    navigate("/login");
    window.location.reload();
  };

  //active tab state
  const [tab, setTab] = useState("medicine");

  const { data: medicineManData, isLoading: loading } = useMedicineManQuery(id);

  //   console.log(medicineManData);

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
                    src={medicineManData?.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {medicineManData?.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {medicineManData?.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Phone Number:
                  <span className="ml-2 text-headingColor text-[18px] leading-8">
                    {medicineManData?.phoneNumber}
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
                  onClick={() => setTab("medicine")}
                  className={`${
                    tab === "medicine"
                      ? "bg-primaryColor text-white font-normal"
                      : ""
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Medicine Status
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
                <button
                  onClick={() => setTab("changePassword")}
                  className={`${
                    tab === "changePassword"
                      ? "bg-primaryColor text-white font-normal"
                      : ""
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Change Password
                </button>
              </div>

              {/* conditional render tab content  */}

              {tab === "medicine" && <MedicineStatus />}
              {tab === "changePassword" && (
                <MedicineManChangePassword user={medicineManData} />
              )}
              {tab === "profileSetting" && (
                <MedicineManProfile user={medicineManData} />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MedicineManAccount;
