import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes() {
  const { recipes, setRecipes } = useContext(AppContext);
  const location = useLocation();
  const API_FOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const API_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const TWELVE = 12;

  useEffect(() => {
    const fetchRecipes = async () => {
      if (location.pathname === '/meals') {
        const response = await fetch(API_FOOD);
        const foodData = await response.json();
        setRecipes(foodData.meals.splice(0, TWELVE));
      } else {
        const response = await fetch(API_DRINK);
        const drinkData = await response.json();
        setRecipes(drinkData.drinks.splice(0, TWELVE));
      }
    };
    fetchRecipes();
  }, [location, setRecipes]);

  return (
    <div>
      <Header />
      <span>
        { location.pathname === '/meals' ? recipes.map((recipe, i) => (
          <Meals
            key={ recipe.strMeal }
            name={ recipe.strMeal }
            image={ recipe.strMealThumb }
            index={ i }
          />
        )) : recipes.map((recipe, i) => (
          <Drinks
            key={ recipe.strDrink }
            name={ recipe.strDrink }
            image={ recipe.strDrinkThumb }
            index={ i }
          />
        ))}
      </span>
      <Footer />
    </div>
  );
}

export default Recipes;
