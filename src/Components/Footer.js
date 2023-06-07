import React from 'react';
import { Link } from 'react-router-dom';
// import drinkIcon from '../images/drinkIcon.svg';
// import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <>
      <div>Footer </div>
      <footer
        data-testid="footer"
        style={ { position: 'fixed', bottom: 0 } }
      >
        <div>

          <Link to="/meals" data-testid="meals-bottom-btn">
            <img src="./images/mealIcon.svg" alt="Meals" />
          </Link>
          <Link to="/drinks" data-testid="drinks-bottom-btn">
            <img src="./images/drinkIcon.svg" alt="Drinks" />
          </Link>

        </div>
      </footer>

    </>
  );
}

export default Footer;
