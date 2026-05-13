import React, { useState } from "react";
import Modal from "./Modal";
import api from "../../api/api";

function ModalSubirZip({ isOpen, onClose }) {

  const [archivo, setArchivo] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(!archivo){
      alert("Selecciona un archivo ZIP");
      return;
    }

    const formData = new FormData();

    formData.append("archivo", archivo);

    try{

      await api.post("/upload/zip", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Librería subida correctamente");

      onClose();

    }catch(error){

      console.error(error);

    }

  };

  return(

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Subir compuesto (.zip)"
    >

      <form onSubmit={handleSubmit}>

        <input
          type="file"
          accept=".zip"
          onChange={(e)=>setArchivo(e.target.files[0])}
          required
        />

        <div className="modal-buttons">

          <button type="submit">
            Subir
          </button>

          <button type="button" onClick={onClose}>
            Cancelar
          </button>

        </div>

      </form>

    </Modal>

  );

}

export default ModalSubirZip;