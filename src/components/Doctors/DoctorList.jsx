import { useDoctorsQuery } from "../../redux/api/doctorApi.js";
import Loading from "../Loader/Loading.jsx";
import DoctorCard from "./DoctorCard.jsx";
const DoctorList = () => {
  const { data, isLoading } = useDoctorsQuery({ page: 1, limit: 3 });
  // console.log(data);

  const doctors = data?.doctors?.data;
  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2  gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {doctors?.map((doctor) => (
            <DoctorCard key={doctor?.id} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
};

export default DoctorList;
