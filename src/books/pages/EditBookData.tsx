import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getDoc, doc,
    
  } from 'firebase/firestore';

import BookForm from '../components/BookForm';
import { BookFormFormikValues } from '../../shared/shared_interfaces';
import useFirebase from '../../shared/hooks/useFirebase';

import AppearAnimation from '../../shared/AppearAnimation';


function EditBookData() {
    const [ formValues, setFormValues ] = useState<BookFormFormikValues>({
        title: "",
        authors: "",
        borrower:""
    });
    const { bookId } = useParams<string>();
    const { db } = useFirebase();
    
    async function getEditedBook(id:string) {
        const bookRef = doc(db, "books", id);
        getDoc(bookRef).then((docSnap) => {
        if (docSnap.exists()) {
            setFormValues({
                title: docSnap.data().title,
                authors: docSnap.data().authors,
                borrower: docSnap.data().borrower,
            });
    }
})
    };
    
    useEffect(()=>{
        if (bookId) {
        getEditedBook(bookId);
        }
    },[]);

    return (
        <>{console.log(formValues)}
        <AppearAnimation>
            <BookForm title="Edit book data" initialValues={formValues} bookId={bookId}/>
        </AppearAnimation>
        </>
    );
}

export default EditBookData;