import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { useState, useEffect } from 'react';
import { onClickFavoriteBtn } from '../services/onClickFuntions';
import getStatusRecipe from '../services/getStatusRecipe';

function ShareAndFavoriteBtn({ id, recipe, type, link }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [statusRecipe, setStatusRecipe] = useState({
    progress: 'NoProgress',
    isFavorite: false,
  });

  useEffect(() => {
    setStatusRecipe(getStatusRecipe(id));
  }, [id]);
  return (
    <div>
      <button
        className="fav-recipe-card__share-button Share"
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          clipboardCopy(link);
          setLinkCopied(true);
        } }
      >
        Share
      </button>
      <button
        className="fav-recipe-card__share-button Like"
        type="button"
        data-testid="favorite-btn"
        onClick={ () => setStatusRecipe({
          ...statusRecipe,
          isFavorite: onClickFavoriteBtn(id, recipe, type),
        }) }
        src={ statusRecipe.isFavorite
          ? '../images/blackHeartIcon.svg'
          : '../images/whiteHeartIcon.svg' }
      >
        Like
      </button>
      {linkCopied && <p>Link copied!</p>}
    </div>
  );
}

ShareAndFavoriteBtn.propTypes = {
  id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    category: PropTypes.string,
    img: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
      measure: PropTypes.string,
      ingredient: PropTypes.string,
    })),
    instructions: PropTypes.string,
    name: PropTypes.string,
    youtube: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default ShareAndFavoriteBtn;
