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
      const { data } = await tallerMecanicoApi.get("/productos");
      dispatch(onLoadProductos(data.data));
    } catch (error) {
      console.log("Error cargando productos", error);
    }
  };

  const startSavingProducto = async (producto) => {
    try {
      if (producto.id) {
        const { data } = await tallerMecanicoApi.put(`/productos/${producto.id}`, producto);
        dispatch(onUpdateProducto({ ...data.data }));
        return data.data;
      } else {
        const { data } = await tallerMecanicoApi.post("/productos", producto);
        dispatch(onAddNewProducto({ ...data.data }));
        return data.data;
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", "Error", "error");
    }
  };

  const startDeletingProducto = async () => {
    try {
      await tallerMecanicoApi.delete(`/productos/${activeProducto.id}`);
      dispatch(onDeleteProducto());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", "Error", "error");
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
}