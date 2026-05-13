import React from "react";
import "../../css/Modal.css";

function Modal({ isOpen, onClose, title, children }) {

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-content">

        <span className="modal-close" onClick={onClose}>✕</span>

        {title && <h2>{title}</h2>}

        <div className="modal-body">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Modal;