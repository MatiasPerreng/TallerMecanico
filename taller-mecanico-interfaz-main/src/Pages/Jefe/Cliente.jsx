import { Layout } from "./components/common/Layout";
import { ListaClientes } from "./components/ListaClientes";

export const Cliente = () => {
  return (
    <>
      <Layout>
        <div className="mt-5 animate__animated">
          <ListaClientes />
        </div>
      </Layout>
    </>
  );
};
