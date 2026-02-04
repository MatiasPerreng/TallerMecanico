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
      

      const usuariosData = Array.isArray(data) ? data : (data.data || []);
      
      dispatch(onLoadUsuarios(usuariosData));
      
    } catch (error) {
      console.error("Error al cargar usuarios:", error);

      dispatch(onLoadUsuarios([]));
    }
  };

  const startSavingUsuario = async (usuario) => {
    try {

      await tallerMecanicoApi.put(`/usuarios/${usuario.id}`, usuario);
      
      dispatch(onUpdateUsuario({ ...usuario, user }));
      
      Swal.fire("Actualizado", "Usuario modificado correctamente", "success");
      
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.detail || "Error al actualizar el usuario";
      Swal.fire("Error al guardar", msg, "error");
    }
  };

  const startDeletingUsuario = async (usuario) => {
    try {
      await tallerMecanicoApi.delete(`/usuarios/${usuario.id}`);
      dispatch(onDeleteUsuario());
      Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
      
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.detail || "No se pudo eliminar el usuario";
      Swal.fire("Error al borrar", msg, "error");
    }
  };

  return {
    activeUsuario,
    usuarios,
    isLoadingUsuarios,
    hasClienteSelected: !!activeUsuario,


    setActiveUsuario,
    startLoadingUsuario,
    startSavingUsuario,
    startDeletingUsuario,
  };
};