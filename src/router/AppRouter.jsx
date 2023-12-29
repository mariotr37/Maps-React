import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage, HomePage } from "../components";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="auth/*"
          element={
            <PublicRoute>
              <Routes>
                <Route path="/*" element={<AuthPage />} />
              </Routes>
            </PublicRoute>
          }
        />
        <Route
          path="map/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/*" element={<HomePage />} />
              </Routes>
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/map" />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
};
