import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewProducto,
  onDeleteProducto,
  onLoadProductos,
  onSetActiveProducto,
  onUpdateProducto,
} from "../../../store/jefe/inventario/productoSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";
import Swal from "sweetalert2";

export const useProductoStore = () => {
  const dispatch = useDispatch();

  const {
    productos,
    isLoadingProducto,
    activeProducto,
    hasProductoSelected,
  } = useSelector((state) => state.producto);

  const setActiveProducto = (producto) => {
    dispatch(onSetActiveProducto(producto));
  };

  const startLoadingProducto = async () => {
    try {
      const { data } = await tallerMecanicoApi.get("/inventario/productos");
      dispatch(onLoadProductos(data));
    } catch (error) {
      console.log("Error cargando productos", error);
    }
  };

  const startSavingProducto = async (producto) => {
    try {
      if (producto.id) {
        const { data } = await tallerMecanicoApi.put(`/inventario/productos/${producto.id}`, producto);
        dispatch(onUpdateProducto({ ...data }));
        return true;
      } else {
        const { data } = await tallerMecanicoApi.post("/inventario/productos", producto);
        dispatch(onAddNewProducto({ ...data }));
        return true;
      }
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.detail || "Error al conectar con el servidor";
      Swal.fire("Error al guardar", msg, "error");
      return false;
    }
  };

  const startDeletingProducto = async () => {
    try {
      if (!activeProducto) return;
      await tallerMecanicoApi.delete(`/inventario/productos/${activeProducto.id}`);
      dispatch(onDeleteProducto());
      Swal.fire("Eliminado", "Producto borrado correctamente", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", "No se pudo eliminar el producto", "error");
    }
  };

  return {
    productos,
    isLoadingProducto,
    activeProducto,
    hasProductoSelected,
    startLoadingProducto,
    setActiveProducto,
    startSavingProducto,
    startDeletingProducto
  };
};