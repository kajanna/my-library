import React from 'react';

import Card from '../../shared/Card';
import Button from '../../shared/Button';

function AddBookLink() {
    return (
        <Card title="Add a book" addContentPadding={true}>
            <Button buttonText="Add" onClick={() => console.log("hej!")}/>
        </Card>
    );
}

export default AddBookLink;