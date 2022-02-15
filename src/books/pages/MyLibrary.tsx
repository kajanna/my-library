import React from 'react';

import { Book } from '../../shared/shared_interfaces';
import { ReactComponent as VisibleIcon } from '../../assets/visible_icon.svg'
import AddBookLink from '../components/AddBookLink';
import BookItemList from '../components/BookItemList';
import Button from '../../shared/Button';
import AppearAnimation from '../../shared/AppearAnimation';

import './MyLibrary.scss';

function MyLibrary() {
    const dummybooklist= [
        {
            id:"sg ersger111sh ",
            title: "Lord of the Rings",
            authors: "J.R.R. Tolkien",
            date: "23.06.2022",
            cover: "sss",
            ownerName: "Dominik",
            ownerId: "sg ersgersh ",
            borrower: "Dawid"
        },
        {
          id:"sg e22rsgersh ",
          title: "Lord of the Rings",
          authors: "J.R.R. Tolkien",
          date: "23.06.2022",
          cover: "sss",
          ownerName: "Dominik",
          ownerId: "sg ersgersh ",
          borrower: "Dawid"
      },
      {
        id:"sg ersg444ersh ",
        title: "Lord of the Rings",
        authors: "J.R.R. Tolkien",
        date: "23.06.2022",
        cover: "sss",
        ownerName: "Dominik",
        ownerId: "sg ersgersh ",
        borrower: "Dawid"
    },
    {
      id:"sg ersgeddd5rsh ",
      title: "Lord of the Rings",
      authors: "J.R.R. Tolkien",
      date: "23.06.2022",
      cover: "sss",
      ownerName: "Dominik",
      ownerId: "sg ersgersh ",
      borrower: "Dawid"
  },
  {
    id:"sg ersgsgsggggggersh ",
    title: "Lord of the Rings",
    authors: "J.R.R. Tolkien",
    date: "23.06.2022",
    cover: "sss",
    ownerName: "Dominik",
    ownerId: "sg ersgersh ",
    borrower: "Dawid"
},
{
  id:"sg ersgsgdsgersh ",
  title: "Lord of the Rings",
  authors: "J.R.R. Tolkien",
  date: "23.06.2022",
  cover: "sss",
  ownerName: "Dominik",
  ownerId: "sg ersgersh ",
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
      <AppearAnimation>
          <div className="my-library__main">
            <AddBookLink />
            <div>
              <div className="my-library__buttons">
            <Button
              buttonText={buttonContent("all books")}
              onClick={() => console.log("show all books")}
            />
            <Button
              buttonText={buttonContent("lent books")}
              onClick={() => console.log("show Lent books")}
            />
            <Button
              buttonText={buttonContent("borrowed books")}
              onClick={() => console.log("show Borrowed books")}
            />
            </div>
            </div>
          </div>
            <BookItemList items={dummybooklist} />
      </AppearAnimation>
    );
}

export default MyLibrary;