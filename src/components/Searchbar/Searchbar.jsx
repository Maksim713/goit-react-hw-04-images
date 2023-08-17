import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleNameChange = e => {
    setSearch(e.currentTarget.value.toLowerCase());
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(e.target.elements['search'].value.toLowerCase().trim());
    reset();
  };

  const reset = () => {
    setSearch('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleFormSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          name="search"
          value={search}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
