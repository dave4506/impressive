import React, { PropTypes } from 'react';
import s from './modal.css';

const Modal = ({children,modalStatus,onClose}) => {
  return (
    <div className={`${s["modal"]} ${s["modal__" + (modalStatus ? "open":"close")]}`}>
      <div onClick={onClose} className={`${s["modal-bkgrnd"]} ${s["modal-bkgrnd__" + (modalStatus ? "open":"close")]}`}></div>
      <div className={`${s["modal-content"]} ${s["modal-content__" + (modalStatus ? "open":"close")]}`}>
        {children}
      </div>
    </div>
  )
}

export default Modal;
