import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewCliente,
  onDeleteCliente,
  onLoadClientes,
  onSetActiveCliente,
  onStartLoading,
  onUpdateCliente,
} from "../../../store/jefe/clientes/clienteSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";
import Swal from "sweetalert2";

export const useClienteStore = () => {
  const dispatch = useDispatch();
  
  // Nota: Asegúrate que el slice en el store se llame 'cliente' o 'clientes'
  const { clientes, activeCliente, isLoadingClientes, actualPage, lastPage } =
    useSelector((state) => state.cliente);
  const { user } = useSelector((state) => state.auth);

  const setActiveCliente = (cliente) => {
    dispatch(onSetActiveCliente(cliente));
  };

  const startLoadingClientes = async () => {
    try {
      dispatch(onStartLoading());

      // Petición a FastAPI (http://localhost:8000/api/clientes)
      const { data } = await tallerMecanicoApi.get(`/clientes`);
      
      console.log("🐛 Datos recibidos de Python:", data);

      /* CORRECCIÓN: FastAPI devuelve la lista directamente.
         Si 'data' ya es el array de clientes, lo pasamos directamente.
      */
      const clientesBase = Array.isArray(data) ? data : data.data || [];

      dispatch(onLoadClientes(clientesBase));

    } catch (error) {
      console.error("Error al cargar clientes:", error);
      // Forzamos la detención del spinner incluso si hay error
      dispatch(onLoadClientes([])); 
    }
  };

  const startSavingEvent = async (cliente) => {
    try {
      if (cliente.id) {
        // Actualizar (PUT)
        const { data } = await tallerMecanicoApi.put(
          `/clientes/${cliente.id}`,
          cliente
        );
        dispatch(onUpdateCliente({ ...cliente, user }));
        Swal.fire("Actualizado", "Cliente actualizado correctamente", "success");
      } else {
        // Crear (POST)
        const { data } = await tallerMecanicoApi.post("/clientes", cliente);
        dispatch(onAddNewCliente({ ...data }));
        Swal.fire("Guardado", "Cliente creado correctamente", "success");
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.detail || "Error al procesar la solicitud";
      Swal.fire("Error al guardar", msg, "error");
    }
  };

  const startDeletingCliente = async (cliente) => {
    try {
      await tallerMecanicoApi.delete(`/clientes/${cliente.id}`);
      dispatch(onDeleteCliente());
      Swal.fire("Eliminado", "Cliente borrado correctamente", "success");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.detail || "No se pudo eliminar el cliente";
      Swal.fire("Error al borrar", msg, "error");
    }
  };

  return {
    //* Propiedades
    actualPage,
    lastPage,
    activeCliente,
    clientes,
    isLoadingClientes,
    hasClienteSelected: !!activeCliente,

    //* Metodos
    setActiveCliente,
    startLoadingClientes,
    startSavingEvent,
    startDeletingCliente,
  };
};