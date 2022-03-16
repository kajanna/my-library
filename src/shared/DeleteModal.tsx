import Modal from './Modal';
import useFirebase from './hooks/useFirebase';
import LoadingSpinner from './LoadingSpinner';
import ErrorModal from './ErrorModal';

import './DeleteModal.scss'


interface DeleteModalProps {
    onCloseDeleteModal: ()=> void,
    title: string,
    itemId: string,
    coverRef?: string,
    onDeleteBook: (deletedBookId: string, deletedBookRef?: string) => void
}

function DeleteModal({ onCloseDeleteModal, title, itemId, coverRef, onDeleteBook}: DeleteModalProps) {
  return (
    <>
    <Modal title="Delete book" onCloseModal={onCloseDeleteModal}>
      <div>Do you want to delete {title} from your Library?</div>
      <div className="delete-modal-button-section">
        <button
          className="delete-modal-button-delete"
          onClick={() => onDeleteBook(itemId, coverRef)}
        >
          yes
        </button>
        <button
          className="delete-modal-button-cancel"
          onClick={onCloseDeleteModal}
        >
          No
        </button>
      </div>
    </Modal>
    </>
  );
}

export default DeleteModal;