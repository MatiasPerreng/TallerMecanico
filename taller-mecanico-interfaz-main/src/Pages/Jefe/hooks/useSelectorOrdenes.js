import { useEffect, useMemo, useState } from "react";
import { useOrdenStore } from "./useOrdenStore";

export const useSelectorOrdenes = (showModal) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { ordenes, startLoadingOrdenes } = useOrdenStore();

  useEffect(() => {
    if (showModal && ordenes.length === 0) {
      startLoadingOrdenes();
    }
  }, [showModal]);

  const opcionesAgrupadas = useMemo(() => {
    const grupos = {};

    ordenes.forEach((orden) => {
      const categoriaNombre = "";

      if (!grupos[categoriaNombre]) {
        grupos[categoriaNombre] = {
          label: categoriaNombre,
          options: [],
        };
      }

      if (
        orden.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        grupos[categoriaNombre].options.push({
          value: orden.id,
          label: `${orden.id} - Orden para: ${orden.cliente.nombre} | ${
            orden.disponible ? "Disponible" : "No disponible"
          }`,
        });
      }
    });

    return Object.values(grupos);
  }, [ordenes, searchTerm]);

  // Recibimos setFormData como argumento
  const handleOrdenChange = (selectedOption, setFormData) => {
    setFormData((prev) => ({
      ...prev,
      orden_id: selectedOption ? selectedOption.value : "",
    }));
  };

  return {
    opcionesAgrupadas,
    handleOrdenChange,
    searchTerm,
    setSearchTerm,
  };
};
