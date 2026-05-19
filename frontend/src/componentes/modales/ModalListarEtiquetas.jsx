import React, { useState, useEffect } from "react";

import Modal from "./Modal";
import ModalModificarEtiqueta from "./ModalModificarEtiqueta";
import ModalEliminarEtiqueta from "./ModalEliminarEtiqueta";

import api from "../../api/api";

function ModalListarEtiquetas({ isOpen, onClose }) {

  const [etiquetas, setEtiquetas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const cargarEtiquetas = async () => {
    try{
      const res = await api.get("/etiquetas/");
      setEtiquetas(res.data);
    }catch(error){
      console.error(error);
    }
  };

  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState(null);

  const abrirEditar = (etiqueta) => {
    setEtiquetaSeleccionada(etiqueta);
    setModalEditar(true);
  };

  const abrirEliminar = (etiqueta) => {
    setEtiquetaSeleccionada(etiqueta);
    setModalEliminar(true);
  };

  useEffect(() => {
    if(isOpen){
      cargarEtiquetas();
    }
  }, [isOpen]);

  const etiquetasFiltradas = etiquetas.filter((e)=>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Lista de etiquetas"
    >

      <input
        placeholder="Buscar etiqueta..."
        value={busqueda}
        onChange={(e)=>setBusqueda(e.target.value)}
      />

      <div className="tabla-scroll">
        <table className="tabla-etiquetas">

          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {etiquetasFiltradas.map((etiqueta)=>(
              <tr key={etiqueta.id}>
                
                <td>{etiqueta.nombre}</td>

                <td>

                  <button onClick={() => abrirEditar(etiqueta)}>
                    Modificar
                  </button>

                  <button onClick={() => abrirEliminar(etiqueta)}>
                    Eliminar
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>
      <ModalModificarEtiqueta
        isOpen={modalEditar}
        onClose={() => setModalEditar(false)}
        etiqueta={etiquetaSeleccionada}
        actualizar={cargarEtiquetas}
      />

      <ModalEliminarEtiqueta
        isOpen={modalEliminar}
        onClose={() => setModalEliminar(false)}
        etiqueta={etiquetaSeleccionada}
        actualizar={cargarEtiquetas}
      />

    </Modal>
  );
}

export default ModalListarEtiquetas;