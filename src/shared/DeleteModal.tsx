import Modal from './Modal';

import './DeleteModal.scss'


interface DeleteModalProps {
    onCloseDeleteModal: () => void,
    title: string,
    itemId: string,
    coverRef?: string | undefined,
    onDeleteBook: (deletedBookId: string, deletedBookRef?: string | undefined) => Promise<void>
}

function DeleteModal({ onCloseDeleteModal, title, itemId, coverRef, onDeleteBook}: DeleteModalProps) {
  
  const deleteBookWithIDHandler = async (itemId: string, coverRef?: string | undefined) => {
    try {
      await onDeleteBook(itemId, coverRef);
      onCloseDeleteModal();
    } catch(err) {}
  };

  return (
    <>
    <Modal title="Delete book" onCloseModal={onCloseDeleteModal}>
      <div>Do you want to delete {title} from your Library?</div>
      <div className="delete-modal-button-section">
        <button
          className="delete-modal-button-delete"
          onClick={() => deleteBookWithIDHandler(itemId, coverRef)}
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