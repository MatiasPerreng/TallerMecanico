import { Layout } from "./components/common/Layout";
import { ListaTareas } from "./components/ListaTareas";

export const Tarea = () => {
  return (
    <>
      <Layout>
        <div className="mt-5">
          <ListaTareas />
        </div>
      </Layout>
    </>
  );
};
