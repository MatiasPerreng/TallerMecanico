import { Layout } from "./components/common/Layout";
import { ListaUsuarios } from "./components/ListaUsuarios";

export const Usuarios = () => {
  return (
    <Layout>
      <div className="mt-5 animate__animated">
        <ListaUsuarios />
      </div>
    </Layout>
  );
};
