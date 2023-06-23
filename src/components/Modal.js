/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/Modal.css';

function Modal({ setOpenModal }) {
  return (
    <div className="modalContainer">
      <div className="titleCloseBtn">
        <button
          onClick={ () => {
            setOpenModal(false);
          } }
        >
          X
        </button>
      </div>
      <div className="body">
        <p>This page is best viewed on mobile devices</p>
      </div>
    </div>

  );
}

export default Modal;
