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
    const grupos = { "": { label: "", options: [] } };

    ordenes.forEach((orden) => {
      const nombreCliente = orden.cliente?.nombre || "Sin cliente";

      if (nombreCliente.toLowerCase().includes(searchTerm.toLowerCase())) {
        grupos[""].options.push({
          value: orden.id,
          label: `${orden.id} - Orden para: ${nombreCliente} | ${
            orden.disponible ? "Disponible" : "No disponible"
          }`,
        });
      }
    });

    return Object.values(grupos);
  }, [ordenes, searchTerm]);

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