export function onClickFavoriteDrinkBtn(id, recipe) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const isFavorite = favoriteRecipes.some((rcp) => rcp.id === id);
  let newFavoriteRecipes = [];
  if (isFavorite) {
    newFavoriteRecipes = favoriteRecipes.filter((rcp) => rcp.id !== id);
  } else {
    const { idDrink, strCategory, strArea = '', strAlcoholic = '',
      strDrink, strDrinkThumb } = recipe;
    const newFavoriteRecipe = {
      id: idDrink,
      type: 'drink',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    newFavoriteRecipes = [...favoriteRecipes, newFavoriteRecipe];
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  return !isFavorite;
}

export function onClickFavoriteMealBtn(id, recipe) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const isFavorite = favoriteRecipes.some((rcp) => rcp.id === id);
  let newFavoriteRecipes = [];
  if (isFavorite) {
    newFavoriteRecipes = favoriteRecipes.filter((rcp) => rcp.id !== id);
  } else {
    const { idMeal, strCategory, strArea = '', strAlcoholic = '',
      strMeal, strMealThumb } = recipe;
    const newFavoriteRecipe = {
      id: idMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strMeal,
      image: strMealThumb,
    };
    newFavoriteRecipes = [...favoriteRecipes, newFavoriteRecipe];
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  return !isFavorite;
}
