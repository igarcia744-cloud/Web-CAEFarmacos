import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import api from "../../api/api";

function ModalModificarCompuesto({ isOpen, onClose, compuesto, actualizar }) {

  const [nombre, setNombre] = useState("");
  const [libreria_id, setLibreriaId] = useState("");

  useEffect(() => {

    if(compuesto){

      setNombre(compuesto.nombre_archivo ?? "");
      setLibreriaId(compuesto.libreria_id ?? 0);

    }

  }, [compuesto]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(!nombre || !libreria_id){
    alert("Todos los campos son obligatorios");
    return;
  }

    try {

      await api.put(`/compuestos/${compuesto.id}`, {
        nombre_archivo: nombre,
        libreria_id: parseInt(libreria_id)
      });

      actualizar(); 
      onClose();

    } catch(error){

  console.log("ERROR COMPLETO:", error.response.data.detail);

}

  };

  return (

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Modificar compuesto"
    >

      <form onSubmit={handleSubmit}>

        <p>Recuerda poner la extension .mol2</p>
        <br></br>
        <input
          type="text"
          placeholder="Nombre del compuesto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="number"
          hidden
          placeholder="ID de librería"
          value={libreria_id}
          onChange={(e) => setLibreriaId(e.target.value)}
        />

        <div className="modal-buttons">

          <button type="submit">
            Guardar
          </button>

          <button type="button" onClick={onClose}>
            Cancelar
          </button>

        </div>

      </form>

    </Modal>

  );

}

export default ModalModificarCompuesto;