import React from "react";
import "../css/FiltrosExplorador.css"

function FiltrosExplorador({ filtros, setFiltros }) {

  return (

    <div>

      <p className="sidebar-title">Filtros</p>

      <div className="filtro-bloque">

        <p className="filtro-titulo">Buscar por nombre:</p>

        {/* BUSCADOR */}
        <input
          placeholder="Buscar..."
          value={filtros.busqueda}
          onChange={(e) =>
            setFiltros({ ...filtros, busqueda: e.target.value })
          }
        />

      </div>

      <div className="explorador-bloque">
        
        <p className="explorador-titulo">Ordenar alfabéticamente:</p>

        {/* ORDEN */}
        <select
          value={filtros.orden}
          onChange={(e) =>
            setFiltros({ ...filtros, orden: e.target.value })
          }
        >
          <option value="nombre_asc">Nombre A-Z</option>
          <option value="nombre_desc">Nombre Z-A</option>
        </select>

      </div>

    </div>

  );

}

export default FiltrosExplorador;