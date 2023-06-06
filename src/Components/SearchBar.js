import { useState } from 'react';

const FIRSTLETTER = 'first-letter';

function SearchBar(foodOrDrink) {
  const [typeSearch, setTypeSearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');

  const handlefoodOrDrink = () => {
    foodOrDrink = 'food';
    if (typeSearch === '') {
      global.alert('Please select one of the types');
      return;
    }
    if (inputSearch === '') {
      global.alert('Please write on the box an ingredient, a name or a first letter');
      return;
    }
    if (foodOrDrink === 'food') {
      if (typeSearch === 'ingredient') {
        return ('https://www.themealdb.com/api/json/v1/1/filter.php?i=');
      }
      if (typeSearch === 'name') {
        return ('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      }
      if (typeSearch === FIRSTLETTER) {
        return ('https://www.themealdb.com/api/json/v1/1/search.php?f=');
      }
    }
    if (foodOrDrink === 'drink') {
      if (typeSearch === 'ingredient') {
        return ('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=');
      }
      if (typeSearch === 'name') {
        return ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      }
      return ('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=');
    }
  };

  const handleClick = () => {
    const searchURL = handlefoodOrDrink();
    if (typeSearch === '' || inputSearch === '') {
      return;
    }
    if (typeSearch === FIRSTLETTER && inputSearch.length > 1) {
      global.alert('The search with first letter was done with more than 1 letter.');
      return;
    }
    const apiRequest = `${searchURL}${inputSearch}`;
    console.log(apiRequest);
    // fetchData(apiRequest);
    // setProductsList(fetchData)
  };

  return (
    <div className="search-bar">
      <input
        id="search-input"
        type="text"
        placeholder="Search..."
        data-testid="search-input"
        onChange={ (e) => setInputSearch(e.target.value) }
        name={ inputSearch }
        value={ inputSearch }
      />
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          type="radio"
          name="search-radio"
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
          onChange={ (e) => setTypeSearch(e.target.value) }
          checked={ typeSearch === 'ingredient' }
          value="ingredient"
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          type="radio"
          name="search-radio"
          data-testid="name-search-radio"
          id="name-search-radio"
          onChange={ (e) => setTypeSearch(e.target.value) }
          checked={ typeSearch === 'name' }
          value="name"
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First letter
        <input
          type="radio"
          name="search-radio"
          data-testid="first-letter-search-radio"
          id="first-letter-search-radio"
          onChange={ (e) => setTypeSearch(e.target.value) }
          checked={ typeSearch === 'first-letter' }
          value="first-letter"
        />
      </label>
      <button
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
