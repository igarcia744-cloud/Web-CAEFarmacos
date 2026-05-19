import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import api from "../../api/api";

function ModalGestionarEtiquetas({ isOpen, onClose, item, tipo, actualizar }) {

  const [todas, setTodas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [originales, setOriginales] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);

  useEffect(() => {

  if (isOpen) {
    cargarEtiquetas();
  }

  if (isOpen && item) {

    const ids = item.etiquetas?.map(e => e.id) || [];

    setOriginales(ids);
    setSeleccionadas(ids);

  }

}, [isOpen, item]);

  const cargarEtiquetas = async () => {
    const res = await api.get("/etiquetas/");
    setTodas(res.data);
  };

  const toggle = (id) => {
    if (seleccionadas.includes(id)) {
      setSeleccionadas(seleccionadas.filter(e => e !== id));
    } else {
      setSeleccionadas([...seleccionadas, id]);
    }
  };

  const guardar = async () => {
    await api.put(`/${tipo}/${item.id}/etiquetas`, {
      etiquetas_ids: seleccionadas
    });

    actualizar();
    onClose();
  };

  const etiquetasFiltradas = todas.filter(e =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (

    <Modal isOpen={isOpen} onClose={onClose} title="Gestionar etiquetas">

      <p className="modal-subtitle">
        Etiquetas de: {item?.nombre || item?.nombre_archivo}
      </p>

      <div className="etiquetas-seleccionadas">

        {seleccionadas.map(id => {

          const et = todas.find(e => e.id === id);
          if (!et) return null;

          const esNueva = !originales.includes(id);

          return (
            <div
              key={id}
              className={`etiqueta-chip ${esNueva ? "nueva" : ""}`}
              onClick={() => toggle(id)}
            >
              {et.nombre}
              <span className="remove">✖</span>
            </div>
          );
        })}

      </div>

      <div className="modal-separador"></div>

      <p className="modal-subtitle">Elegir etiquetas</p>

      <input
        className="modal-input"
        placeholder="Buscar etiqueta..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="etiquetas-grid-selector">

        {etiquetasFiltradas.map(et => {

          const checked = seleccionadas.includes(et.id);

          return (
            <div
              key={et.id}
              className={`etiqueta-card ${checked ? "selected" : ""}`}
              onClick={() => toggle(et.id)}
            >
              <input
                type="checkbox"
                checked={checked}
                readOnly
              />

              <span>{et.nombre}</span>
            </div>
          );
        })}

      </div>

      <div className="modal-buttons">
        <button onClick={guardar}>
          Guardar
        </button>
      </div>

    </Modal>

  );

}

export default ModalGestionarEtiquetas;