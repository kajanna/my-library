import Modal from './Modal';
import useFirebase from './hooks/useFirebase';
import LoadingSpinner from './LoadingSpinner';
import ErrorModal from './ErrorModal';

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
  const { deleteBook, loading, firebaseError, clearError } = useFirebase();

  async function deleteBookHandler(itemId: string) {
    try {
      const deletedBook = await deleteBook(itemId);
      if (deletedBook) {
        onDeleteBook(itemId);
        onCloseDeleteModal();
      }
    } catch (err) {}
  }

  return (
    <>
     {loading && <LoadingSpinner />}
     {firebaseError && <ErrorModal  errorText={firebaseError} closeErrorModal={clearError}/>}
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
    </>
  );
}

export default DeleteModal;