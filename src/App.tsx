import React, { useContext } from 'react';
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
import AuthContext from './shared/contexts/authContext';

import './App.scss'

function App() {
  const auth = useContext(AuthContext);

  let routes;
  if (auth) {
    routes = (
      <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/my-library" element={<MyLibrary />} />
          <Route path="/add-new-book" element={<AddNewBook />} />
          <Route path="/edit-book-data/:bookId" element={<EditBookData />} />
          <Route path="/lend-book/:bookId" element={<LentBook />} />
          <Route path="/borrow-book" element={<BorrowBook />} />
        </Routes>
    )
  } else {
    routes = (
      <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
    )
  }

  return (
    <div>
      <NavBar />
      <div className="app__main">
        {routes}
      </div>
     <div className="app__footer"></div>
      <Footer />
    </div>
  );
}

export default App;
