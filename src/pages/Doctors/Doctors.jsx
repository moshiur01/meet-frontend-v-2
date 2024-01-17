import { useState } from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Loading from "../../components/Loader/Loading";
import UserReviewHomeList from "../../components/userReviewHome/UserReviewHomeList";
import { useDoctorsQuery } from "../../redux/api/doctorApi";
const Doctors = () => {
  const query = {};

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  const { data, isLoading } = useDoctorsQuery({ ...query });

  const doctors = data?.doctors?.data;

  // console.log(doctors);

  return (
    <>
      {/* search  */}
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between ">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search a doctor"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md">
              Search
            </button>
          </div>
        </div>
      </section>
      {isLoading && <Loading />}

      {!isLoading && doctors && (
        <section>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2  lg:grid-cols-4 gap-5 ">
              {doctors?.map((doctor) => (
                <DoctorCard key={doctor?.id} doctor={doctor} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* user review  */}

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center ">What our patient say</h2>
            <p className="text__pera text-center">
              See what our patients think about us
            </p>
          </div>
          <UserReviewHomeList />
        </div>
      </section>
    </>
  );
};

export default Doctors;
