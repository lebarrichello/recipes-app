function getStatusRecipe(id) {
  const progressRecipes = JSON
    .parse(localStorage.getItem('inProgressRecipes'));

  const doneRecipes = JSON
    .parse(localStorage.getItem('doneRecipes')) || [];

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const isFavorite = favoriteRecipes.some((recipe) => recipe.id === id);

  if (progressRecipes || progressRecipes?.meals) {
    return {
      progress: 'InProgress',
      isFavorite,
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
