import React from 'react';
import { Link } from 'react-router-dom';

const appFooter = () => (
  <div
    style={ {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: 'spacelaround',
      alignItems: 'center',
    } }
    data-testid="footer"
  >
    <div>
      <Link to="/comidas" data-testid="meals-bottom-btn">
        <img src="src/images/mealIcon.svg" alt="Comidas" />

      </Link>
      <Link to="/Bebidas" data-testid="drinks-bottom-btn">
        <img src="src/images/drinkIcon.svg" alt="Bebidas" />
      </Link>
    </div>

  </div>
);
export default appFooter;
