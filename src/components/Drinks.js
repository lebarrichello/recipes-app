import React from 'react';
import PropTypes from 'prop-types';

function Drinks(props) {
  const { name, image, index } = props;
  return (
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
        width="200px"
      />
    </div>
  );
}
Drinks.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default Drinks;
