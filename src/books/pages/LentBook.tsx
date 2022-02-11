import React from 'react';

import LendBookForm from '../components/LendBookForm';
import AppearAnimation from '../../shared/AppearAnimation';

function LentBook() {
    return (
        <AppearAnimation>
            <LendBookForm title="Lord of the Rings" author="J.R.R. Tolkien"/>
        </AppearAnimation>
    );
}

export default LentBook;