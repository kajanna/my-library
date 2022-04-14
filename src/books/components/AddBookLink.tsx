import { Link } from 'react-router-dom'

import Card from '../../shared/Card';
import Button from '../../shared/Button';

const AddBookLink = () => {
  return (
    <Card title="Add a book" addContentPadding={true}>
      <Link to="/add-new-book">
        <Button buttonText="Add" />
      </Link>
    </Card>
  );
}

export default AddBookLink;