import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './navigation/NavBar';
import Welcome from './welcome-page/pages/Welcome';
import Auth from './user/pages/Auth';
import MyLibrary from './books/pages/MyLibrary';
import AddNewBook from './books/pages/AddNewBook';
import EditBookData from './books/pages/EditBookData';
import LentBook from './books/pages/LentBook';
import BorrowBook from './books/pages/BorrowBook';
import Footer from './navigation/Footer';


import './App.scss'

function App() {

  return (
    <div>
      <NavBar />
      <div className="app__main">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/my-library" element={<MyLibrary />} />
          <Route path="/add-new-book" element={<AddNewBook />} />
          <Route path="/edit-book-data" element={<EditBookData />} />
          <Route path="/lend-book" element={<LentBook />} />
          <Route path="/borrow-book" element={<BorrowBook />} />
        </Routes>
      </div>
     <div className="app__footer"></div>
      <Footer />
    </div>
  );
}

export default App;
