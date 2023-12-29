import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const PrivateRoute = ({ children }) => {
  const { status, userId } = useContext(AuthContext);

  return status === "authenticated" && userId ? (
    children
  ) : (
    <Navigate to="/auth" />
  );
};
