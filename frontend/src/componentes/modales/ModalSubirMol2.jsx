import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import api from "../../api/api";

function ModalSubirMol2({ isOpen, onClose }) {

  const [archivo, setArchivo] = useState(null);

  const [librerias, setLibrerias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [libreriaSeleccionada, setLibreriaSeleccionada] = useState(null);

  useEffect(() => {
    if (isOpen) {
      cargarLibrerias();
    }
  }, [isOpen]);

  const cargarLibrerias = async () => {
    try {
      const res = await api.get("/librerias/");
      setLibrerias(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filtradas = librerias.filter(l =>
    (l.nombre ?? "").toLowerCase().includes(busqueda.toLowerCase())
  );

  const seleccionarLibreria = (libreria) => {
    setLibreriaSeleccionada(libreria);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!archivo) {
      alert("Selecciona una conformación");
      return;
    }

    if (!libreriaSeleccionada) {
      alert("Selecciona un compuesto");
      return;
    }

    const formData = new FormData();

    formData.append("archivo", archivo);
    formData.append("libreria_id", libreriaSeleccionada.id);

    try {

      await api.post("/upload/mol2", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Conformación subida correctamente");

      setArchivo(null);
      setLibreriaSeleccionada(null);
      onClose();

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Subir Conformación (.mol2)"
    >

      <div className="modal-librerias-container">

        <input
          placeholder="Buscar librería..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <div className="modal-librerias-tabla">

          <div className="tabla-scroll">
            <table className="tabla-etiquetas">

              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Comentario</th>
                  <th>Nº Conformación</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>

                {filtradas.map((l) => (
                  <tr key={l.id}
                      style={{
                        background:
                          libreriaSeleccionada?.id === l.id ? "#2a3a2a" : ""
                      }}
                  >

                    <td>{l.nombre}</td>
                    <td>{l.comentario || "-"}</td>
                    <td>{l.numero_compuestos}</td>

                    <td>

                      {libreriaSeleccionada?.id === l.id ? (

                        <button style={{
                          background:"#818181",
                          color:"#c0c0c0"
                        }}>
                          Seleccionado
                        </button>

                      ) : (

                        <button onClick={()=>seleccionarLibreria(l)}>
                          Seleccionar
                        </button>

                      )}

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        </div>

        <div className="modal-subida">

          <form onSubmit={handleSubmit}>

            <input
              type="file"
              accept=".mol2"
              onChange={(e)=>setArchivo(e.target.files[0])}
            />

            {libreriaSeleccionada && (
              <p style={{color:"#438e23"}}>
                Compuesto seleccionado: {libreriaSeleccionada.nombre}
              </p>
            )}

            <div className="modal-buttons">

              <button type="submit">
                Subir
              </button>

              <button type="button" onClick={onClose}>
                Cancelar
              </button>

            </div>

          </form>

        </div>

      </div>

    </Modal>
  );
}

export default ModalSubirMol2;
