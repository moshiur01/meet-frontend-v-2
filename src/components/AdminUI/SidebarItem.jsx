import { FaClipboardList, FaUser, FaUserDoctor } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { MdOutlineImageAspectRatio, MdRateReview } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";
export const sidebarItems = () => {
  const defaultSidebarItems = [
    // admin profile
    {
      label: <Link to={`/admin/profile`}>Profile</Link>,
      key: `/admin/profile`,
      icon: <ImProfile />,
    },
    {
      label: <Link to={`/admin/profile/changePassword`}>Change Password</Link>,
      key: `/admin/profile/changePassword`,
      icon: <ImProfile />,
    },

    // admins (create and show )
    {
      label: "Admins",
      key: "admins",
      icon: <RiAdminFill />,
      children: [
        {
          label: <Link to={"/admin/profile/createAdmin"}>Create Admin</Link>,
          key: "/admin/profile/createAdmin",
        },
        {
          label: <Link to={`/admin/profile/seeAdmins`}>See Admins</Link>,
          key: `/admin/profile/seeAdmins`,
        },
      ],
    },

    // see patients
    {
      label: <Link to={`/admin/profile/seeAllPatient`}>See Patients</Link>,
      key: `/admin/profile/seeAllPatient`,
      icon: <FaUser />,
    },

    //Specialization (show and add)
    {
      label: "Specialization",
      key: "specialization",
      icon: <MdOutlineImageAspectRatio />,
      children: [
        {
          label: (
            <Link to={"/admin/profile/createSpecialization"}>
              Create Specialization
            </Link>
          ),
          key: "/admin/profile/createSpecialization",
        },
        {
          label: (
            <Link to={`/admin/profile/seeAllSpecializations`}>
              All Specialization Data
            </Link>
          ),
          key: `/admin/profile/seeAllSpecializations`,
        },
      ],
    },

    {
      label: "Manage Rooms",
      key: "rooms",
      icon: <MdOutlineImageAspectRatio />,
      children: [
        {
          label: (
            <Link to={"/admin/profile/createRoomNumber"}>Create Room No.</Link>
          ),
          key: "/admin/profile/createRoomNumber",
        },
        {
          label: <Link to={`/admin/profile/seeAllRoom`}>All Rooms</Link>,
          key: `/admin/profile/seeAllRoom`,
        },
      ],
    },

    //doctors (show and add)
    {
      label: "Doctors",
      key: "doctors",
      icon: <FaUserDoctor />,
      children: [
        {
          label: <Link to={"/admin/profile/seeDoctors"}>See Doctors</Link>,
          key: "/admin/profile/seeDoctors",
        },
        {
          label: <Link to={`/admin/profile/addDoctors`}>Add Doctors</Link>,
          key: `/admin/profile/addDoctors`,
        },
      ],
    },

    //reviews (patient and platform)
    {
      label: "Reviews",
      key: "reviews",
      icon: <MdRateReview />,
      children: [
        {
          label: (
            <Link to={"/admin/profile/patientReviews"}>Doctor Reviews</Link>
          ),
          key: "/admin/profile/PlatformReviews",
        },
        {
          label: (
            <Link to={`/admin/profile/platformReview`}>Platform Review</Link>
          ),
          key: `/admin/profile/platformReview`,
        },
      ],
    },

    //appointments patient (appointments and payments)
    {
      label: "Appointments",
      key: "appointments",
      icon: <FaClipboardList />,
      children: [
        {
          label: (
            <Link to={"/admin/profile/doctorAppointments"}>
              Patient Appointments
            </Link>
          ),
          key: "/admin/profile/doctorAppointments",
        },
        {
          label: <Link to={`/admin/profile/payments`}>Payments</Link>,
          key: `/admin/profile/payments`,
        },
      ],
    },

    //medicineDelivery  (create , see , status)
    {
      label: "Medicine Delivery",
      key: "medicineDelivery",
      icon: <RiAdminFill />,
      children: [
        {
          label: (
            <Link to={"/admin/profile/createMedicineDeliveryProfile"}>
              Create Profile
            </Link>
          ),
          key: "/admin/profile/createMedicineDeliveryProfile",
        },
        {
          label: (
            <Link to={`/admin/profile/seeMedicineProfiles`}>
              See All Profiles
            </Link>
          ),
          key: `/admin/profile/seeMedicineProfiles`,
        },
        {
          label: (
            <Link to={`/admin/profile/medicineDeliveryStatus`}>See Status</Link>
          ),
          key: `/admin/profile/medicineDeliveryStatus`,
        },
      ],
    },
  ];

  return defaultSidebarItems;
};
