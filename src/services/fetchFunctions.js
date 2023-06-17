import { extractIngredientsFunction } from './extractIngredientsFunction';

export async function getFoodRecipeWithId(id) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const result = await fetch(URL);
  const { meals } = await result.json();
  return (meals[0]) && {
    id: meals[0].idMeal,
    name: meals[0].strMeal,
    img: meals[0].strMealThumb,
    category: meals[0].strCategory,
    ingredients: extractIngredientsFunction(meals[0]),
    instructions: meals[0].strInstructions,
    youtube: meals[0].strYoutube,
    nationality: meals[0].strArea || '',
    tags: (typeof meals[0].strTags === 'string'
      ? meals[0].strTags.split(',') : meals[0].strTags) || [],
  };
}

export async function getDrinkRecipeWithId(id) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const result = await fetch(URL);
  const { drinks } = await result.json();
  return (drinks[0]) && {
    id: drinks[0].idDrink,
    name: drinks[0].strDrink,
    img: drinks[0].strDrinkThumb,
    category: drinks[0].strCategory,
    alcoholic: drinks[0].strAlcoholic,
    ingredients: extractIngredientsFunction(drinks[0]),
    instructions: drinks[0].strInstructions,
    youtube: drinks[0].strYoutube,
    nationality: drinks[0].strArea || '',
    tags: drinks[0].strTags || [],
  };
}

export async function getFoodsRecomendations() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const result = await fetch(URL);
  const { meals } = await result.json();
  const recomendations = meals.reduce((acc, { strMealThumb, strMeal }) => {
    const recipe = {
      name: strMeal,
      img: strMealThumb,
    };
    return [...acc, recipe];
  }, []);
  return recomendations;
}

export async function getDrinksRecomendations() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const result = await fetch(URL);
  const { drinks } = await result.json();
  const recomendations = drinks.reduce((acc, { strDrinkThumb, strDrink }) => {
    const recipe = {
      name: strDrink,
      img: strDrinkThumb,
    };
    return [...acc, recipe];
  }, []);
  return recomendations;
}
