import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import api from "../../api/api";

function ModalModificarLibreria({ isOpen, onClose, libreria, actualizar }) {

  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");

  useEffect(()=>{

    if(libreria){
      setNombre(libreria.nombre);
      setComentario(libreria.comentario);
    }

  },[libreria]);

  const handleSubmit = async (e)=>{

    e.preventDefault();

    try{

      await api.put(`/librerias/${libreria.id}`,{
        nombre: nombre,
        comentario: comentario
      });

      actualizar();
      onClose();

    }catch(error){

      console.error(error);

    }

  };

  return(

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Modificar librería"
    >

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          value={nombre}
          onChange={(e)=>setNombre(e.target.value)}
        />

        <input
          type="text"
          value={comentario}
          onChange={(e)=>setComentario(e.target.value)}
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

export default ModalModificarLibreria;