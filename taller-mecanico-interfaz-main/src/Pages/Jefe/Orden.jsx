import { Layout } from "./components/common/Layout";
import { ListaOrdenes } from "./components/ListaOrdenes";

export const Orden = () => {
  return (
    <>
      <Layout>
        <div className="mt-5 animate__animated">
          <ListaOrdenes />
        </div>
      </Layout>
    </>
  );
};
