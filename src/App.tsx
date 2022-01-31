import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './navigation/NavBar';
import Welcome from './welcome-page/pages/Welcome';
import Auth from './user/pages/Auth';
import MyLibrary from './books/pages/MyLibrary';
import SearchForBooks from './books/pages/SearchForBooks';
import BorrowedBooks from './books/pages/BorrowedBooks';
import AddNewBook from './books/pages/AddNewBook';
import EditBookData from './books/pages/EditBookData';
import BorrowBook from './books/pages/BorrowBook';
import Footer from './navigation/Footer';

import './App.scss'

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
      My App:
      Routes:
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/my-library" element={<MyLibrary />}/>
        <Route path="/search-for-books" element={<SearchForBooks />}/>
        <Route path="/borrowed-books" element={<BorrowedBooks/>}/>
        <Route path="/add-new-book" element={<AddNewBook />}/>
        <Route path="/edit-book-data" element={<EditBookData />}/>
        <Route path="/borrow-book" element={<BorrowBook />}/>
      </Routes>
      </header>
      <Footer />
    </div>
  );
}

export default App;
