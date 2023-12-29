import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const PublicRoute = ({ children }) => {
  const { status, userId } = useContext(AuthContext);

  return status !== "authenticated" && !userId ? children : <Navigate to="/map" />;
};
