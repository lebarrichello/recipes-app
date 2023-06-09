import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ { position: 'fixed', bottom: 0 } }
    >
      <div>

        <Link to="/meals">
          <img
            src={ mealIcon }
            alt="Meals"
            data-testid="meals-bottom-btn"
          />
        </Link>
        <Link to="/drinks">
          <img
            src={ drinkIcon }
            alt="Drinks"
            data-testid="drinks-bottom-btn"
          />
        </Link>

      </div>
    </footer>
  );
}

export default Footer;
