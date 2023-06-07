function getStatusRecipe() {
  const progressRecipes = JSON
    .parse(localStorage.getItem('inProgressRecipes'));

  const doneRecipes = JSON
    .parse(localStorage.getItem('doneRecipes')) || [];

  console.log(progressRecipes);
  if (progressRecipes || progressRecipes?.meals) {
    return 'InProgress';
  } if (doneRecipes.find((doneRecipe) => doneRecipe.id === id)) {
    return 'Done';
  }
  return 'NoProgress';
}
export default getStatusRecipe;
