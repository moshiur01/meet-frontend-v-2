import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import Loading from "../../../components/Loader/Loading";
import {
  useDeleteDoctorServiceMutation,
  useSingleDoctorServiceQuery,
} from "../../../redux/api/doctorServiceApi";
/* eslint-disable react/prop-types */
const ShowServices = ({ doctorId }) => {
  //   console.log(doctorId);

  const { data: doctorService, isLoading } =
    useSingleDoctorServiceQuery(doctorId);

  //*handle delete doctor service api

  const [deleteDoctorService] = useDeleteDoctorServiceMutation();
  const handleCancelAppointment = async (serviceId) => {
    try {
      const res = await deleteDoctorService(serviceId);

      //   console.log(res);

      if (res?.data?.id) {
        toast.success("Service deleted successfully");
      } else {
        toast.error("Failed to  delete service");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading && <Loading />}

      {!isLoading && doctorService?.length === 0 && (
        <h2 className="mt-5 text-center leading-9 text-[20px] font-semibold text-primaryColor  ">
          You do not added any service yet!
        </h2>
      )}

      {!isLoading && doctorService?.length !== 0 && (
        <table className="min-w-full border rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b">Appointments Available</th>
              <th className="py-2 px-4 border-b">Slot Day</th>
              <th className="py-2 px-4 border-b">Start Time</th>
              <th className="py-2 px-4 border-b">End Time</th>
              <th className="py-2 px-4 border-b">Fees</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {doctorService?.map((service, index) => (
              <tr key={service?.id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  {service?.availableSeats}
                </td>
                <td className="py-2 px-4 border-b">{service?.slot?.day}</td>
                <td className="py-2 px-4 border-b">
                  {service?.slot?.startTime}
                </td>
                <td className="py-2 px-4 border-b">{service?.slot?.EndTime}</td>
                <td className="py-2 px-4 border-b">{service?.fees}</td>

                {service?.appointments?.length === 0 && (
                  <td className="py-6 px-4 border-b flex justify-between ">
                    <button
                      onClick={() => handleCancelAppointment(service.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600  mx-auto backdrop:focus:outline-none focus:bg-red-600"
                    >
                      <MdDeleteForever />
                    </button>
                    {/* <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ml-2">
                      <MdEditSquare />
                    </button> */}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowServices;
