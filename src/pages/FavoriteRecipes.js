import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/FavoriteRecipes.css';

function FavoriteRecipes() {
  const [favRecipes, setFavRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavRecipes(getFavorites);
  }, []);

  const handleBtnShare = (type, id) => {
    setLinkCopied(true);
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
  };

  const handleBtnDesliked = (r) => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newFavorited = favorited.filter((e) => e && e.id !== r.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorited));
    setFavRecipes(newFavorited);
  };

  return (
    <div>
      <div className="container__fav-recipe-header">
        <Header title="Profile" />
      </div>

      <div className="container__filter-buttons">
        <button
          className="filter-btn"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilter('drinks') }
        >
          Drinks
        </button>

        <button
          className="filter-btn"
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => setFilter('meals') }
        >
          Meals
        </button>

        <button
          className="filter-btn"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
      </div>

      <div className="container__fav-recipes-cards">
        {
          favRecipes.filter((element) => {
            switch (filter) {
            case 'meals': return element.type === 'meal';
            case 'drinks': return element.type === 'drink';
            default: return element;
            }
          })
            .map((r, index) => (
              <div
                className="fav-recipe-card"
                key={ index }
              >
                <Link
                  className="fav-recipe-card__img-container"
                  to={ `/${r.type}s/${r.id}` }
                >
                  <img
                    className="fav-recipe-card__image"
                    alt={ r.id }
                    src={ r.image }
                    width="200px"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>

                <div className="fav-recipe-card__content">
                  <Link to={ `/${r.type}s/${r.id}` }>
                    <div
                      className="fav-recipe-card__name-link"
                      data-testid={ `${index}-horizontal-name` }
                    >
                      <h3>{r.name}</h3>
                    </div>
                  </Link>
                  {
                    r.type === 'meal' ? (
                      <p
                        className="fav-recipe-card__nationality-category"
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {`${r.nationality} - ${r.category}`}
                      </p>)
                      : (
                        <p
                          className="fav-recipe-card__alcoholic-or-Not"
                          data-testid={ `${index}-horizontal-top-text` }
                        >
                          {r.alcoholicOrNot}
                        </p>)
                  }
                  <p
                    className="done-recipe-card__done-date"
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {r.doneDate}

                  </p>
                  <div>
                    <button
                      className="fav-recipe-card__share-button"
                      data-testid="share-btn"
                      type="button"
                      onClick={ () => handleBtnShare(r.type, r.id) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        alt="Share Icon"
                        src={ shareIcon }
                      />
                    </button>
                    <button
                      className="fav-recipe-card__share-button"
                      type="button"
                      onClick={ () => handleBtnDesliked(r) }
                    >
                      <img
                        className="heart"
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ blackHeartIcon }
                        alt="Like"
                      />
                    </button>
                  </div>
                  {
                    linkCopied && <p>Link copied!</p>
                  }
                </div>
              </div>
            ))
        }
      </div>

    </div>
  );
}

export default FavoriteRecipes;
