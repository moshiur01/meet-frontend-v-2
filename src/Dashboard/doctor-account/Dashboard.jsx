import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loader/Loading";
import { authKey } from "../../constrains/storageKey";
import { useDoctorQuery } from "../../redux/api/doctorApi";
import { getUserInfo, removeUserInfo } from "../../services/auth.service";
import AddExperience from "./Experience/AddExperience";
import AppointmentDetails from "./PatientAppointment/AppointmentDetails";
import PatientPrescription from "./PatientAppointment/PatientPriscription";
import AddQualification from "./Qualification/AddQualification";
import AddService from "./Services/AddService";
import AddTimeSlot from "./TimeSlot/AddTimeSlot";
import Profile from "./profile/Profile";

const DoctorDashboard = () => {
  const { id } = getUserInfo();
  const [activeTab, setActiveTab] = useState("profile");

  // const handleTabClick = (tab) => {
  //   setActiveTab(tab);
  // };

  const { data: doctorData, isLoading: loading } = useDoctorQuery(id);

  // console.log(doctorData);

  const navigate = useNavigate();
  const handleLogout = () => {
    removeUserInfo(authKey);
    navigate("/login");
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loading />}

        {!loading && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <div className="shadow-panelShadow p-4 rounded-md bg-white">
                {/* Sidebar panel start  */}

                {/* Tabs */}
                <div className="mt-6 flex  flex-col justify-center gap-8">
                  {/* my-profile  */}
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`${
                      activeTab === "profile"
                        ? "bg-irisBlueColor text-white font-normal"
                        : ""
                    } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border-b-2`}
                  >
                    My Profile
                  </button>

                  {/* my-appointments  */}
                  <button
                    onClick={() => setActiveTab("appointments")}
                    className={`${
                      activeTab === "appointments"
                        ? "bg-irisBlueColor text-white font-normal"
                        : ""
                    } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border-b-2`}
                  >
                    Appointments
                  </button>

                  {/* add Patient prescription  */}
                  <button
                    onClick={() => setActiveTab("prescription")}
                    className={`${
                      activeTab === "prescription"
                        ? "bg-irisBlueColor text-white font-normal"
                        : ""
                    } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border-b-2`}
                  >
                    Add Prescription
                  </button>

                  {/* qualification  */}
                  <button
                    onClick={() => setActiveTab("qualification")}
                    className={`${
                      activeTab === "qualification"
                        ? "bg-irisBlueColor text-white font-normal"
                        : ""
                    } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border-b-2`}
                  >
                    Add Qualification
                  </button>

                  {/* experience  */}
                  <button
                    onClick={() => setActiveTab("experience")}
                    className={`${
                      activeTab === "experience"
                        ? "bg-irisBlueColor text-white font-normal"
                        : ""
                    } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border-b-2`}
                  >
                    Add Experience
                  </button>

                  {/* time slot  */}
                  <button
                    onClick={() => setActiveTab("timeSlot")}
                    className={`${
                      activeTab === "timeSlot"
                        ? "bg-irisBlueColor text-white font-normal"
                        : ""
                    } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border-b-2`}
                  >
                    Add Time Slot
                  </button>

                  {/* add service  */}
                  <button
                    onClick={() => setActiveTab("service")}
                    className={`${
                      activeTab === "service"
                        ? "bg-irisBlueColor text-white font-normal"
                        : ""
                    } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border-b-2`}
                  >
                    Add Service
                  </button>
                </div>

                {/* logout  */}
                <div className="mt-[30px] md:mt-[100xp]">
                  <button
                    className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md font-semibold text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  {/* <button className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md">Delete Account</button>  */}
                </div>
              </div>
            </div>

            {/* Content based on the selected tab */}
            <div className="col-span-2 bg-gray-100 p-6 rounded-md">
              {activeTab === "profile" && (
                <div>
                  <Profile doctorData={doctorData} />
                </div>
              )}
              {activeTab === "appointments" && (
                <div>
                  <AppointmentDetails doctorId={doctorData?.id} />
                </div>
              )}

              {activeTab === "prescription" && (
                <div>
                  <PatientPrescription doctorId={doctorData?.id} />
                </div>
              )}

              {activeTab === "qualification" && (
                <div>
                  <AddQualification />
                </div>
              )}
              {activeTab === "experience" && (
                <div>
                  <AddExperience />
                </div>
              )}
              {activeTab === "timeSlot" && (
                <div>
                  <AddTimeSlot doctorId={doctorData?.id} />
                </div>
              )}
              {activeTab === "service" && (
                <div>
                  <AddService
                    doctorId={doctorData?.id}
                    timeSlot={doctorData?.timeSlots}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDashboard;
