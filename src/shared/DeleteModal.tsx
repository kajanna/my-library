import React from 'react';

import Modal from './Modal';

import './DeleteModal.scss'

interface DeleteModalProps {
    onCloseDeleteModal: ()=> void,
    title: string,
    itemId: string | null | undefined
}

function DeleteModal({ onCloseDeleteModal, title, itemId }: DeleteModalProps) {
  
    const deleteBookHandler = (itemId: string | null | undefined) => {
    //delete item on server
    //
    console.log(itemId);
    onCloseDeleteModal();
  }

  return (
      <Modal title="Delete book" onCloseModal={onCloseDeleteModal}>
        <div>Do you want to delete {title} from your Library?</div>
         <div className='delete-modal-button-section'>
          <button 
          className="delete-modal-button-delete" 
          onClick={() => deleteBookHandler(itemId)}>yes</button>
          <button className="delete-modal-button-cancel"onClick={onCloseDeleteModal}>No</button>
        </div>
      </Modal>
  );
}

export default DeleteModal;