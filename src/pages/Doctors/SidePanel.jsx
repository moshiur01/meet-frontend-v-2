/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const SidePanel = ({ id }) => {
  console.log(id?.id);
  return (
    <div className=" shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__pera mt-0 font-semibold">Appointment Fee</p>

        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {" "}
          500 BDT
        </span>
      </div>
      <div className="mt-[30px] ">
        <p className="text__pera mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {/* map here  */}
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Sunday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              4.00 PM - 9.30 PM
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Tuesday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              4.00 PM - 9.30 PM
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Wednesday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              4.00 PM - 9.30 PM
            </p>
          </li>
        </ul>
      </div>

      <Link to={`/booking-details/${id?.id}`}>
        <button className="btn  px-2 w-full rounded-md font-[700] hover:bg-irisBlueColor duration-700 ">
          Book Appointment
        </button>
      </Link>
    </div>
  );
};

export default SidePanel;
