import { Route, Routes } from "react-router-dom";
import AdminChangePassword from "../Dashboard/admin-account/AdminChangePassword";
import AdminDashboard from "../Dashboard/admin-account/AdminDashboard";
import AdminProfile from "../Dashboard/admin-account/AdminProfile";
import AddDoctor from "../Dashboard/admin-account/ManageDoctor/AddDoctor";
import SeeAllDoctors from "../Dashboard/admin-account/ManageDoctor/SeeAllDoctors";
import SeeAllPatients from "../Dashboard/admin-account/SeeAllPatients";
import CreateAdmin from "../Dashboard/admin-account/manageAdmin/CreateAdmin";
import SeeAllAdmin from "../Dashboard/admin-account/manageAdmin/SeeAllAdmin";
import DoctorAppointment from "../Dashboard/admin-account/manageAppointment/DoctorAppointment";
import Payment from "../Dashboard/admin-account/manageAppointment/Payment";
import MedicineDeliveryStatus from "../Dashboard/admin-account/manageMedicine/MedicineDeliveryStatus";
import SeeAllMedicineDeliveryProfile from "../Dashboard/admin-account/manageMedicine/SeeAllMedicineDeliveryProfile";

import CreateMedicineDeliveryProfile from "../Dashboard/admin-account/manageMedicine/CreateMedicineDeliveryProfile";
import PatientReviewToDoctors from "../Dashboard/admin-account/manageReviews/PatientReviesToDoctors";
import PlatformReviews from "../Dashboard/admin-account/manageReviews/PlatfromReviews";
import CreateRoom from "../Dashboard/admin-account/manageRoom/CreateRoom";
import SeeAllRoom from "../Dashboard/admin-account/manageRoom/SeeAllRoom";
import CreateSpecialization from "../Dashboard/admin-account/manageSpecialization/CreateSpecialization";
import EditSpecialization from "../Dashboard/admin-account/manageSpecialization/EditSpecialization";
import SeeAllSpecialization from "../Dashboard/admin-account/manageSpecialization/SeeAllSpecialization";
import DoctorDashboard from "../Dashboard/doctor-account/Dashboard";
import MedicineManAccount from "../Dashboard/medicine-man-account/MedicineManAccount";
import MyAccount from "../Dashboard/user-account/MyAccount";
import BookingDetails from "../pages/Booking/BookingDetails";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorsDetails from "../pages/Doctors/DoctorsDetails";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";
import Services from "../pages/Services";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorsDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route
        path="/booking-details/:id"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <BookingDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patient/profile"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/medicineMan/profile"
        element={
          <ProtectedRoute allowedRoles={["medicineMan"]}>
            <MedicineManAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/profile"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard></AdminDashboard>
          </ProtectedRoute>
        }
      >
        <Route path="" element={<AdminProfile />} />

        <Route path="changePassword" element={<AdminChangePassword />} />

        {/* doctors  */}
        <Route path="seeDoctors" element={<SeeAllDoctors />} />
        <Route path="addDoctors" element={<AddDoctor />} />

        {/* patients  */}
        <Route path="patientReviews" element={<PatientReviewToDoctors />} />
        <Route path="platformReview" element={<PlatformReviews />} />
        <Route path="seeAllPatient" element={<SeeAllPatients />} />

        {/* Specialization */}
        <Route path="createSpecialization" element={<CreateSpecialization />} />
        <Route path="editSpecialization/:id" element={<EditSpecialization />} />
        <Route
          path="seeAllSpecializations"
          element={<SeeAllSpecialization />}
        />

        {/*  room number  */}
        <Route path="createRoomNumber" element={<CreateRoom />} />
        <Route path="seeAllRoom" element={<SeeAllRoom />} />

        {/* appointments and payments  */}
        <Route path="doctorAppointments" element={<DoctorAppointment />} />
        <Route path="payments" element={<Payment />} />

        {/* manage admin  */}
        <Route path="createAdmin" element={<CreateAdmin />} />
        <Route path="seeAdmins" element={<SeeAllAdmin />} />

        {/* medicine man  */}
        <Route
          path="createMedicineDeliveryProfile"
          element={<CreateMedicineDeliveryProfile />}
        />
        <Route
          path="seeMedicineProfiles"
          element={<SeeAllMedicineDeliveryProfile />}
        />
        <Route
          path="medicineDeliveryStatus"
          element={<MedicineDeliveryStatus />}
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Routers;
