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
      dispatch(onStartLoading());

      const { data } = await tallerMecanicoApi.get(`/clientes`);
      console.log("🐛 Datos recibidos:", data);
      dispatch(
        onLoadClientes([
          ...data.data,
          // { actualPage: data.data.current_page },
          // { lastPage: data.data.last_page },
        ])
      );
    } catch (error) {
      console.log("Error al cargar", error);
    }
  };

  const startSavingEvent = async (cliente) => {
    try {
      if (cliente.id) {
        console.log(cliente.created_at);
        const { data } = await tallerMecanicoApi.put(
          `/clientes/${cliente.id}`,
          cliente
        );
        dispatch(onUpdateCliente({ ...cliente, user }));
        return;
      } else {
        const { data } = await tallerMecanicoApi.post("/clientes", cliente);
        console.log({ data });
        dispatch(onAddNewCliente({ ...data }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data?.message, "error");
    }
  };

  const startDeletingCliente = async (cliente) => {
    try {
      await tallerMecanicoApi.delete(`/clientes/${cliente.id}`);
      dispatch(onDeleteCliente());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al borrar", error.response.data?.message, "error");
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
