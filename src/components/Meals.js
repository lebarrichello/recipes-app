import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Meals(props) {
  const { name, image, index, idRecipe } = props;
  return (
    <Link className="recipe-card" to={ `/meals/${idRecipe}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <h3
          data-testid={ `${index}-card-name` }
        >
          { name }
        </h3>
        <img
          alt={ name }
          src={ image }
          data-testid={ `${index}-card-img` }
          width="100%"
        />
      </div>
    </Link>

  );
}

Meals.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
  idRecipe: PropTypes.number,
}.isRequired;

export default Meals;
