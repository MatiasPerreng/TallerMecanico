import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewCategoria,
  onDeleteCategoria,
  onLoadCategorias,
  onSetActiveCategoria,
  onStartLoading,
  onUpdateCategoria,
} from "../../../store/jefe/inventario/categoriaSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";
import Swal from "sweetalert2";

export const useCategoriaStore = () => {
  const dispatch = useDispatch();
  const { categorias, activeCategoria, isLoadingCategoria } = useSelector(
    (state) => state.categoria
  );

  const { user } = useSelector((state) => state.auth);

  const setActiveCategoria = (categoria) => {
    dispatch(onSetActiveCategoria(categoria));
  };

  const startLoadingCategoria = async () => {
    try {
      dispatch(onStartLoading());
      const { data } = await tallerMecanicoApi.get(`/categorias`);
      dispatch(onLoadCategorias([...data.data]));
    } catch (error) {
      console.log("Error al cargar", error);
    }
  };

  const startSavingCategoria = async (categoria) => {
    try {
      if (categoria.id) {
        await tallerMecanicoApi.put(`/categorias/${categoria.id}`, categoria);
        dispatch(onUpdateCategoria({ ...categoria, user }));
        return;
      } else {
        const { data } = await tallerMecanicoApi.post("/categorias", categoria);
        dispatch(onAddNewCategoria({ ...data }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", "Error", "error");
    }
  };

  const startDeletingCategoria = async (categoria) => {
    try {
      await tallerMecanicoApi.delete(`/categorias/${categoria.id}`);
      dispatch(onDeleteCategoria());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al borrar", error.response.data?.message, "error");
    }
  };

  return {
    //* Propiedades
    activeCategoria,
    categorias,
    isLoadingCategoria,
    hasClienteSelected: !!activeCategoria,

    //* Metodos
    setActiveCategoria,
    startLoadingCategoria,
    startSavingCategoria,
    startDeletingCategoria,
  };
};
