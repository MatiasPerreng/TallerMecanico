import { useDispatch, useSelector } from "react-redux";
import {
  onDeleteUsuario,
  onLoadUsuarios,
  onSetActiveUsuario,
  onStartLoading,
  onUpdateUsuario,
} from "../../../store/jefe/usuarios/usuariosSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";
import Swal from "sweetalert2";

export const useUsuarioStore = () => {
  const dispatch = useDispatch();
  const { usuarios, activeUsuario, isLoadingUsuarios } = useSelector(
    (state) => state.usuario
  );

  const { user } = useSelector((state) => state.auth);

  const setActiveUsuario = (usuario) => {
    dispatch(onSetActiveUsuario(usuario));
  };

  const startLoadingUsuario = async () => {
    try {
      dispatch(onStartLoading());
      const { data } = await tallerMecanicoApi.get(`/usuarios`);
      dispatch(onLoadUsuarios([...data.data]));
    } catch (error) {
      console.log("Error al cargar", error);
    }
  };

  const startSavingUsuario = async (usuario) => {
    try {
      await tallerMecanicoApi.put(`/usuarios/${usuario.id}`, usuario);
      dispatch(onUpdateUsuario({ ...usuario, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", "Error", "error");
    }
  };

  const startDeletingUsuario = async (usuario) => {
    try {
      await tallerMecanicoApi.delete(`/usuarios/${usuario.id}`);
      dispatch(onDeleteUsuario());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al borrar", error.response.data?.message, "error");
    }
  };

  return {
    //* Propiedades
    activeUsuario,
    usuarios,
    isLoadingUsuarios,
    hasClienteSelected: !!activeUsuario,

    //* Metodos
    setActiveUsuario,
    startLoadingUsuario,
    startSavingUsuario,
    startDeletingUsuario,
  };
};
