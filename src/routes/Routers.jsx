import { Route, Routes } from "react-router-dom";
import DoctorDashboard from "../Dashboard/doctor-account/Dashboard";
import MyAccount from "../Dashboard/user-account/myAccount";
import BookingDetails from "../pages/Booking/BookingDetails";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorsDetails from "../pages/Doctors/DoctorsDetails";
import Home from "../pages/Home";
import Login from "../pages/Login";
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
        path="/user/profile"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/profile"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routers;
