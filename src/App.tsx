import React, { useContext, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './navigation/NavBar';
import LoadingSpinner from './shared/LoadingSpinner';
import Footer from './navigation/Footer';
import AuthContext from './shared/contexts/authContext';

import './App.scss'

function App() {
  const auth = useContext(AuthContext);

  const MyLibrary = React.lazy(() => import('./books/pages/MyLibrary'));
  const AddNewBook = React.lazy(() => import('./books/pages/AddNewBook'));
  const EditBookData  = React.lazy(() => import('./books/pages/EditBookData'));
  const LentBook = React.lazy(() => import('./books/pages/LentBook'));
  const BorrowBook = React.lazy(() => import('./books/pages/BorrowBook'));
  const Welcome = React.lazy(() => import('./welcome-page/pages/Welcome'));
  const Auth  = React.lazy(() => import('./user/pages/Auth'));
  const PageNotFound  = React.lazy(() => import('./navigation/PageNotFound'));

  let routes;
  if (auth) {
    routes = (
      <Routes>
          <Route path="/my-library" element={<MyLibrary />} />
          <Route path="/add-new-book" element={<AddNewBook />} />
          <Route path="/edit-book-data/:bookId" element={<EditBookData />} />
          <Route path="/lend-book/:bookId" element={<LentBook />} />
          <Route path="/borrow-book" element={<BorrowBook />} />
          <Route path="/" element={<Welcome />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
  } else {
    routes = (
      <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
  }

  return (
    <div>
      <NavBar />
      <div className="app__main">
      <Suspense fallback={<LoadingSpinner />}>
        {routes}
      </Suspense>
      </div>
     <div className="app__footer"></div>
      <Footer />
    </div>
  );
}

export default App;
