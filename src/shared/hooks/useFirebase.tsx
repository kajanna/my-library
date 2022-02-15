import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
    getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc,
    query, where
  } from 'firebase/firestore';

  import { Book } from '../shared_interfaces'

function useFirebase() {

    const [ books, setBooks ] = useState<Book[] | null>();
    const [ loading, setLoading ] = useState(false);
    const [ firebaseError, setFirebasError ] = useState<string | null>();

    const navigate = useNavigate();
    const db = getFirestore();
    const bookRef = collection(db, "books");

    async function getUserBooks(userId: string) {
        const q = query(bookRef, where("ownerId", "==", userId));
        setLoading(true);
      //getcollection data
      getDocs(q)
        .then((snapshot) => {
          
        })
        .catch((err) => {
          setFirebasError(err);
          setLoading(false);
        });
    }
    onSnapshot(bookRef, (snapshot)=> {
          //doc.data();
          setLoading(false);
        //the same 
    })

    async function addNewBook( { title, authors, ownerName, ownerId, borrower, date }:Book) {
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
      }) 
    }

    async function DeleteBook( bookId:string) {
        const deletedBookRef = doc(db, 'books', bookId);
        deleteDoc(deletedBookRef)
        .then(()=> {
            console.log(deletedBookRef)
        })
    }

    async function EditBookData() {
        
    }



    return { getUserBooks, addNewBook, DeleteBook, firebaseError, loading, books};
}

export default useFirebase;