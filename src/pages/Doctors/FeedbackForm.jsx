/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import { useAddDoctorReviewMutation } from "../../redux/api/DoctorReviweApi";
import { getUserInfo } from "../../services/auth.service";

const FeedbackForm = ({ doctorId }) => {
  // console.log(doctorId);

  const { id: patientId } = getUserInfo();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  //   console.log(rating);

  //*handle rating
  const [addDoctorReview] = useAddDoctorReviewMutation();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const backendData = {
      rating: rating + 1,
      reviewText,
      doctorId,
      patientId,
    };

    try {
      const res = await addDoctorReview({ ...backendData }).unwrap();
      console.log(res);

      if (res !== undefined) {
        toast.success("Thank you for your review");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form action="">
      {/* rating  */}
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          How would you rate the overall experience?{" "}
        </h3>

        <div>
          {[...Array(5).keys()].map((_, index) => {
            index + 1;

            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= ((rating && hover) || hover)
                    ? "text-yellowColor"
                    : "text-gray-400"
                }
              bg-transparent border-none outline-none text-[22px] cursor-pointer
              `}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>{" "}
              </button>
            );
          })}
        </div>
      </div>

      {/* review data  */}
      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share your suggestion{" "}
        </h3>

        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          rows="5"
          placeholder="Enter your message"
          onChange={(e) => setReviewText(e.target.value)}
          required
        ></textarea>
      </div>

      <button type="submit" className="btn" onClick={handleReviewSubmit}>
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
