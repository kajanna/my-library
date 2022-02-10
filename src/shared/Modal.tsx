import React from 'react';

import './Modal.scss'

interface ModalProps {
    title: string,
    children: JSX.Element[] | JSX.Element | string,
    onCloseModal: () => void,
    error?: boolean
}

function Modal({ children, title, error } : ModalProps) {
    return (
        <div className='modal_bg'>
            <div className="modal">
            <div className={error ? "modal_title error": "modal_title"}>{title}</div>
            <div className="modal_content">{children}</div>
            <div className={error ? "modal_footer error" :"modal_footer"}></div>
        </div>
        </div>
    );
}

export default Modal;