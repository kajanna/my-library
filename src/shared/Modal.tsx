import React from 'react';
import { createPortal } from 'react-dom';

import AppearAnimation from './AppearAnimation';

import './Modal.scss'

interface ModalProps {
    title: string,
    children: JSX.Element[] | JSX.Element | string,
    onCloseModal: () => void,
    error?: boolean
}

function Modal({ children, title, error } : ModalProps) {
    const modal = (
      
        <div className="modal_bg">
            <AppearAnimation>
          <div className="modal">
            <div className={error ? "modal_title error" : "modal_title"}>
              {title}
            </div>
            <div className="modal_content">{children}</div>
            <div
              className={error ? "modal_footer error" : "modal_footer"}
            ></div>
          </div>
          </AppearAnimation>
        </div>
    );
    const modalRoot = document.getElementById("modal-root") as HTMLElement;
    return createPortal(modal, modalRoot)
}

export default Modal;