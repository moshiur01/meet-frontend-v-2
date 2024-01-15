/* eslint-disable no-undef */
import DoctorCard from "../../components/Doctors/DoctorCard";
import Loading from "../../components/Loader/Loading";

const MyBooking = () => {
  const bookingData = [];
  const loading = false;

  return (
    <section>
      <div>
        {loading && <Loading />}

        {!loading && (
          <div className="grid  grid-cols-1  lg:grid-cols-2   gap-5">
            {bookingData.map((singleBooking) => (
              <DoctorCard doctor={{ doctor }} key={singleBooking.id} />
            ))}
          </div>
        )}

        {!loading && bookingData.length === 0 && (
          <h2 className="mt-5 text-center leading-9 text-[20px] font-semibold text-primaryColor  ">
            You did not book any appointment yet!
          </h2>
        )}
      </div>
    </section>
  );
};

export default MyBooking;
