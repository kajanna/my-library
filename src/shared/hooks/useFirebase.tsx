import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
    getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, query, where, getDocs, getDoc, serverTimestamp, QuerySnapshot, DocumentData, QueryDocumentSnapshot, orderBy
  } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from "firebase/storage";



import { EditedBookData, Book, BookFormFormikValues } from '../shared_interfaces'


function useFirebase() {
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebasError] = useState<string | null>();
 
  const db = getFirestore();
  const bookRef = collection(db, "books");
  const storage = getStorage();
  const storageRef = ref(storage, "books");

  const navigate = useNavigate();
  
  //hepler function for - getUserBooksById
  function setUserBooksData(querySnapshot: QuerySnapshot<DocumentData>) {
    const loadedBooks: Book[] | null = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const day = doc.data().date.toDate().getDate().toString();
      const month = (+doc.data().date.toDate().getMonth() + 1).toString();
      const year = doc.data().date.toDate().getFullYear().toString();
      const date = [day, month, year].join(".");
      loadedBooks.push({
        id: doc.id,
        title: doc.data().title,
        authors: doc.data().authors,
        date: date,
        cover: doc.data().cover,
        ownerId: doc.data().ownerId,
        ownerName: doc.data().ownerName,
        borrowerName: doc.data().borrowerName,
        borrowerId: doc.data().borrowerId,
      });
    })
    return loadedBooks
  }
  //upload files to buckett
  async function fileUpload(file:any) {
    const bookImagesRef = ref(storage, 'mountains.jpg');
    try {
      uploadBytes(bookImagesRef, file).then((snapshot) => {
        console.log('snapshot');
      });
    } catch(error) {
      setLoading(false);
      setFirebasError("No picture");
    }
    
  }

  async function getUserBooksById(id: string) {
    setLoading(true);
    const lentBooksQuery = query(collection(db, "books"), where("ownerId", "==", id), orderBy("date","desc"));
    const borrowedBooksQuery = query(collection(db, "books"), where("borrowerId", "==", id));
    try {
      const lentBooksSnapshot = await getDocs(lentBooksQuery);
      const borrowedBooksSnapshot = await getDocs(borrowedBooksQuery);
      const lentBooks = setUserBooksData(lentBooksSnapshot);
      const borrowedBooks = setUserBooksData(borrowedBooksSnapshot);
      const loadedBooks = [...lentBooks, ...borrowedBooks]
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
          borrowerId: docSnap.data().borrowerId,
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
    borrowerId,
  }: Book) {
    setLoading(true);
    const newBook = {
      title,
      authors,
      ownerName,
      ownerId,
      borrowerName: borrowerName ? borrowerName : '',
      borrowerId: borrowerId ? borrowerId : '',
      date: serverTimestamp(),
    }
    try {
      const addNewBook = await addDoc(bookRef, newBook);
      if (addNewBook) {
        setLoading(false);
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
      return bookId
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