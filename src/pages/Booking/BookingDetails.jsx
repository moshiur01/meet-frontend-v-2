import { message } from "antd";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loader/Loading";
import { useBookAppointmentMutation } from "../../redux/api/appointmentApi";
import { useSingleDoctorServiceQuery } from "../../redux/api/doctorServiceApi";
import { getUserInfo } from "../../services/auth.service";

const BookingDetails = () => {
  const { id: doctorId } = useParams();

  const navigate = useNavigate();

  const { data: DoctorServiceData, isLoading: loading } =
    useSingleDoctorServiceQuery(doctorId);

  // console.log(DoctorServiceData);

  //*patient appointments booking api

  const [bookAppointment] = useBookAppointmentMutation();

  const handleBookAppointment = async (slotId, doctorServiceId, doctorId) => {
    const { id: patientId } = getUserInfo();

    const backendData = {
      doctorId,
      patientId,
      slotId,
      doctorServiceId,
    };
    try {
      message.loading("Please wait...");
      const res = await bookAppointment({ ...backendData }).unwrap();

      // console.log(res);

      res?.appointment?.id && toast.success("Booking successfully");
      navigate("/patient/profile");
    } catch (error) {
      console.log(error);
    }
    // console.log(slotId, doctorId, doctorServiceId, patientId);
  };

  return (
    <section className="container">
      {loading && <Loading />}

      {!loading && DoctorServiceData && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Booking Details
          </h2>
          <table className="min-w-full border rounded-md overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Doctor Name</th>
                <th className="py-2 px-4 border-b">Day</th>
                <th className="py-2 px-4 border-b">Start Time</th>
                <th className="py-2 px-4 border-b">End Time</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Available for Booking</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* Assuming DoctorServiceData is an array, map through each item */}
              {DoctorServiceData?.map((service) => (
                <tr key={service?.id}>
                  <td className="py-2 px-4 border-b">
                    {service?.doctor?.name}
                  </td>
                  <td className="py-2 px-4 border-b">{service?.slot?.day}</td>
                  <td className="py-2 px-4 border-b">
                    {service?.slot?.startTime}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {service?.slot?.EndTime}
                  </td>
                  <td className="py-2 px-4 border-b">{service?.fees}</td>
                  <td className="py-2 px-4 border-b">
                    {service?.availableSeats}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {service?.isBooked ? (
                      <button
                        onClick={handleBookAppointment}
                        disabled
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        Book Now
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleBookAppointment(
                            service?.slotId,
                            service?.id,
                            service?.doctor?.id
                          )
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        Book Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
};

export default BookingDetails;
