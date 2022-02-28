import { useState, useContext, ReactNode } from 'react';

import BookItemActions from './BookItemActions';
import Card from '../../shared/Card';
import DeleteModal from '../../shared/DeleteModal';
import AuthContext from '../../shared/contexts/authContext';
import AppearAnimation from '../../shared/AppearAnimation';

import './BookItem.scss'


interface BookItemProps {
  borrowerId?: string | null, 
  borrowerName?: string | null, 
  title: string, 
  authors:  string, 
  date:string, 
  id:string,
  ownerName:string,
  ownerId:string 
  onDeleteBook:(deletedBookId: string) => void
}

function BookItem({ borrowerName, borrowerId, title, authors, date, id, ownerName, ownerId, onDeleteBook }: BookItemProps) {
  const auth = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal ] = useState(false);
  
  const bookItemActions = <BookItemActions bookId={id} isNotUsersBook={ownerId == auth?.id} onOpenDeleteModal={()=>setShowDeleteModal(true)}/>
  let whereIsTheBook:ReactNode;
  if (ownerId == auth?.id) {
    whereIsTheBook = (
    <div className="book-item__info-items">
      <div>{borrowerName ? "borrower:" : "in your library"}</div>
      {borrowerName && <div>{borrowerName}</div>}
  </div>);
  }
  if (borrowerId == auth?.id) {
    whereIsTheBook = (
    <div className="book-item__info-items">
      <div>owner:</div>
      <div>{ownerName}</div>
  </div>);
  }
  return (
    <>
      {showDeleteModal && <DeleteModal 
      itemId={id} 
      onDeleteBook={onDeleteBook} 
      title={title} 
      onCloseDeleteModal={() =>setShowDeleteModal(false)}/>}
    <AppearAnimation>
    <div className="book-item">
      <Card title={bookItemActions} noTitlePadding>
        <div className="book-item__main">
          <div className="book-item__info">
              <div className="book-item__title">{title}</div>
              <div>{authors}</div> 
            <div className="book-item__info-items">{date}</div>
            {whereIsTheBook}
          </div>
          <div className="book-item__photo"></div>
        </div>
      </Card>
    </div>
    </AppearAnimation>
    </>
  );
}

export default BookItem;