import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
    getFirestore, collection, addDoc, deleteDoc, doc, updateDoc,
  } from 'firebase/firestore';

  import { newBookData, editedBookData } from '../shared_interfaces'


function useFirebase() {
 
    const [ loading, setLoading ] = useState(false);
    const [ firebaseError, setFirebasError ] = useState<string | null>();

    const db = getFirestore();
    const bookRef = collection(db, "books");

    const navigate = useNavigate();


    function addNewBook( { title, authors, ownerName, ownerId, borrower, date }:newBookData) {
      setLoading(true);
      addDoc(bookRef, {
        title,
        authors,
        ownerName,
        ownerId,
        borrower,
        date: date
      })
      .then(() => {
        setLoading(false);
        navigate("/my-library");
      }).catch((err) => setFirebasError(err))
    }

    function deleteBook( bookId:string) {
        setLoading(true);
        const deletedBookRef = doc(db, 'books', bookId);
        deleteDoc(deletedBookRef)
        .then(()=> {
          setLoading(false)
        }).catch((err) => setFirebasError(err))
    }

    function editBookData({ title, authors, borrower, date, id }:editedBookData) {
      setLoading(true);
      const editedBookRef = doc(db, "books", id!);
      updateDoc(editedBookRef, {
        title,
        authors,
        borrower,
        date
      })
      .then(() => {
        setLoading(false);
        navigate("/my-library");
      }).catch((err) => setFirebasError(err)) 
    }



    return { addNewBook, deleteBook, editBookData, firebaseError, loading, db };
}

export default useFirebase;