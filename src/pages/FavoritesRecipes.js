import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { ReactComponent as ShareIcon } from '../images/shareIcon.svg';
import { ReactComponent as BlackHeartIcon } from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const { favoriteRecipes } = useContext(AppContext);

  return (
    <div>
      {favoriteRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.nationality} - ${recipe.category}`}
          </p>
          <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <ShareIcon />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <BlackHeartIcon />
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    </div>
  );
}

export default FavoriteRecipes;
