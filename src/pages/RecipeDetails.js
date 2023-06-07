import { useHistory } from 'react-router-dom';
import RecipeDetailsFood from './RecipeDetailsFood';
import RecipeDetailsDrink from './RecipeDetailsDrink';

function RecipeDetails() {
  const history = useHistory();

  const { pathname } = history.location;
  if (pathname.includes('/meals')) {
    return (<RecipeDetailsFood />);
  }
  return (<RecipeDetailsDrink />);

  // idFood = 52977
  // idDrink = 15997
}

export default RecipeDetails;
