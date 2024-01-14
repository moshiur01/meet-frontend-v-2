/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { getUserInfo } from "../services/auth.service";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { id, role } = getUserInfo();
  const isAllowed = allowedRoles.includes(role);

  const accessibleRoute =
    id && isAllowed ? children : <Navigate to="/login" replace={true} />;

  return accessibleRoute;
};

export default ProtectedRoute;
