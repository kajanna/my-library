import { useState } from "react";

import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, query, where, getDocs,
  getDoc, serverTimestamp, QuerySnapshot, DocumentData, QueryDocumentSnapshot, orderBy,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject,
} from "firebase/storage";

import { EditedBookData, Book, BookFormFormikValues } from "../shared_interfaces";

function useFirebase() {

  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebasError] = useState<string | null>();

  const db = getFirestore();
  const bookRef = collection(db, "books");
  const storage = getStorage();

  //util function for - getUserBooksById
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
        coverUrl: doc.data().coverUrl,
        coverRef: doc.data().coverRef,
        ownerId: doc.data().ownerId,
        ownerName: doc.data().ownerName,
        borrowerName: doc.data().borrowerName,
        borrowerId: doc.data().borrowerId,
      });
    });
    return loadedBooks;
  }
  //upload files to storage
  async function fileUpload(file: any) {
    const coverRef = ref(storage, `books/${file.name}`);
    let snapshot;
    let coverUrl;
    try {
      snapshot = await uploadBytes(coverRef, file);
    } catch (error) {
      setLoading(false);
      setFirebasError("No picture");
    }
    if (snapshot) {
      try {
        coverUrl = await getDownloadURL(coverRef);
      } catch (error) {
        setLoading(false);
        setFirebasError("No picture");
      }
    }
    coverUrl = await getDownloadURL(coverRef);
    return { coverUrl, coverRef };
  }

  async function getUserBooksById(id: string) {
    setLoading(true);
    const lentBooksQuery = query(
      collection(db, "books"),
      where("ownerId", "==", id),
      orderBy("date", "desc")
    );
    const borrowedBooksQuery = query(
      collection(db, "books"),
      where("borrowerId", "==", id)
    );
    try {
      const lentBooksSnapshot = await getDocs(lentBooksQuery);
      const borrowedBooksSnapshot = await getDocs(borrowedBooksQuery);
      const lentBooks = setUserBooksData(lentBooksSnapshot);
      const borrowedBooks = setUserBooksData(borrowedBooksSnapshot);
      const loadedBooks = [...lentBooks, ...borrowedBooks];
      setLoading(false);
      return loadedBooks;
    } catch (error) {
      setLoading(false);
      setFirebasError("We couldn't find your books");
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
          coverUrl: docSnap.data().coverUrl,
        };
        setLoading(false);
        return book;
      } else {
        setLoading(false);
        setFirebasError("We couldn't find your book");
      }
    } catch (error) {
      setLoading(false);
      setFirebasError("We couldn't find your book");
    }
  }

  async function addNewBook({ title, authors, ownerName, ownerId, borrowerName, borrowerId, coverFile}
    : Book) {
    setLoading(true);
    let bookCover;
    if (coverFile) {
      try {
        bookCover = await fileUpload(coverFile);
      } catch {}
    }
    const newBook = {
      title,
      authors,
      ownerName,
      ownerId,
      borrowerName: borrowerName ? borrowerName : "",
      borrowerId: borrowerId ? borrowerId : "",
      coverUrl: bookCover ? bookCover.coverUrl : "",
      coverRef: bookCover ? bookCover.coverRef.toString() : "",
      date: serverTimestamp(),
    };
    try {
      const addNewBook = await addDoc(bookRef, newBook);
      if (addNewBook) {
        setLoading(false);
      }
    } catch (error) {
      setFirebasError("Something went wrong. Please try again");
      setLoading(false);
    }
  }

  async function deleteBook(bookId: string, coverRef?: string) {
    setLoading(true);
    if (coverRef) {
      const deletedCoverRef = ref(storage, coverRef)
      try {
        await deleteObject(deletedCoverRef);
      } catch(error) {
        setFirebasError("We couldn't delete your book");
        setLoading(false);
      }
    }
    const deletedBookRef = doc(db, "books", bookId);
    try {
      await deleteDoc(deletedBookRef);
      setLoading(false);
      return bookId;
    } catch (error) {
      setFirebasError("We couldn't delete your book");
      setLoading(false);
    }
  }

  async function editBookData({
    title,
    authors,
    borrowerName,
    id,
    coverFile,
  }: EditedBookData) {
    setLoading(true);
    let bookCover;
    if (coverFile) {
      try {
        bookCover = await fileUpload(coverFile);
      } catch {}
    }
    const editedBookRef = doc(db, "books", id!);
    let editedBook: {
      title? : string;
      authors? : string;
      borrowerName? : string;
      coverUrl? : string;
      coverRef? : string
    } = {};
    if (title) {
      editedBook.title = title
    }

    if (authors) {

      editedBook.authors = authors
    }
    if (borrowerName) {

      editedBook.borrowerName = borrowerName
    }
    if (bookCover) {

      editedBook.coverUrl = bookCover.coverUrl;
      editedBook.coverRef = bookCover.coverRef.toString()
    }
 
    try {
      await updateDoc(editedBookRef, editedBook);
      setLoading(false);
    } catch (error) {
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
