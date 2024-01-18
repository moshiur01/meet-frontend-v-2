/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../components/Loader/Loading";
import {
  useGetAppointmentsByDoctorQuery,
  useUpdateAppointmentMutation,
} from "../../../redux/api/appointmentApi";

const getStatusColor = (status) => {
  switch (status) {
    case "finished":
      return "text-green-600 text-bold";
    case "canceled":
      return "text-red-600 text-bold";
    case "pending":
      return "text-blue-600 text-bold";
    default:
      return "";
  }
};

const PatientPrescription = ({ doctorId }) => {
  const [prescription, setPrescription] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  //* update appointment(add prescription) api

  const [updateAppointment] = useUpdateAppointmentMutation();

  const handleAddPrescription = async (appointmentId) => {
    // console.log(prescription);

    const res = await updateAppointment({
      id: appointmentId,
      body: { prescriptionLink: prescription },
    }).unwrap();

    if (res?.id) {
      toast.success("Prescription added successfully");
    } else {
      toast.error("Can't update the Patient Prescription");
    }

    // Reset state after adding prescription
    setPrescription("");
    setSelectedRow(null);
  };

  const { data: DoctorAppointmentData, isLoading } =
    useGetAppointmentsByDoctorQuery(doctorId);

  // console.log(DoctorAppointmentData);

  return (
    <div>
      {isLoading && <Loading />}

      {!isLoading && DoctorAppointmentData?.length === 0 && (
        <h2 className="mt-5 text-center leading-9 text-[20px] font-semibold text-primaryColor  ">
          You did not book any appointment yet!
        </h2>
      )}
      <table className="min-w-full border rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Patient Info</th>
            <th className="py-2 px-4 border-b">Appointment Status</th>
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

              {/* Appointment Status */}
              <td
                className={`py-2 px-4 border-b ${getStatusColor(
                  appointment?.status
                )}`}
              >
                {appointment?.status}
              </td>

              {/* Action */}
              <td className="py-2 px-4 border-b">
                {appointment?.status === "finished" && (
                  <div>
                    {appointment?.prescriptionLink ? (
                      <span className="text-green-600 font-bold">
                        Prescription Added
                      </span>
                    ) : (
                      <button
                        onClick={() =>
                          setSelectedRow(
                            selectedRow === appointment?.id
                              ? null
                              : appointment?.id
                          )
                        }
                        className={`bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
                          selectedRow === appointment?.id ? "bg-blue-600" : ""
                        }`}
                      >
                        {selectedRow === appointment?.id
                          ? "Hide Input"
                          : "Add Prescription"}
                      </button>
                    )}

                    {selectedRow === appointment?.id && (
                      <div className="mt-2">
                        {appointment?.prescriptionLink ? (
                          <span className="text-green-600 font-bold">
                            Prescription Added
                          </span>
                        ) : (
                          <>
                            <input
                              type="text"
                              value={prescription}
                              onChange={(e) => setPrescription(e.target.value)}
                              placeholder="Enter Prescription"
                              className="border border-gray-300 px-3 py-1 rounded-md mr-2"
                            />
                            <button
                              onClick={() =>
                                handleAddPrescription(appointment?.id)
                              }
                              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                            >
                              Add
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientPrescription;
