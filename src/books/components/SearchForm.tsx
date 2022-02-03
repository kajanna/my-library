import React from 'react';

import Card from '../../shared/Card';
import { ReactComponent as SearchReversedIcon } from '../../assets/search_reversed_icon.svg';
import InputElement from '../../shared/Form/InputElement';
import Button from '../../shared/Button';

import './SearchForm.scss'

function SearchForm() {
  const searchButtonContent = (
    <div className='search-form-button'>
      <div className='search-form-button__icon'>
        <SearchReversedIcon />
      </div>
      <div>
          Search
      </div>
    </div>
  );
  return (
    <Card title="search" addContentPadding>
      <InputElement label="search for the books" />
      <Button
        buttonText={searchButtonContent}
        onClick={() => console.log("search")}
      />
    </Card>
  );
}

export default SearchForm;