import { useEffect, useMemo, useState } from "react";
import { useClienteStore } from "./useClienteStore";

export const useSelectorClientes = (showModal) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { clientes, startLoadingClientes } = useClienteStore();

  useEffect(() => {
    if (showModal && clientes.length === 0) {
      startLoadingClientes();
    }
  }, [showModal]);

  const opcionesAgrupadas = useMemo(() => {
    const grupos = {};

    clientes.forEach((cliente) => {
      const categoriaNombre = "";

      if (!grupos[categoriaNombre]) {
        grupos[categoriaNombre] = {
          label: categoriaNombre,
          options: [],
        };
      }

      if (
        cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        grupos[categoriaNombre].options.push({
          value: cliente.id,
          label: `${cliente.nombre} - ${cliente.email} - ${
            cliente.disponible ? "Disponible" : "No disponible"
          }`,
        });
      }
    });

    return Object.values(grupos);
  }, [clientes, searchTerm]);

  // Recibimos setFormData como argumento
  const handleClienteChange = (selectedOption, setFormData) => {
    setFormData((prev) => ({
      ...prev,
      cliente_id: selectedOption ? selectedOption.value : "",
    }));
  };

  return {
    opcionesAgrupadas,
    handleClienteChange,
    searchTerm,
    setSearchTerm,
  };
};
