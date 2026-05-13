import React, { useState } from "react";
import Modal from "./Modal";
import api from "../../api/api";

function ModalCrearEtiqueta({ isOpen, onClose }) {

  const [nombre, setNombre] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/etiquetas/", {
        nombre: nombre
      });

      setNombre("");

      onClose();

    } catch (error) {

      console.error(error);
      alert("Error al crear etiqueta");

    }

  };

  return (

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear etiqueta"
    >

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nombre de la etiqueta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <div className="modal-buttons">

          <button type="submit">
            Crear
          </button>

          <button type="button" onClick={onClose}>
            Cancelar
          </button>

        </div>

      </form>

    </Modal>

  );
}

export default ModalCrearEtiqueta;