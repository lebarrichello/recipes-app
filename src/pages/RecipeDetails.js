import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeDetailsFood from '../Components/RecipeDetailsFood';
import RecipeDetailsDrinks from '../Components/RecipeDetailsDrinks';

function RecipeDetails() {
  const history = useHistory();
  const [typeRecipe, setTypeRecipe] = useState('');
  // idFood = 52977
  // idDrink = 15997

  useEffect(() => {
    const getRecipe = async () => {
      const { pathname } = history.location;
      if (pathname.includes('/meals')) {
        setTypeRecipe('Food');
      } else {
        setTypeRecipe('Drink');
      }
    };
    getRecipe();
  }, [history]);
  return typeRecipe === 'Food'
    ? (<RecipeDetailsFood />)
    : (<RecipeDetailsDrinks />);
}

export default RecipeDetails;
