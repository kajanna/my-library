import { createPortal } from "react-dom";

import AppearAnimation from "./AppearAnimation";
import BackDrop from "./BackDrop";

import "./Modal.scss";

interface ModalProps {
  title: string;
  children: JSX.Element[] | JSX.Element | string;
  onCloseModal: () => void;
  error?: boolean;
}

const Modal = ({ children, title, onCloseModal, error }: ModalProps) => {
  const modal = (
    <>
      <BackDrop close={onCloseModal} />
      <div className="modal_bg">
        <AppearAnimation>
          <div className="modal">
            <div
              className={
                error ? "modal_title modal_title--error" : "modal_title"
              }
            >
              {title}
            </div>
            <div
              className={
                error ? "modal_content modal_content--error" : "modal_content"
              }
            >
              {children}
            </div>
            <div
              className={
                error ? "modal_footer modal_footer--error" : "modal_footer"
              }
            ></div>
          </div>
        </AppearAnimation>
      </div>
    </>
  );
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return createPortal(modal, modalRoot);
};

export default Modal;
