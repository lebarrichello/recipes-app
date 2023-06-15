function getStatusRecipe(id, type = 'undefined') {
  const progressRecipes = JSON
    .parse(localStorage.getItem('inProgressRecipes')) || { drinks: {}, meals: {} };

  const doneRecipes = JSON
    .parse(localStorage.getItem('doneRecipes')) || [];

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const isInProgress = !!(progressRecipes[type] && progressRecipes[type][id]);

  const isFavorite = favoriteRecipes.some((recipe) => recipe.id === id);

  if (isInProgress) {
    return {
      progress: 'InProgress',
      isFavorite,
      indexIngredients: progressRecipes[type][id],
    };
  } if (doneRecipes.find((doneRecipe) => doneRecipe.id === id)) {
    return {
      progress: 'Done',
      isFavorite,
    };
  }
  return {
    progress: 'NoProgress',
    isFavorite,
  };
}
export default getStatusRecipe;
