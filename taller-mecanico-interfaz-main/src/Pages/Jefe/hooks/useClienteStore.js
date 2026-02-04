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
  
  const { clientes, activeCliente, isLoadingClientes, actualPage, lastPage } =
    useSelector((state) => state.cliente);
  const { user } = useSelector((state) => state.auth);

  const setActiveCliente = (cliente) => {
    dispatch(onSetActiveCliente(cliente));
  };

  const startLoadingClientes = async () => {
    try {
      dispatch(onStartLoading()); // Activa el spinner

      const { data } = await tallerMecanicoApi.get(`/clientes`);
      
    
      const clientesBase = Array.isArray(data) ? data : data.data || [];

     
      dispatch(onLoadClientes(clientesBase));

    } catch (error) {
      console.error("Error al cargar clientes:", error);

      dispatch(onLoadClientes([])); 
      Swal.fire("Error", "No se pudieron cargar los datos del servidor", "error");
    }
  };

  const startSavingEvent = async (cliente) => {

    try {
      if (cliente.id) {

        const { data } = await tallerMecanicoApi.put(`/clientes/${cliente.id}`, cliente);
        
  
        dispatch(onUpdateCliente({ ...data, user }));
        Swal.fire("Actualizado", "Cliente actualizado correctamente", "success");
      } else {

        const { data } = await tallerMecanicoApi.post("/clientes", cliente);
        
        dispatch(onAddNewCliente({ ...data }));
        Swal.fire("Guardado", "Cliente creado correctamente", "success");
      }
      return true; 
    } catch (error) {
      console.error("Error al guardar:", error);
      const msg = error.response?.data?.detail || "Error al procesar la solicitud";
      Swal.fire("Error al guardar", msg, "error");
      

      dispatch(onLoadClientes(clientes));
      return false;
    }
  };

  const startDeletingCliente = async (cliente) => {
    try {

      await tallerMecanicoApi.delete(`/clientes/${cliente.id}`);
      
      dispatch(onDeleteCliente(cliente.id));
      
      Swal.fire("Eliminado", "Cliente borrado correctamente", "success");
    } catch (error) {
      console.error("Error al borrar:", error);
      const msg = error.response?.data?.detail || "No se pudo eliminar el cliente";
      Swal.fire("Error al borrar", msg, "error");

      dispatch(onLoadClientes(clientes));
    }
  };

  return {

    actualPage,
    lastPage,
    activeCliente,
    clientes,
    isLoadingClientes,
    hasClienteSelected: !!activeCliente,


    setActiveCliente,
    startLoadingClientes,
    startSavingEvent,
    startDeletingCliente,
  };
};