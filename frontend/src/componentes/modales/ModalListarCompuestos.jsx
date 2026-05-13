import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import api from "../../api/api";
import ModalModificarCompuesto from "./ModalModificarCompuesto";
import ModalEliminarCompuesto from "./ModalEliminarCompuesto";

function ModalListarCompuestos({ isOpen, onClose }) {

  const [compuestos, setCompuestos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [compuestoSeleccionado, setCompuestoSeleccionado] = useState(null);

  const cargarCompuestos = async () => {
    try {

      const res = await api.get("/compuestos/");
      setCompuestos(res.data);

      console.log(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    if (isOpen) {
      cargarCompuestos();
    }

  }, [isOpen]);

  const compuestosFiltrados = compuestos.filter((c) =>
    (c.nombre_archivo || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirEditar = (compuesto) => {
    setCompuestoSeleccionado(compuesto);
    setModalEditar(true);
  };

  const abrirEliminar = (compuesto) => {
    setCompuestoSeleccionado(compuesto);
    setModalEliminar(true);
  };

  return (

    <Modal isOpen={isOpen} onClose={onClose} title="Lista de conformaciones">

      <input
        placeholder="Buscar compuesto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="tabla-scroll">
        <table className="tabla-etiquetas">

          <thead>
            <tr>
              <th>Nombre</th>
              <th>Archivo</th>
              <th>Compuestos</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {compuestosFiltrados.map((compuesto)=>(
            <tr key={compuesto.id}>

            <td>{compuesto.nombre_archivo || "-"}</td>

            <td>{compuesto.ruta_archivo || "-"}</td>

            <td>{compuesto.libreria_nombre || "-"}</td>

            <td>

            <button onClick={()=>abrirEditar(compuesto)}>
            Modificar
            </button>

            <button onClick={()=>abrirEliminar(compuesto)}>
            Eliminar
            </button>

            </td>

            </tr>
            ))}

            </tbody>

        </table>
      </div>
      <ModalModificarCompuesto
        isOpen={modalEditar}
        onClose={() => setModalEditar(false)}
        compuesto={compuestoSeleccionado}
        actualizar={cargarCompuestos}
      />

      <ModalEliminarCompuesto
        isOpen={modalEliminar}
        onClose={() => setModalEliminar(false)}
        compuesto={compuestoSeleccionado}
        actualizar={cargarCompuestos}
      />

    </Modal>

  );
}

export default ModalListarCompuestos;