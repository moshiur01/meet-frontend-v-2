/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Loading from "../../components/Loader/Loading";
import { useSingleDoctorServiceQuery } from "../../redux/api/doctorServiceApi";

const SidePanel = ({ id }) => {
  // console.log('doctorId', id);

  const { data: DoctorServiceData, isLoading: loading } =
    useSingleDoctorServiceQuery(id);

  // console.log(DoctorServiceData);

  const appointmentFee = DoctorServiceData?.[0]?.fees || 0;

  return (
    <>
      {loading && <Loading />}

      {!loading && DoctorServiceData && (
        <div className=" shadow-panelShadow p-3 lg:p-5 rounded-md">
          <div className="flex items-center justify-between">
            <p className="text__pera mt-0 font-semibold">Appointment Fee</p>

            <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
              {" "}
              {appointmentFee} BDT
            </span>
          </div>
          <div className="mt-[30px] ">
            <p className="text__pera mt-0 font-semibold text-headingColor">
              Available Time Slots:
            </p>
            <ul className="mt-3">
              {/* map here  */}

              {DoctorServiceData &&
                DoctorServiceData.map((serviceData) => (
                  // eslint-disable-next-line react/jsx-key
                  <li
                    className="flex items-center justify-between mb-2"
                    key={serviceData?.id}
                  >
                    <p className="text-[15px] leading-6 text-textColor font-semibold">
                      {serviceData?.slot?.day}
                    </p>
                    <p className="text-[15px] leading-6 text-textColor font-semibold">
                      {serviceData?.slot?.startTime} -
                      {serviceData?.slot?.EndTime}
                    </p>
                  </li>
                ))}
            </ul>
          </div>

          <Link to={`/booking-details/${id}`}>
            <button className="btn  px-2 w-full rounded-md font-[700] hover:bg-irisBlueColor duration-700 ">
              See Details
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default SidePanel;
