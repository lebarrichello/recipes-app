import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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

  return (
    <div
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
    </div>
  );
}

Recomendations.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Recomendations;
