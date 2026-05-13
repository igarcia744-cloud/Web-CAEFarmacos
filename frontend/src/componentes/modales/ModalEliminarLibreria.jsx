import Modal from "./Modal";
import api from "../../api/api";

function ModalEliminarLibreria({ isOpen, onClose, libreria, actualizar }) {

  const eliminar = async ()=>{

    try{

      await api.delete(`/librerias/${libreria.id}`);

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
      title="Eliminar librería"
    >

      <p>
        ¿Seguro que quieres eliminar la librería <b>{libreria?.nombre}</b>?
      </p>

      <div className="modal-buttons">

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

export default ModalEliminarLibreria;