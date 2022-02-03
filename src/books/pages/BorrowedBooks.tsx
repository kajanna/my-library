import React from 'react';

import BookItemList from '../components/BookItemList';

function BorrowedBooks() {
    const dummybooklist= [
        {
            id:"sg ersgersh ",
            title: "Lord of the Rings",
            author: "J.R.R. Tolkien",
            description: "The Lord of the Rings is an epic high fantasy novel written by J.R.R. Tolkien, which was later fitted as a trilogy. ",
            cover: "sss",
            owner: "Dominik",
            borrower: "Dawid"
        },
    ];
    return (
        <div>
            <BookItemList items={dummybooklist}/>
        </div>
    );
}

export default BorrowedBooks;