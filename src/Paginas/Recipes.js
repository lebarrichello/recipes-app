import React, { useEffect, useState } from 'react';
import Meals from './Meals';
import Drinks from './Drinks';

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const path = window.location.pathname;
  const foodPath = path === '/meals';
  const API_FOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const API_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const NUMBER = 11;

  useEffect(() => {
    if (foodPath) {
      fetch(API_FOOD)
        .then((response) => response.json())
        .then(({ food }) => {
          const recipesData = food.slice(0, NUMBER);
          setRecipes(recipesData);
        });
    } else {
      fetch(API_DRINK)
        .then((response) => response.json())
        .then(({ drinks }) => {
          const recipesData = drinks.slice(0, NUMBER);
          setRecipes(recipesData);
        });
    }
  }, [foodPath]);
  return (
    <main>
      { foodPath ? recipes.map((recipe, i) => (
        <Meals
          key={ recipe.strMeal }
          name={ recipe.strMeal }
          imgSrc={ recipe.strMealThumb }
          SrcIndex={ i }
        />
      )) : recipes.map((recipe, i) => (
        <Drinks
          key={ recipe.strDrink }
          name={ recipe.strDrink }
          imgSrc={ recipe.strDrinkThumb }
          SrcIndex={ i }
        />
      ))}
    </main>
  );
}
export default Recipe;
