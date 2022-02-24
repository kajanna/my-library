import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
    getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, query, where, getDocs, getDoc, serverTimestamp
  } from 'firebase/firestore';

import { EditedBookData, Book, BookFormFormikValues } from '../shared_interfaces'


function useFirebase() {
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebasError] = useState<string | null>();
 
  const db = getFirestore();
  const bookRef = collection(db, "books");

  const navigate = useNavigate();
  

  async function getUserBooksById(id: string) {
    setLoading(true);
    const q = query(collection(db, "books"), where("ownerId", "==", id));
    const loadedBooks: Book[] | null = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        loadedBooks.push({
          id: doc.id,
          title: doc.data().title,
          authors: doc.data().authors,
          date: doc.data().date.toDate().toString(),
          cover: doc.data().cover,
          ownerId: doc.data().ownerId,
          ownerName: doc.data().ownerName,
          borrowerName: doc.data().borrowerName,
        });
      });
      setLoading(false);
      return loadedBooks;
    } catch (error) {
      setLoading(false);
      setFirebasError("No books");
    }
  }

  async function getEditedBook(id: string) {
    setLoading(true);
    const bookRef = doc(db, "books", id);
    try {
      const docSnap = await getDoc(bookRef);
      if (docSnap.exists()) {
        const book: BookFormFormikValues = {
          title: docSnap.data().title,
          authors: docSnap.data().authors,
          borrowerName: docSnap.data().borrowerName,
        };
        setLoading(false);
        return book;
      } else {
        setLoading(false);
        setFirebasError("We could not find your book");
      }
    } catch (error) {
      setLoading(false);
      setFirebasError("We couldn't find your book");
    }
  }

  async function addNewBook({
    title,
    authors,
    ownerName,
    ownerId,
    borrowerName,
  }: Book) {
    setLoading(true);
    const newBook = {
      title,
      authors,
      ownerName,
      ownerId,
      borrowerName: borrowerName ? borrowerName : '',
      BorrowerId: '',
      date: serverTimestamp(),
    }
    try {
      const addNewBook = await addDoc(bookRef, newBook);
      if (addNewBook) {
        setLoading(false);
        navigate("/my-library");
      }
    } catch(error) {
        setFirebasError('Something went wrong. Please try again');
        setLoading(false);
      }
  }

  async function deleteBook(bookId: string) {
    setLoading(true);
    const deletedBookRef = doc(db, "books", bookId);
    try {
      await deleteDoc(deletedBookRef);
      setLoading(false);
    } catch(error) {
        setFirebasError("Something went wrong. We couldn't delete your book");
        setLoading(false);
      };
  }

  async function editBookData({
    title,
    authors,
    borrowerName,
    id,
  }: EditedBookData) {
    setLoading(true);
    const editedBookRef = doc(db, "books", id!);
    try {
      await updateDoc(editedBookRef, {
        title,
        authors,
        borrowerName,
        date: serverTimestamp(),
      });
      setLoading(false);
      navigate("/my-library");
    } catch(error) {
      setFirebasError("We couldn't save your book data");
      setLoading(false);
    }
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
  };
}

export default useFirebase;