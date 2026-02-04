import { Layout } from "./components/common/Layout";
import { ListaProductos } from "./components/ListaProductos";

export const Inventario = () => {
  return (
    <>
      <Layout>
        <div className="mt-5">
          <ListaProductos />
        </div>
      </Layout>
    </>
  );
};
