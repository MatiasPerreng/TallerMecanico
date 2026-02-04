import { useEffect, useMemo, useState } from "react";
import { useProductoStore } from "../../jefe/hooks/useProductoStore";

export const useSelectorProductos = (showModal) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { productos, startLoadingProducto } = useProductoStore();

  useEffect(() => {
    startLoadingProducto();
  }, [showModal]);

  const opcionesAgrupadas = useMemo(() => {
    const grupos = {};

    productos.forEach((producto) => {
      const categoriaNombre = "";

      if (!grupos[categoriaNombre]) {
        grupos[categoriaNombre] = {
          label: categoriaNombre,
          options: [],
        };
      }

      if (producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())) {
        grupos[categoriaNombre].options.push({
          value: producto.id,
          label: `${producto.nombre} - ${producto.marca}`,
          stock: producto.stock,
          precio: producto.precio,
        });
      }
    });

    return Object.values(grupos);
  }, [productos, searchTerm]);

  // Recibimos setFormData como argumento
  const handleProductoChange = (selectedOption, setFormData) => {
    setFormData((prev) => ({
      ...prev,
      producto_id: selectedOption ? selectedOption.value : "",
    }));
  };

  return {
    opcionesAgrupadas,
    handleProductoChange,
    searchTerm,
    setSearchTerm,
  };
};
