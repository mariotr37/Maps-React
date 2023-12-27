import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

export const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainerRef.current) return;

      // Se obtienen los datos geojson de la URL
      const response = await axios.get(
        "https://usc1.contabostorage.com/d069ea98e2df4b0e9e99b1e7b2ca9a58:pruebasceluweb/jsonciudad/medellin.geojson"
      );
      const geojsonData = response.data;

      // Configura el mapa en las coordenadas de Medellín si no está inicializado previamente
      if (!mapContainerRef.current._leaflet_id) {
        const map = L.map(mapContainerRef.current).setView(
          [6.2608, -75.5906],
          11
        );

        // Añade un proveedor de mapas (OpenStreetMap)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        // Añade los polígonos de los barrios al mapa
        L.geoJSON(geojsonData).addTo(map);
      }
    };

    initializeMap();
  }, []);

  return (
    <div ref={mapContainerRef} style={{ height: "85vh", width: "150vh" }}></div>
  );
};
