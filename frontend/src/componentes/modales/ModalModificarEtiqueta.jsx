import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import api from "../../api/api";

function ModalEditarEtiqueta({ isOpen, onClose, etiqueta, actualizar }) {

  const [nombre,setNombre] = useState("");

  useEffect(()=>{
    if(etiqueta){
      setNombre(etiqueta.nombre);
    }
  },[etiqueta]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try{

      await api.put(`/etiquetas/${etiqueta.id}`,{
        nombre
      });

      actualizar();

      onClose();

    }catch(error){
      console.error(error);
    }

  };

  return(

    <Modal isOpen={isOpen} onClose={onClose} title="Modificar etiqueta">

      <form onSubmit={handleSubmit}>

        <input
          value={nombre}
          onChange={(e)=>setNombre(e.target.value)}
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

export default ModalEditarEtiqueta;