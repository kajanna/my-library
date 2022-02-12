import React from 'react';
import Modal from './Modal';

import './ErrorModal.scss'

interface ErrorModalProps {
    errorText: string | null | undefined,
    closeErrorModal: () => void
}

function ErrorModal({ errorText, closeErrorModal }: ErrorModalProps) {
    return (
        <Modal title="Error" error onCloseModal={closeErrorModal}>
            <div>
                <div className="error-modal__text">
                    {errorText}
                </div>
                <button className="error-modal__button" onClick={closeErrorModal}>
                    Ok
                </button>
            </div>
        </Modal>
    );
}

export default ErrorModal;