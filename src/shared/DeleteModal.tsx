import React from 'react';

import Modal from './Modal';
import useFirebase from './hooks/useFirebase';

import './DeleteModal.scss'

interface DeleteModalProps {
    onCloseDeleteModal: ()=> void,
    title: string,
    itemId: string,
    onDeleteBook: (deletedBookId: string) => void 
}

function DeleteModal({
  onCloseDeleteModal,
  title,
  itemId,
  onDeleteBook,
}: DeleteModalProps) {
  const { deleteBook } = useFirebase();

  async function deleteBookHandler(itemId: string) {
    try {
      deleteBook(itemId);
      onDeleteBook(itemId);
      onCloseDeleteModal();
    } catch (err) {}
  }

  return (
    <Modal title="Delete book" onCloseModal={onCloseDeleteModal}>
      <div>Do you want to delete {title} from your Library?</div>
      <div className="delete-modal-button-section">
        <button
          className="delete-modal-button-delete"
          onClick={() => deleteBookHandler(itemId)}
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
  );
}

export default DeleteModal;