/* eslint-disable react/prop-types */

import dayjs from "dayjs";
import toast from "react-hot-toast";
import { GiConfirmed } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import Loading from "../../../components/Loader/Loading";
import {
  useCancelAppointmentMutation,
  useFinishAppointmentMutation,
  useGetAppointmentsByDoctorQuery,
} from "../../../redux/api/appointmentApi";
const AppointmentDetails = ({ doctorId }) => {
  const { data: DoctorAppointmentData, isLoading } =
    useGetAppointmentsByDoctorQuery(doctorId);

  // console.log(DoctorAppointmentData);

  const getStatusColor = (status) => {
    switch (status) {
      case "finished":
        return "text-green-500 text-bold";
      case "paid":
        return "text-green-500 text-bold";
      case "pending":
        return "text-yellow-500 text-bold";
      case "canceled":
        return "text-red-500 text-bold";
      default:
        return "text-gray-500 text-bold";
    }
  };

  //*handle cancel appointment api
  const [cancelAppointment] = useCancelAppointmentMutation();
  const handleCancelAppointment = async (appointmentId) => {
    const res = await cancelAppointment(appointmentId);
    // console.log(res);
    if (res?.data?.appointment?.id) {
      toast.success("Appointment canceled successfully");
    } else {
      toast.error("Failed to cancel the appointment");
    }
  };

  //*handle finish appointment api
  const [finishAppointment] = useFinishAppointmentMutation();
  const handleApproveAppointment = async (appointmentId) => {
    const res = await finishAppointment(appointmentId);

    // console.log(res);

    if (res?.data?.id) {
      toast.success("Appointment finished successfully");
    } else {
      toast.error("Failed to finish the appointment");
    }
  };

  return (
    <div>
      {isLoading && <Loading />}

      {!isLoading && DoctorAppointmentData?.length === 0 && (
        <h2 className="mt-5 text-center leading-9 text-[20px] font-semibold text-primaryColor ">
          Any patient has not booked any appointment yet!
        </h2>
      )}

      {!isLoading && DoctorAppointmentData?.length !== 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-md overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Patient Info</th>
                <th className="py-2 px-4 border-b">Gender</th>
                <th className="py-2 px-4 border-b">Payment</th>

                <th className="py-2 px-4 border-b">Booked On</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="text-center text-sm">
              {DoctorAppointmentData?.map((appointment) => (
                <tr key={appointment?.id}>
                  {/* Patient Info */}
                  <td className="py-2 px-4 border-b flex items-center">
                    <img
                      src={appointment?.patient?.photo}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <p className="font-bold">{appointment?.patient?.name}</p>
                      <p>{appointment?.patient?.email}</p>
                    </div>
                  </td>

                  {/* Gender */}
                  <td className="py-2 px-4 border-b">
                    {appointment?.patient?.gender}
                  </td>

                  <td
                    className={`py-2 px-4 border-b ${getStatusColor(
                      appointment?.payment?.paymentStatus
                    )}`}
                  >
                    {appointment?.payment?.paymentStatus}
                  </td>

                  <td className="py-2 px-4 border-b">
                    {dayjs(appointment?.createdAt).format(
                      "MMM D, YYYY hh:mm A"
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-2 px-4 border-b space-x-2 flex">
                    {appointment?.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleCancelAppointment(appointment.id)
                          }
                          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                        >
                          <MdDeleteForever />
                        </button>
                        <button
                          onClick={() =>
                            handleApproveAppointment(appointment.id)
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                        >
                          <GiConfirmed />
                        </button>
                      </>
                    )}
                    {/* <button
                  onClick={() => handleCustomAction(appointment.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Action
                </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentDetails;
