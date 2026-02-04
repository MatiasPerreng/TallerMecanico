import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { clienteSlice } from "./jefe/clientes/clienteSlice";
import { vehiculoSlice } from "./jefe/vehiculos/vehiculoSlice";
import { ordenSlice } from "./jefe/ordenes/ordenSlice";
import { tareaSlice } from "./jefe/tareas/tareaSlice";
import { mecanicoSlice } from "./jefe/usuarios/mecanicoSlice";
import { categoriaSlice } from "./jefe/inventario/categoriaSlice";
import { productoSlice } from "./jefe/inventario/productoSlice";
import { usuarioSlice } from "./jefe/usuarios/usuariosSlice";
import { tareaAsignadaSlice } from "./mecanico/tareas/tareaAsignadaSlice";
import { trenDelanteroSlice } from "./mecanico/trenDelantero/trenDelanteroSlice";
import { trenTraseroSlice } from "./mecanico/trenTrasero/trenTraseroSlice";
import { frenoSlice } from "./mecanico/frenos/frenoSlice";
import { neumaticoSlice } from "./mecanico/estadoNeumaticos/neumaticoSlice";
import { productoUsado } from "./mecanico/productoUsado/productoUsadoSlice";
import { buscadorSlice } from "./cliente/buscadorSlice";

export const store = configureStore({
  reducer: {
    //* Acciones del cliente
    buscador: buscadorSlice.reducer,

    //* Autenticacion para empleados
    auth: authSlice.reducer,

    //* Acciones del dashboard del jefe
    cliente: clienteSlice.reducer,
    vehiculo: vehiculoSlice.reducer,
    orden: ordenSlice.reducer,
    tarea: tareaSlice.reducer,
    mecanico: mecanicoSlice.reducer,
    categoria: categoriaSlice.reducer,
    producto: productoSlice.reducer,
    usuario: usuarioSlice.reducer,

    //* Acciones del dashboard del mecanico
    tareaAsignada: tareaAsignadaSlice.reducer,
    trenDelantero: trenDelanteroSlice.reducer,
    trenTrasero: trenTraseroSlice.reducer,
    freno: frenoSlice.reducer,
    neumatico: neumaticoSlice.reducer,
    productoUsado: productoUsado.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
