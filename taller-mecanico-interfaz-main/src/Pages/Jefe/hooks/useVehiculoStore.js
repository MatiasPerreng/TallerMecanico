import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewVehiculo,
  onDeleteVehiculo,
  onLoadVehiculos,
  onSetActiveVehiculo,
  onStartLoading,
  onUpdateVehiculo,
} from "../../../store/jefe/vehiculos/vehiculoSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";
import Swal from "sweetalert2";

export const useVehiculoStore = () => {
  const dispatch = useDispatch();
  const { vehiculos, activeVehiculo, isLoadingVehiculos } = useSelector(
    (state) => state.vehiculo
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveVehiculo = (vehiculo) => {
    dispatch(onSetActiveVehiculo(vehiculo));
  };

  const startLoadingVehiculos = async () => {
    try {
      dispatch(onStartLoading());
      const { data } = await tallerMecanicoApi.get(`/vehiculos`);
      
     
      const vehiculosData = Array.isArray(data) ? data : (data.data || []);
      
      dispatch(onLoadVehiculos(vehiculosData));
    } catch (error) {
      console.error("Error al cargar vehículos:", error);

      dispatch(onLoadVehiculos(vehiculos || []));
    }
  };

  const startSavingVehiculo = async (vehiculo) => {
    try {
      if (vehiculo.id) {
   
        const { data } = await tallerMecanicoApi.put(`/vehiculos/${vehiculo.id}`, vehiculo);
        dispatch(onUpdateVehiculo({ ...data, user }));
        Swal.fire("Actualizado", "Vehículo actualizado con éxito", "success");
      } else {
        // CREAR
        const { data } = await tallerMecanicoApi.post("/vehiculos", vehiculo);
        dispatch(onAddNewVehiculo({ ...data }));
        Swal.fire("Guardado", "Vehículo registrado con éxito", "success");
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.detail || "Error al procesar los datos del vehículo";
      Swal.fire("Error al guardar", msg, "error");
      
   
      dispatch(onLoadVehiculos(vehiculos));
    }
  };

  const startDeletingVehiculo = async (vehiculo) => {
    try {

      await tallerMecanicoApi.delete(`/vehiculos/${vehiculo.id}`);
      

      dispatch(onDeleteVehiculo(vehiculo.id));
      
      Swal.fire("Eliminado", "El vehículo ha sido eliminado", "success");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.detail || "No se pudo eliminar el vehículo";
      Swal.fire("Error al borrar", msg, "error");
      

      dispatch(onLoadVehiculos(vehiculos));
    }
  };

  return {
    activeVehiculo,
    vehiculos,
    isLoadingVehiculos,
    hasVehiculoSelected: !!activeVehiculo,
    setActiveVehiculo,
    startLoadingVehiculos,
    startSavingVehiculo,
    startDeletingVehiculo,
  };
};