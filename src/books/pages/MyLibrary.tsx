import React from 'react';

import { Book } from '../../shared/shared_interfaces';
import { ReactComponent as VisibleIcon } from '../../assets/visible_icon.svg'
import AddBookLink from '../components/AddBookLink';
import BookItemList from '../components/BookItemList';
import Button from '../../shared/Button';


import './MyLibrary.scss';

function MyLibrary() {
    const dummybooklist= [
        {
            id:"sg ersgersh ",
            title: "Lord of the Rings",
            author: "J.R.R. Tolkien",
            date: "23.06.2022",
            cover: "sss",
            owner: "Dominik",
            borrower: "Dawid"
        },
    ];
    const buttonContent = (text :string) => (
      <div className='button-content'>
        <div className='button-content__icon'><VisibleIcon /></div>
        <div>{text}</div>
      </div>
    );
    return (
        <div>
            <AddBookLink />
            <Button buttonText={buttonContent("all books")} onClick={() => console.log("show all books")}/>
            <Button buttonText={buttonContent("lent books")} onClick={() => console.log("show Lent books")}/>
            <Button buttonText={buttonContent("borrowed books")} onClick={() => console.log("show Borrowed books")}/>
            <BookItemList items={dummybooklist}/>
        </div>
    );
}

export default MyLibrary;