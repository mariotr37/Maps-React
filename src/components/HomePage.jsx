import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Map } from "./Map";

export const HomePage = () => {
  const { handleLogOut } = useContext(AuthContext);

  return (
    <div>
      <h1>Medellín Map</h1>
      <Map />
      <button className="button-common submit" onClick={handleLogOut}>
        Cerrar Sesión
      </button>
    </div>
  );
};
