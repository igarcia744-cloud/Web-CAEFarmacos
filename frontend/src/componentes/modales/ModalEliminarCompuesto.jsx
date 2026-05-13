import Modal from "./Modal";
import api from "../../api/api";

function ModalEliminarCompuesto({ isOpen, onClose, compuesto, actualizar }) {

  const eliminar = async () => {

    try {

      await api.delete(`/compuestos/${compuesto.id}`);

      actualizar();

      onClose();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <Modal isOpen={isOpen} onClose={onClose} title="Eliminar compuesto">

      <p>
        ¿Seguro que quieres eliminar el compuesto <b>{compuesto?.nombre_archivo}</b>?
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

export default ModalEliminarCompuesto;