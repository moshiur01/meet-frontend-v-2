/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import TempUser from "../../assets/images/tempUser.jpg";
import Loading from "../../components/Loader/Loading";
import { useSpecificDoctorReviewsQuery } from "../../redux/api/DoctorReviweApi";
import { getUserInfo } from "../../services/auth.service";
import FeedbackForm from "./FeedbackForm";

const DoctorFeedback = ({ doctorId }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const { id: userId } = getUserInfo();

  //* get specific doctor review api call
  const { data: doctorReviewData, isLoading } =
    useSpecificDoctorReviewsQuery(doctorId);

  console.log(doctorReviewData);

  return (
    <div className="">
      {isLoading && <Loading />}

      {!isLoading && doctorReviewData.length === 0 && (
        <h2 className="mt-5 text-center leading-9 text-[20px] font-semibold text-primaryColor  ">
          The doctor has not received any feedback yet.
        </h2>
      )}

      {!isLoading && (
        <div className="mb-[50px]">
          <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
            All Reviews ({doctorReviewData?.length})
          </h4>

          <div
            className="reviews-container"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {doctorReviewData?.map((singleReview) => (
              <div key={singleReview?.id} className="mb-4">
                <div className="flex gap-3">
                  <figure className="w-10 h-10 border border-black rounded-full">
                    <img
                      className="w-full"
                      src={singleReview?.patient?.photo || TempUser}
                      alt=""
                    />
                  </figure>
                  <div>
                    <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                      {singleReview?.patient?.name || "Unknown Author"}
                    </h5>
                    <div className="flex gap-1">
                      {[...Array(singleReview?.rating).keys()].map(
                        (_, index) => (
                          <AiFillStar key={index} color="#FEB60D" />
                        )
                      )}
                    </div>
                    <p className="text__pera mt-3 font-medium text-[15px]">
                      {singleReview?.reviewText || "No comment available"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!showFeedbackForm && userId && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <FeedbackForm doctorId={doctorId} />}
    </div>
  );
};

export default DoctorFeedback;
