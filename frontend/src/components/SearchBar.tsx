import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function SearchBar() {
  const [query, setQuery] = React.useState('');
  return (
    <div>
      <FontAwesomeIcon
        icon={faSearch}
        className="fas fa-search absolute mt-2 ml-5 text-sm text-light"
      />
      <input
        className="pl-12 rounded-full w-full p-2 bg-lighter text-sm mb-4"
        placeholder="Search Tweet"
        value={query}
        onInput={(e: any) => setQuery(e.target.value)}
        // Submit when enter key is pressed
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') {
            console.log('Enter key pressed');
          }
        }}
      />
    </div>
  );
}

export default SearchBar;
