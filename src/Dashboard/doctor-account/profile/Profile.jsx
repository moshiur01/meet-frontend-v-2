/* eslint-disable react/prop-types */
import { useState } from "react";
import starIcon from "../../../assets/images/Star.png";
import DoctorDashAbout from "./DoctorDashAbout";
import DoctorDashFeedback from "./DoctorDashFeedback";

const Profile = ({ doctorData }) => {
  const [tab, setTab] = useState("about");

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-3">
            <div className="flex items-center gap-5">
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={doctorData?.photo} alt="" className="w-full" />
              </figure>
              <div>
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2  lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                  {doctorData?.specialization?.name}
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 font-bold mt-2">
                  {doctorData?.name}
                </h3>

                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                    <img src={starIcon} alt="" className="" />
                    {doctorData?.avgRating}
                  </span>

                  <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                    ({doctorData?.totalRating})
                  </span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-bold">Total consultant Patient:</span>
                  <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                    {doctorData?.appointments?.length}
                  </span>
                </div>

                <p className="text__pera  text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]  ">
                  {doctorData?.bio}
                </p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab("about")}
                className={` ${
                  tab === "about" && "border-b border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>

              <button
                onClick={() => setTab("feedback")}
                className={`${
                  tab === "feedback" &&
                  "border-b border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Feedback
              </button>
            </div>

            <div className="mt-[50px]">
              {tab === "about" && <DoctorDashAbout DoctorData={doctorData} />}

              {tab === "feedback" && <DoctorDashFeedback />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
