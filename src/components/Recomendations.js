import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getDrinksRecomendations,
  getFoodsRecomendations } from '../services/fetchFunctions';
import styles from '../styles/RecipeDetails.module.css';

function Recomendations({ type, id }) {
  const [recomendations, setRecomendations] = useState([]);

  useEffect(() => {
    async function getRecomendations() {
      if (type === 'meal') {
        const drinksRecomendations = await getDrinksRecomendations(id);
        setRecomendations(drinksRecomendations);
      } else {
        const foodsRecomendations = await getFoodsRecomendations(id);
        setRecomendations(foodsRecomendations);
      }
    }
    getRecomendations();
  }, [id, type]);

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: window.matchMedia('(min-width: 768px)').matches
      ? noOfSlidesOnDesktop : 2,
    slidesToScroll: 2,
    arrows: false,
  };

  return (
    <Slider
      { ...settings }
      className={ styles.divRecomendations }
    >
      {recomendations.map(({ img, name }, index) => {
        const numberMinRecipes = 6;
        if (index < numberMinRecipes) {
          return (
            <div
              key={ index }
              className={ styles.divRecipe }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ img }
                alt="Recommended Recipe Preview"
                className={ styles.imgRecipeRecomendation }
              />
              <h4
                className="recommendation-title"
                data-testid={ `${index}-recommendation-title` }
              >
                {name}
              </h4>
            </div>
          );
        }
        return null;
      })}
    </Slider>
  );
}

Recomendations.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Recomendations;
