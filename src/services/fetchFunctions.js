export async function getFoodRecipeWithId(id) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const result = await fetch(URL);
  const data = await result.json();
  return data.meals[0];
}

export async function getDrinkRecipeWithId(id) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const result = await fetch(URL);
  const data = await result.json();
  return data.drinks[0];
}

export async function getFoodsRecomendatios() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const result = await fetch(URL);
  const data = await result.json();
  return data.meals;
}

export async function getDrinksRecomendations() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const result = await fetch(URL);
  const data = await result.json();
  return data.drinks;
}
