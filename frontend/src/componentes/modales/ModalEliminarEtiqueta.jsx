import React from "react";
import Modal from "./Modal";
import api from "../../api/api";

function ModalEliminarEtiqueta({ isOpen, onClose, etiqueta, actualizar }) {

  const eliminar = async () => {

    console.log("Eliminar etiqueta:", etiqueta);

    try {

      await api.delete(`/etiquetas/${etiqueta.id}`);

      actualizar();

      onClose();

    } catch (error) {

      console.error("Error eliminando:", error);

    }

  };

  return (

    <Modal isOpen={isOpen} onClose={onClose} title="Eliminar etiqueta">

      <p>
        ¿Seguro que quieres eliminar la etiqueta <b>{etiqueta?.nombre}</b>?
      </p>

      <div className="modal-buttons" >

        <button type="button" onClick={eliminar}>
          Eliminar
        </button>

        <button type="button" onClick={onClose}>
          Cancelar
        </button>

      </div>

    </Modal>

  );
}

export default ModalEliminarEtiqueta;