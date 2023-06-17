import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchProducts } from '../services/fetchProducts';
import AppContext from '../context/AppContext';
import '../styles/SearchBar.css';

const FIRSTLETTER = 'first-letter';
const TWELVE = 12;

function SearchBar({ type }) {
  const [typeSearch, setTypeSearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const { setRecipes } = useContext(AppContext);
  const history = useHistory();

  const handlefoodOrDrink = () => {
    if (typeSearch === '') {
      global.alert('Please select one of the types');
      return;
    }
    if (inputSearch === '') {
      global.alert('Please write on the box an ingredient, a name or a first letter');
      return;
    }
    if (type === 'meals') {
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
    if (type === 'drinks') {
      if (typeSearch === 'ingredient') {
        return ('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=');
      }
      if (typeSearch === 'name') {
        return ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      }
      return ('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=');
    }
  };

  const handleClick = async () => {
    const searchURL = handlefoodOrDrink();
    if (typeSearch === '' || inputSearch === '') {
      return;
    }
    if (typeSearch === FIRSTLETTER && inputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const apiRequest = `${searchURL}${inputSearch}`;
    try {
      const response = await fetchProducts(apiRequest);
      if (response[type] && response[type].length === 1) {
        if (type === 'meals') {
          history.push(`/meals/${response[type][0].idMeal}`);
        } else {
          history.push(`/drinks/${response[type][0].idDrink}`);
        }
      }
      /* if (response[type] === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      } */
      setRecipes(response[type].splice(0, TWELVE));
    } catch (error) {
      global.alert(error.message);
    }
  };

  return (
    <div className="container__search-bar">
      <span>What you want to cook today ?</span>
      <div className="search-bar__form">
        <input
          id="search-input"
          type="text"
          placeholder="Search..."
          data-testid="search-input"
          onChange={ (e) => setInputSearch(e.target.value) }
          name={ inputSearch }
          value={ inputSearch }
        />

        <button
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
      <div className="container__radio-buttons">
        <label className="filter-radio">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            onChange={ (e) => setTypeSearch(e.target.value) }
            checked={ typeSearch === 'ingredient' }
            value="ingredient"
          />
          Ingredient
          <span className="radiomark" />
        </label>
        <label className="filter-radio">
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name-search-radio"
            onChange={ (e) => setTypeSearch(e.target.value) }
            checked={ typeSearch === 'name' }
            value="name"
          />
          Name
          <span className="radiomark" />
        </label>
        <label className="filter-radio">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            onChange={ (e) => setTypeSearch(e.target.value) }
            checked={ typeSearch === 'first-letter' }
            value="first-letter"
          />
          First letter
          <span className="radiomark" />
        </label>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBar;
