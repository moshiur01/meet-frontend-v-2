/* eslint-disable no-undef */
import Loading from "../../components/Loader/Loading";
import {
  useCancelAppointmentMutation,
  useGetPatientAppointmentQuery,
} from "../../redux/api/appointmentApi";
import { getUserInfo } from "../../services/auth.service";

const MyBooking = () => {
  const { id } = getUserInfo();
  // console.log(id);

  const { data: patientAppointmentData, isLoading } =
    useGetPatientAppointmentQuery(id);

  // console.log(patientAppointmentData);

  const getStatusColor = (status) => {
    switch (status) {
      case "finished":
        return "text-green-500 text-bold";
      case "paid":
        return "text-green-500 text-bold"; // Change this to the color you want for paid status
      case "pending":
        return "text-yellow-500 text-bold"; // Change this to the color you want for pending status
      case "canceled":
        return "text-red-500 text-bold"; // Change this to the color you want for canceled status
      default:
        return "text-gray-500"; // Default color for other statuses
    }
  };

  //*handle api call
  const [cancelAppointment] = useCancelAppointmentMutation();
  const handleCancelAppointment = async (appointmentId) => {
    try {
      // Make API call to cancel appointment
      const res = await cancelAppointment(appointmentId);

      console.log(res);

      // if (response.isSuccess) {
      //   console.log('Appointment canceled successfully!');
      //   // Implement any additional logic or update state as needed
      // } else {
      //   console.error('Failed to cancel appointment');
      // }
    } catch (error) {
      console.error("Error during cancelAppointment:", error);
    }
  };

  return (
    <section>
      <div>
        {isLoading && <Loading />}

        {!isLoading && (
          <div className="grid  grid-cols-1  lg:grid-cols-2   gap-5">
            <table className="min-w-full border rounded-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b">Doctor Name</th>
                  <th className="py-2 px-4 border-b">Day</th>
                  <th className="py-2 px-4 border-b">Start Time</th>
                  <th className="py-2 px-4 border-b">End Time</th>
                  <th className="py-2 px-4 border-b">Fees</th>
                  <th className="py-2 px-4 border-b">Payment Status</th>
                  <th className="py-2 px-4 border-b">Appointment Status</th>
                  <th className="py-2 px-4 border-b">Prescription</th>
                  <th className="py-2 px-4 border-b">Medicine Status</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {patientAppointmentData?.map((singleBooking) => (
                  <tr key={singleBooking?.id}>
                    <td className="py-2 px-4 border-b">
                      {singleBooking?.doctor?.name}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {singleBooking?.timeSlot?.day}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {singleBooking?.timeSlot?.startTime}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {singleBooking?.timeSlot?.EndTime}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {singleBooking?.doctorService?.fees}
                    </td>

                    {/* <td className="py-2 px-4 border-b">
                      {singleBooking?.payment?.paymentStatus}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {singleBooking?.status}
                    </td> */}

                    <td
                      className={`py-2 px-4 border-b ${getStatusColor(
                        singleBooking?.payment?.paymentStatus
                      )}`}
                    >
                      {singleBooking?.payment?.paymentStatus}
                    </td>
                    <td
                      className={`py-2 px-4 border-b ${getStatusColor(
                        singleBooking?.status
                      )}`}
                    >
                      {singleBooking?.status}
                    </td>

                    <td className="py-2 px-4 border-b">
                      {singleBooking?.prescriptionLink === null ? (
                        "No Prescription Uploaded"
                      ) : (
                        <a
                          href={singleBooking?.prescriptionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline hover:opacity-75 focus:outline-none focus:underline "
                        >
                          <button className="bg-irisBlueColor text-white px-3 py-1 rounded-md">
                            View Prescription
                          </button>
                        </a>
                      )}
                    </td>

                    <td className="py-2 px-4 border-b">
                      {singleBooking?.medicine === null
                        ? "Not Available"
                        : singleBooking?.medicine?.status}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {singleBooking?.status === "pending" && (
                        <button
                          onClick={() =>
                            handleCancelAppointment(singleBooking.id)
                          }
                          // disabled={cancelLoading}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && patientAppointmentData.length === 0 && (
          <h2 className="mt-5 text-center leading-9 text-[20px] font-semibold text-primaryColor  ">
            You did not book any appointment yet!
          </h2>
        )}
      </div>
    </section>
  );
};

export default MyBooking;
