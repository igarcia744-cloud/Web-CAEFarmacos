import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../css/TablaDatos.css"

import ModalGestionarEtiquetas from "./modales/ModalGestionarEtiquetas"

function TablaDatos({ filtros }) {

  const [librerias, setLibrerias] = useState([]);
  const [compuestos, setCompuestos] = useState([]);

  useEffect(() => {
    cargarLibrerias();
    cargarCompuestos();
  }, []);


  const cargarLibrerias = async () => {
    const res = await api.get("/librerias/");
    setLibrerias(res.data);
  };

  const cargarCompuestos = async () => {
    const res = await api.get("/compuestos/");
    setCompuestos(res.data);
  };

  const recargarDatos = () =>{
    cargarLibrerias();
    cargarCompuestos();
  }

  const descargarLibreria = async (libreria) => {

    const res = await api.get(`/download/libreria/${libreria.id}`, {
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", `${libreria.nombre}.zip`);

    document.body.appendChild(link);
    link.click();

  };

  const descargarCompuesto = async (comp) => {

    const res = await api.get(`/download/compuesto/${comp.id}`, {
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", comp.nombre_archivo);

    document.body.appendChild(link);
    link.click();

  };

  const [modalEtiquetas, setModalEtiquetas] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");

  const abrirEtiquetas = (item, tipo) => {
    setItemSeleccionado(item);
    setTipoSeleccionado(tipo);
    setModalEtiquetas(true);
  };

  let libreriasFiltradas = librerias

    // 🔍 búsqueda
    .filter(lib =>
      lib.nombre.toLowerCase().includes(filtros.busquedaLibrerias.toLowerCase())
    )

    // 🏷 etiquetas
    .filter(lib => {
      if (!filtros.etiquetas || filtros.etiquetas.length === 0) return true;

      return lib.etiquetas.some(et =>
        filtros.etiquetas.includes(et.id)
      );
    });


  // 🔥 FILTRO ATRIBUTOS

  // nº compuestos
  if (filtros.filtroTipo === "num_compuestos") {
    libreriasFiltradas = libreriasFiltradas.filter(lib =>
      lib.numero_compuestos >= filtros.minCompuestos &&
      lib.numero_compuestos <= filtros.maxCompuestos
    );
  }

  // 🔄 ORDEN
  if (filtros.orden === "nombre_asc") {
    libreriasFiltradas.sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    );
  }

  if (filtros.orden === "nombre_desc") {
    libreriasFiltradas.sort((a, b) =>
      b.nombre.localeCompare(a.nombre)
    );
  }

  

  let compuestosFiltrados = compuestos

    // 🔍 búsqueda
    .filter(comp =>
      comp.nombre_archivo.toLowerCase().includes(filtros.busquedaCompuestos.toLowerCase())
    )

    // 🏷 etiquetas
    .filter(comp => {
      if (!filtros.etiquetas || filtros.etiquetas.length === 0) return true;

      return comp.etiquetas.some(et =>
        filtros.etiquetas.includes(et.id)
      );
    });


  // 🔥 FILTRO ATRIBUTOS

  // librería
  if (filtros.filtroTipo === "libreria_nombre") {
    compuestosFiltrados = compuestosFiltrados.filter(comp =>
      comp.libreria_nombre
        .toLowerCase()
        .includes(filtros.filtroNombreLibreria.toLowerCase())
    );
  }

  // 🔄 ORDEN
  if (filtros.orden === "nombre_asc") {
    compuestosFiltrados.sort((a, b) =>
      a.nombre_archivo.localeCompare(b.nombre_archivo)
    );
  }

  if (filtros.orden === "nombre_desc") {
    compuestosFiltrados.sort((a, b) =>
      b.nombre_archivo.localeCompare(a.nombre_archivo)
    );
  }

  return (

  <div className="tabla-contenedor">

    <div className="tabla-header">

      <h2>Vista Tabla</h2>

      <button className="btn-refresh" onClick={recargarDatos}>
        ⟳ Actualizar
      </button>

    </div>

    {/* 📁 LIBRERÍAS */}
    {filtros.mostrarLibrerias && (

      <div className="tabla-bloque">

        <h3>Compuestos</h3>

        <div className="tabla-scroll">

          <table className="tabla-etiquetas">

            <thead>
              <tr>
                <th>Nombre</th>
                <th>Comentario</th>
                <th>Nº Conformaciones</th>
                <th>Etiquetas</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {libreriasFiltradas.map(lib => (

                <tr key={lib.id}>

                  <td>{lib.nombre}</td>
                  <td>{lib.comentario}</td>
                  <td>{lib.numero_compuestos}</td>

                  <td>
                    {lib.etiquetas?.map((et, i) => (
                      <span key={i} className="tag">
                        {et.nombre + ", "}
                      </span>
                    ))}
                  </td>

                  <td>
                    <button onClick={() => descargarLibreria(lib)}>⬇</button>
                    <button onClick={() => abrirEtiquetas(lib, "librerias")}>✏</button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    )}

    {/* 🧪 COMPUESTOS */}
    {filtros.mostrarCompuestos && (

      <div className="tabla-bloque">

        <h3>Conformaciones</h3>

        <div className="tabla-scroll">

          <table className="tabla-etiquetas">

            <thead>
              <tr>
                <th>Nombre</th>
                <th>Compuesto</th>
                <th>Etiquetas</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {compuestosFiltrados.map(comp => (

                <tr key={comp.id}>

                  <td>{comp.nombre_archivo}</td>
                  <td>{comp.libreria_nombre}</td>

                  <td>
                    {comp.etiquetas?.map((et, i) => (
                      <span key={i} className="tag">
                        {et.nombre + ", "}
                      </span>
                    ))}
                  </td>

                  <td>
                    <button onClick={() => descargarCompuesto(comp)}>⬇</button>
                    <button onClick={() => abrirEtiquetas(comp, "compuestos")}>✏</button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    )}


  <ModalGestionarEtiquetas
    isOpen={modalEtiquetas}
    onClose={() => setModalEtiquetas(false)}
    item={itemSeleccionado}
    tipo={tipoSeleccionado}
    actualizar={() => {
      cargarLibrerias();
      cargarCompuestos();
    }}
  />
  </div>
  

);

}

export default TablaDatos;