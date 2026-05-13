import React, { useEffect, useState } from "react";
import api from "../../api/api";
import Modal from "./Modal";

function ModalLog({ isOpen, onClose }) {

  const [logs, setLogs] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroAccion, setFiltroAccion] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [ordenFecha, setOrdenFecha] = useState("");

  useEffect(() => {
    if (isOpen) cargarLogs();
  }, [isOpen]);

  const cargarLogs = async () => {
    try {
      const res = await api.get("/logs");
      setLogs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔍 FILTROS (igual estilo que compuestos)
  const logsFiltrados = logs.filter(log => {

    const coincideBusqueda =
      log.descripcion.toLowerCase().includes(busqueda.toLowerCase());

    const coincideAccion =
      filtroAccion ? log.accion === filtroAccion : true;

    const coincideFecha =
      filtroFecha ? log.fecha.startsWith(filtroFecha) : true;

    return coincideBusqueda && coincideAccion && coincideFecha;
  });

  if (ordenFecha === "nueva") {
    logsFiltrados.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
  }

  if (ordenFecha === "antigua") {
    logsFiltrados.sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log del sistema">

      {/* 🔍 BUSCADOR (igual que compuestos) */}
      <input
        placeholder="Buscar descripción..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* 🔥 FILTROS EXTRA */}
      <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>

        <select
          className="select-accion"
          value={ordenFecha}
          onChange={(e) => setOrdenFecha(e.target.value)}
        >
          <option value="">Sin ordenar</option>
          <option value="nueva">Más nuevas primero</option>
          <option value="antigua">Más antiguas primero</option>
        </select>

        <select className="select-accion"
          value={filtroAccion}
          onChange={(e) => setFiltroAccion(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
          <option value="subir_zip">Subir ZIP</option>
          <option value="subir_mol2">Subir MOL</option>
        </select>

        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
        />

      </div>

      {/* 🔥 TABLA EXACTA MISMA CLASE */}
      <div className="tabla-scroll">
        <table className="tabla-etiquetas">

          <thead>
            <tr>
              <th>Descripción</th>
              <th>Acción</th>
              <th>Usuario</th>
              <th>Fecha</th>
            </tr>
          </thead>

          <tbody>

            {logsFiltrados.map((log) => (
              <tr key={log.id}>

                <td>{log.descripcion}</td>

                <td className={`accion-${log.accion}`}>
                  {log.accion}
                </td>

                <td>{log.usuario}</td>

                <td>{log.fecha}</td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </Modal>
  );
}

export default ModalLog;