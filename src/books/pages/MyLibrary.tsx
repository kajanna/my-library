import React from 'react';

import { Book } from '../../shared/shared_interfaces';
import AddBookLink from '../components/AddBookLink';
import BookItemList from '../components/BookItemList'

function MyLibrary() {
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
            <AddBookLink />
            <BookItemList items={dummybooklist}/>
        </div>
    );
}

export default MyLibrary;