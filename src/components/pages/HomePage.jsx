import { Map } from "../map";
import { Sidebar } from "../ui";

export const HomePage = () => {
  return (
    <>
      <Sidebar />
      <section className="home">
        <div className="text">Barrios de Medellín</div>
        <Map />
      </section>
    </>
  );
};
