import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import api from "../../api/api";
import ModalModificarLibreria from "./ModalModificarLibreria";
import ModalEliminarLibreria from "./ModalEliminarLibreria";

function ModalListarLibrerias({ isOpen, onClose }) {

  const [librerias, setLibrerias] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [libreriaSeleccionada, setLibreriaSeleccionada] = useState(null);

  const cargarLibrerias = async () => {

    try{

      const res = await api.get("/librerias/");
      setLibrerias(res.data);

    }catch(error){

      console.error(error);

    }

  };

  useEffect(()=>{

    if(isOpen){
      cargarLibrerias();
    }

  },[isOpen]);

  const filtradas = librerias.filter(l =>
    (l.nombre ?? "").toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirEditar = (libreria)=>{
    setLibreriaSeleccionada(libreria);
    setModalEditar(true);
  };

  const abrirEliminar = (libreria)=>{
    setLibreriaSeleccionada(libreria);
    setModalEliminar(true);
  };

  return(

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Lista de compuestos"
    >

      <input
        placeholder="Buscar librería..."
        value={busqueda}
        onChange={(e)=>setBusqueda(e.target.value)}
      />

      <div className="tabla-scroll">
        <table className="tabla-etiquetas">

          <thead>
              <tr>
              <th>Nombre</th>
              <th>Comentario</th>
              <th>Ruta</th>
              <th>Nºconformaciones</th>
              <th>Acciones</th>
              </tr>
          </thead>

              <tbody>

                  {filtradas.map((libreria)=>(
                      <tr key={libreria.id}>

                          <td>{libreria.nombre}</td>
                          <td>{libreria.comentario || "-"}</td>
                          <td>{libreria.ruta_zip || "-"}</td>
                          <td>{libreria.numero_compuestos}</td>

                          <td>

                              <button onClick={()=>abrirEditar(libreria)}>
                              Modificar
                              </button>

                              <button onClick={()=>abrirEliminar(libreria)}>
                              Eliminar
                              </button>

                          </td>

                      </tr>
                  ))}

              </tbody>

        </table>
      </div>
      <ModalModificarLibreria
        isOpen={modalEditar}
        onClose={()=>setModalEditar(false)}
        libreria={libreriaSeleccionada}
        actualizar={cargarLibrerias}
      />

      <ModalEliminarLibreria
        isOpen={modalEliminar}
        onClose={()=>setModalEliminar(false)}
        libreria={libreriaSeleccionada}
        actualizar={cargarLibrerias}
      />

    </Modal>

  );

}

export default ModalListarLibrerias;