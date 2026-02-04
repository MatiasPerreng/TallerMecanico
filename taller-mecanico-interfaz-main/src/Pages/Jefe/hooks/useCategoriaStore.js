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

      const categoriasData = Array.isArray(data) ? data : (data.data || []);
      dispatch(onLoadCategorias(categoriasData));
      
    } catch (error) {
      console.error("Error al cargar categorías", error);
      dispatch(onLoadCategorias([]));
    }
  };

  const startSavingCategoria = async (categoria) => {
    try {
      if (categoria.id) {
        await tallerMecanicoApi.put(`/categorias/${categoria.id}`, categoria);
        dispatch(onUpdateCategoria({ ...categoria, user }));
        Swal.fire("Éxito", "Categoría actualizada", "success");
      } else {
        const { data } = await tallerMecanicoApi.post("/categorias", categoria);
        dispatch(onAddNewCategoria({ ...data }));
        Swal.fire("Éxito", "Categoría creada", "success");
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.detail || "Error al guardar categoría";
      Swal.fire("Error al guardar", msg, "error");
    }
  };

  const startDeletingCategoria = async (categoria) => {
    try {
      await tallerMecanicoApi.delete(`/categorias/${categoria.id}`);
      dispatch(onDeleteCategoria());
      Swal.fire("Eliminado", "Categoría borrada", "success");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.detail || "No se pudo eliminar";
      Swal.fire("Error al borrar", msg, "error");
    }
  };

  return {
    activeCategoria,
    categorias,
    isLoadingCategoria,
    hasClienteSelected: !!activeCategoria,
    setActiveCategoria,
    startLoadingCategoria,
    startSavingCategoria,
    startDeletingCategoria,
  };
};