import { Pagination } from "antd";
import { useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import DoctorCard from "../../components/Doctors/DoctorCard";
import DoctorSpecializationInput from "../../components/Forms/DoctorSpecializationInput";
import Loading from "../../components/Loader/Loading";
import UserReviewHomeList from "../../components/userReviewHome/UserReviewHomeList";
import { useDoctorsQuery } from "../../redux/api/doctorApi";

const Doctors = () => {
  const query = {};

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationId, setSpecializationId] = useState({});

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;
  query["specializationId"] = specializationId?.value;

  const { data, isLoading } = useDoctorsQuery({ ...query });

  const doctors = data?.doctors?.data;
  const meta = data?.doctors?.meta;

  const handlePaginationChange = (newPage) => {
    setPage(newPage);
  };

  const resetFilter = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
    setSpecializationId("");
  };

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

          <div className="mt-4 ">
            <p className="mr-12 mb-2">choose category</p>
            <DoctorSpecializationInput
              style={{
                marginLeft: "10px",
              }}
              setSpecializationId={setSpecializationId}
              specializationId={specializationId}
              placeholder="Select Category"
            />
            <button
              className="ml-6 px-4 py-2 border border-irisBlueColor rounded-full transition duration-300 ease-in-out hover:bg-irisBlueColor hover:text-white focus:outline-none focus:shadow-outline-irisBlueColor"
              onClick={resetFilter}
            >
              <GrPowerReset className="text-2xl" />
            </button>
          </div>
        </div>
      </section>
      {isLoading && <Loading />}

      {!isLoading && doctors && (
        <section>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {doctors?.map((doctor) => (
                <DoctorCard key={doctor?.id} doctor={doctor} />
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              current={meta?.page}
              total={meta?.total}
              pageSize={size}
              onChange={handlePaginationChange}
            />
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
