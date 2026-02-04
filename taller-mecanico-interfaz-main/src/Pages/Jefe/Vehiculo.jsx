import { Layout } from "./components/common/Layout";
import { ListaVehiculos } from "./components/ListarVehiculos";

export const Vehiculo = () => {
  return (
    <>
      <Layout>
        <div className="mt-5 animate__animated">
          <ListaVehiculos />
        </div>
      </Layout>
    </>
  );
};
