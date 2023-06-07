import { useHistory } from 'react-router-dom';
import RecipeDetailsFood from '../Components/RecipeDetailsFood';
import RecipeDetailsDrink from '../Components/RecipeDetailsDrink';

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
