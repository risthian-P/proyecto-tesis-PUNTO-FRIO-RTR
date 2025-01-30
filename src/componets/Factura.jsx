import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf"; // Importar jsPDF
import "jspdf-autotable"; // Importar la extensión autoTable
import { AiFillEye } from "react-icons/ai";

const Factura = () => {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(1); // Página actual
  const [hayMas, setHayMas] = useState(true); // Indica si hay más ventas
  const [limite] = useState(10)

  // Obtener todas las ventas con paginación
  useEffect(() => {
    const obtenerVentas = async () => {
      setCargando(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/ventas?pagina=${pagina}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        setVentas(response.data);
        setHayMas(response.data.length === limite); // Verificar si hay más datos
        setCargando(false);
      } catch (error) {
        setError("Error al cargar las ventas.");
        setCargando(false);
      }
    };

    obtenerVentas();
  }, [pagina]);

  // Obtener una venta específica
  const obtenerVentaPorId = async (ventaId) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/venta/${ventaId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVentaSeleccionada(response.data);
      setCargando(false);
    } catch (error) {
      setError("Error al cargar los datos de la venta.");
      setCargando(false);
    }
  };

  const manejarPaginaSiguiente = () => {
    if (hayMas) {
      setPagina((prevPagina) => prevPagina + 1);
    }
  };

  const manejarPaginaAnterior = () => {
    if (pagina > 1) {
      setPagina((prevPagina) => prevPagina - 1);
    }
  };

  // Función para generar PDF estilizado
  const imprimirFactura = () => {
    const doc = new jsPDF();
    const venta = ventaSeleccionada;
  
    // Estilo General del Documento
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Punto Frío R.T.R.", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("RUC: 1234567890001", 105, 30, { align: "center" });
    doc.text("Dirección: Av. Principal, Quito, Ecuador", 105, 35, { align: "center" });
    doc.text("Teléfono: +593 9 9999 9999", 105, 40, { align: "center" });
  
    // Información de la Venta
    doc.setFont("helvetica", "bold");
    doc.text("Información de la Venta", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.text(`Número de Factura: ${venta._id}`, 20, 60);
    doc.text(`Fecha: ${venta.fecha}`, 20, 65);
    doc.text(`Total: $${venta.total.toFixed(2)}`, 20, 70);
    doc.text(`Atendido por: ${venta.usuario_id.nombre} ${venta.usuario_id.apellido}`, 20, 75); // Agregado
  
    // Información del Cliente
    doc.setFont("helvetica", "bold");
    doc.text("Información del Cliente", 20, 85);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Nombre: ${venta.cliente_id.nombre} ${venta.cliente_id.apellido}`,
      20,
      95
    );
  
    doc.setFont("helvetica", "bold");
    doc.text("Detalles de la Venta", 20, 105);
  
    // Detalles de la Venta (Usando autoTable)
    const detalles = venta.detalles.map((detalle) => [
      detalle.producto_id.nombre,
      detalle.cantidad,
      `$${detalle.precio_unitario.toFixed(2)}`,
      `$${detalle.total.toFixed(2)}`,
    ]);
  
    doc.autoTable({
      startY: 115,
      head: [["Producto", "Cantidad", "Precio Unitario", "Total"]],
      body: detalles,
      theme: "striped",
      styles: { fontSize: 12 },
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
    });
  
    // Mensaje Final
    const finalY = doc.previousAutoTable.finalY + 10;
    doc.setFont("helvetica", "italic");
    doc.text("¡Gracias por su compra! Por favor, conserve esta factura como comprobante.", 20, finalY);
  
    // Guardar PDF
    doc.save(`Factura_${venta._id}.pdf`);
  };

  if (cargando) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Mostrar lista de ventas si no se ha seleccionado ninguna venta
  if (!ventaSeleccionada) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Lista de Ventas</h1>
        <table className="w-full mt-5 table-auto shadow-lg bg-white">
          <thead className="bg-gray-800 text-slate-400">
            <tr>
              <th className="p-2">N°</th>
              <th className="px-4 py-2 text-sm font-medium uppercase">Número de Venta</th>
              <th className="px-4 py-2 text-sm font-medium uppercase">Fecha</th>
              <th className="px-4 py-2 text-sm font-medium uppercase">Total</th>
              <th className="px-4 py-2 text-sm font-medium uppercase">Acción</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta, index) => (
              <tr key={venta._id}>
                <td className="border border-gray-300 p-2 text-center">{(pagina - 1) * limite + index + 1}</td>
                <td className="border border-gray-300 p-2 text-center">{venta._id}</td>
                <td className="border border-gray-300 p-2 text-center">{venta.fecha}</td>
                <td className="border border-gray-300 p-2 text-center">${venta.total.toFixed(2)}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <AiFillEye className="cursor-pointer inline-block" size={30} onClick={() => obtenerVentaPorId(venta._id)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Botones de Navegación */}
        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 rounded bg-blue-500 text-white ${
              pagina === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={manejarPaginaAnterior}
            disabled={pagina === 1}
          >
            Anterior
          </button>
          <span className="px-4 py-2 border-t border-b text-gray-700 font-medium">
              {pagina}
          </span>
          <button
            className={`px-4 py-2 rounded bg-blue-500 text-white ${
              !hayMas ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={manejarPaginaSiguiente}
            disabled={!hayMas}
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  }

  // Mostrar la factura de la venta seleccionada
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-md mt-4">
      <button
        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 mb-4"
        onClick={() => setVentaSeleccionada(null)}
      >
        Volver a la Lista de Ventas
      </button>
      <button
        className="bg-green-500 text-white ml-4 px-3 py-1 rounded hover:bg-green-700"
        onClick={imprimirFactura}
      >
        Imprimir Factura
      </button>
      <h1 className="text-2xl font-bold text-center mb-6">Factura de Venta</h1>

      {/* Información de la Empresa */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Punto Frío R.T.R.</h2>
        <p><strong>RUC:</strong> {import.meta.env.VITE_RUC}</p>
        <p><strong>Dirección:</strong> {import.meta.env.VITE_DIRECCION}</p>
        <p><strong>Teléfono:</strong> {import.meta.env.VITE_TELEFONO}</p>
      </div>

      {/* Información de la Venta */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Información de la Venta</h2>
        <p><strong>Número de Factura:</strong> {ventaSeleccionada._id}</p>
        <p><strong>Fecha:</strong> {ventaSeleccionada.fecha}</p>
        <p><strong>Total:</strong> ${ventaSeleccionada.total.toFixed(2)}</p>
        <p><strong>Atendido por:</strong> {ventaSeleccionada.usuario_id.nombre} {ventaSeleccionada.usuario_id.apellido}</p>
      </div>

      {/* Información del Cliente */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Información del Cliente</h2>
        <p>
          <strong>Nombre:</strong>{" "}
          {ventaSeleccionada.cliente_id.nombre} {ventaSeleccionada.cliente_id.apellido}
        </p>
      </div>

      {/* Detalles de la Venta */}
      <div>
        <h2 className="text-lg font-bold">Detalles de la Venta</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">Producto</th>
              <th className="border border-gray-300 px-2 py-1">Cantidad</th>
              <th className="border border-gray-300 px-2 py-1">Precio Unitario</th>
              <th className="border border-gray-300 px-2 py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {ventaSeleccionada.detalles.map((detalle) => (
              <tr key={detalle._id}>
                <td className="border border-gray-300 px-2 py-1">{detalle.producto_id.nombre}</td>
                <td className="border border-gray-300 px-2 py-1 text-center">{detalle.cantidad}</td>
                <td className="border border-gray-300 px-2 py-1 text-right">${detalle.precio_unitario.toFixed(2)}</td>
                <td className="border border-gray-300 px-2 py-1 text-right">${detalle.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Información de Pie de Página */}
      <div className="mt-6 text-center">
        <p>¡Gracias por su compra!</p>
        <p>Por favor, conserve esta factura como comprobante.</p>
      </div>
    </div>
  );
};

export default Factura;
