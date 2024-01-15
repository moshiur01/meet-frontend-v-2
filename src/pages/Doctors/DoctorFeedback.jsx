import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import TempUser from "../../assets/images/tempUser.jpg";
import { formatDate } from "../../utils/FormatDate";
import FeedbackForm from "./FeedbackForm";

const DoctorFeedback = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All Reviews (10)
        </h4>

        <div className="flex justify-between gap-10 mb-[30px]">
          <div className="flex gap-3 ">
            <figure className="w-14 h-10  border  border-black rounded-full">
              <img className="w-full" src={TempUser} alt="" />
            </figure>
            <div>
              <h5 className="text-[16px] leading-6  text-primaryColor font-bold">
                Ali Ahmed
              </h5>
              <p className="text-[14px] leading-6 text-textColor">
                {formatDate("02-14-2018")}
              </p>
              <p className="text__pera mt-3 font-medium text-[15px]">
                Good services, highly recommended
              </p>
            </div>
          </div>

          <div className="flex gap-1">
            {[...Array(5).keys()].map((_, index) => (
              <AiFillStar key={index} color="#0067FF" />
            ))}
          </div>
        </div>
      </div>
      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default DoctorFeedback;
