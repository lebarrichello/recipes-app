import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Recipes.css';

function Recipes() {
  const { recipes, setRecipes } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const API_FOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const API_FOOD_CATEG = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const API_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const API_DRINK_CATEG = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const TWELVE = 12;
  const CATEGORIAS = 5;

  const fetchRecipes = useCallback(async () => {
    if (location.pathname === '/meals') {
      const response = await fetch(API_FOOD);
      const foodData = await response.json();
      setRecipes(foodData.meals.splice(0, TWELVE));

      fetch(API_FOOD_CATEG)
        .then((resp) => resp.json())
        .then(({ meals }) => {
          const maxCateg = meals.map((item) => item.strCategory).slice(0, CATEGORIAS);
          setCategories(maxCateg);
        });
    } else {
      const response = await fetch(API_DRINK);
      const drinkData = await response.json();
      setRecipes(drinkData.drinks.splice(0, TWELVE));

      fetch(API_DRINK_CATEG)
        .then((resp) => resp.json())
        .then(({ drinks }) => {
          const maxCateg = drinks.map((item) => item.strCategory).slice(0, CATEGORIAS);
          setCategories(maxCateg);
        });
    }
  }, [location, setRecipes]);
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleCategoryClick = async (categ) => {
    const API_FILTER_FOOD = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`;
    const API_FILTER_DRINK = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categ}`;
    if (location.pathname === '/meals') {
      const response = await fetch(API_FILTER_FOOD);
      const foodData = await response.json();
      setRecipes(foodData.meals.splice(0, TWELVE));
    } else {
      const response = await fetch(API_FILTER_DRINK);
      const drinkData = await response.json();
      setRecipes(drinkData.drinks.splice(0, TWELVE));
    }
  };

  return (
    <div>
      <Header />
      <div className="container__filter-buttons">
        <button
          className="filter-btn active"
          data-testid="All-category-filter"
          onClick={ () => {
            fetchRecipes();
            setCategories([]);
          } }
        >
          All
        </button>
        {categories.map((categoryName, i) => (
          <button
            className="filter-btn"
            key={ i }
            data-testid={ `${categoryName}-category-filter` }
            onClick={ () => handleCategoryClick(categoryName) }
          >
            {categoryName}
          </button>
        ))}
      </div>
      <div className="container__recipe-cards">
        <span>
          { location.pathname === '/meals' ? recipes.map((recipe, i) => (
            <Meals
              key={ recipe.strMeal }
              name={ recipe.strMeal }
              image={ recipe.strMealThumb }
              index={ i }
              idRecipe={ recipe.idMeal }
            />
          )) : recipes.map((recipe, i) => (
            <Drinks
              key={ recipe.strDrink }
              name={ recipe.strDrink }
              image={ recipe.strDrinkThumb }
              index={ i }
              idRecipe={ recipe.idDrink }
            />
          ))}
        </span>
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
