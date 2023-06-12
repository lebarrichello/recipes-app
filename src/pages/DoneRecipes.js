import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const getDones = JSON.parse(localStorage.getItem('doneRecipes', []));
    setDoneRecipes(getDones);
  }, []);

  const handleBtnShare = (type, id) => {
    setLinkCopied(true);
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
  };

  return (
    <div>
      <div className="container__done-recipe-header">
        <Header />
      </div>

      <div className="container__filter-buttons">
        <button
          className="filter-buttons__drinks"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilter('drinks') }
        >
          Drinks
        </button>

        <button
          className="filter-buttons__meals"
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => setFilter('meals') }
        >
          Meals
        </button>

        <button
          className="filter-buttons__all"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
      </div>

      <div className="container__done-recipes-cards">
        {
          doneRecipes.filter((element) => {
            switch (filter) {
            case 'meals': return element.type === 'meal';
            case 'drinks': return element.type === 'drink';
            default: return element;
            }
          })
            .map((r, index) => (
              <div
                className="done-recipe-card"
                key={ index }
              >
                <Link to={ `/${r.type}s/${r.id}` }>
                  <img
                    className="done-recipe-card__image"
                    alt={ r.id }
                    src={ r.image }
                    width="200px"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>

                <Link to={ `/${r.type}s/${r.id}` }>
                  <div
                    className="done-recipe-card__name-link"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {r.name}
                  </div>
                </Link>

                {
                  r.type === 'meal' ? (
                    <p
                      className="done-recipe-card__nationality-category"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${r.nationality} - ${r.category}`}
                    </p>)
                    : (
                      <p
                        className="done-recipe-card__alcoholic-or-Not"
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

                {
                  linkCopied && <p data-testid="copied-msg">Link copied!</p>
                }
                <div>
                  {
                    r.tags.map((tag) => (
                      <div
                        className="done-recipe-card__tags"
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                        key={ tag }
                      >
                        #
                        {tag}
                      </div>
                    ))
                  }
                </div>
                <button
                  className="done-recipe-card__share-button"
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
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default DoneRecipes;
