import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Typography, Stack } from '@mui/material';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favRecipes, setFavRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes', []));
    setFavRecipes(getFavorites);
  }, []);

  const handleShare = (type, id) => {
    setLinkCopied(true);
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
  };

  const handleDesliked = (r) => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorited = favorited.filter((e) => e.id !== r.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorited));
    setFavRecipes(newFavorited);
  };

  return (
    <div>
      <Header />
      <div className="container__filter-buttons">
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drinks') }
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilter('meals') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
      </div>
      <div className="container__favorites_recipes-cards">
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
                className="card"
                key={ index }
              >
                <Link to={ `/${r.type}s/${r.id}` }>
                  <img
                    className="favorites_recipes__card-image"
                    alt={ r.id }
                    src={ r.image }
                    width="250px"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <Link to={ `/${r.type}s/${r.id}` }>
                  <Typography
                    className="favorites_recipes__name-link"
                    variant="h4"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {r.name}
                  </Typography>
                </Link>
                {
                  r.type === 'meal' ? (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      {`${r.nationality} - ${r.category}`}
                    </p>)
                    : (
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {r.alcoholicOrNot}
                      </p>)
                }
                <p data-testid={ `${index}-horizontal-done-date` }>{r.doneDate}</p>
                <Stack
                  direction="row"
                  spacing={ 2 }
                >
                  <Button
                    variant="contained"
                    type="button"
                    onClick={ () => handleShare(r.type, r.id) }
                    data-testid="share-btn"
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      alt="Share Icon"
                      src={ shareIcon }
                    />
                  </Button>
                  <Button
                    variant="contained"
                    type="button"
                    onClick={ () => handleDesliked(r) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="favorite-link"
                    />
                  </Button>
                </Stack>
                {
                  linkCopied && <p>Link copied!</p>
                }
              </div>
            ))
        }
      </div>

    </div>
  );
}

export default FavoriteRecipes;
