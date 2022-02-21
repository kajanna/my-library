import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
    getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, query, where, getDocs, getDoc
  } from 'firebase/firestore';

import { newBookData, editedBookData, Book, BookFormFormikValues } from '../shared_interfaces'


function useFirebase() {
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebasError] = useState<string | null>();
  const [ editedBook, setEditedBook ] = useState<BookFormFormikValues>();
  const [books, setBooks] = useState<Book[] | null>();

  const db = getFirestore();
  const bookRef = collection(db, "books");

  const navigate = useNavigate();
  

  async function getUserBooksById(id: string) {
    const q = query(collection(db, "books"), where("ownerId", "==", id));
    const loadedBooks: Book[] | null = [];
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          loadedBooks.push({
            key: doc.id,
            id: doc.id,
            title: doc.data().title,
            authors: doc.data().authors,
            date: doc.data().date,
            cover: doc.data().cover,
            ownerId: doc.data().ownerId,
            ownerName: doc.data().ownerName,
            borrower: doc.data().borrower,
          });
        });
        setBooks(loadedBooks);
      })
      .catch((error) => setFirebasError(error));
  }

  function getEditedBook(id: string) {
    const bookRef = doc(db, "books", id);
    getDoc(bookRef).then((docSnap) => {
      if (docSnap.exists()) {
        setEditedBook({
          title: docSnap.data().title,
          authors: docSnap.data().authors,
          borrower: docSnap.data().borrower,
        });
      }
    });
  }

  function addNewBook({
    title,
    authors,
    ownerName,
    ownerId,
    borrower,
    date,
  }: newBookData) {
    setLoading(true);
    addDoc(bookRef, {
      title,
      authors,
      ownerName,
      ownerId,
      borrower,
      date: date,
    })
      .then(() => {
        setLoading(false);
        navigate("/my-library");
      })
      .catch((err) => setFirebasError(err));
  }

  function deleteBook(bookId: string) {
    setLoading(true);
    const deletedBookRef = doc(db, "books", bookId);
    deleteDoc(deletedBookRef)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => setFirebasError(err));
  }

  function editBookData({
    title,
    authors,
    borrower,
    date,
    id,
  }: editedBookData) {
    setLoading(true);
    const editedBookRef = doc(db, "books", id!);
    updateDoc(editedBookRef, {
      title,
      authors,
      borrower,
      date,
    })
      .then(() => {
        setLoading(false);
        navigate("/my-library");
      })
      .catch((err) => setFirebasError(err));
  }

  function clearError() {
    setFirebasError(null);
  }

  return {
    getUserBooksById,
    addNewBook,
    deleteBook,
    editBookData,
    clearError,
    getEditedBook,
    firebaseError,
    loading,
    books,
    editedBook
  };
}

export default useFirebase;