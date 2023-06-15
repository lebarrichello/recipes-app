export function onClickFavoriteBtn(id, recipe, type) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const isFavorite = favoriteRecipes.some((rcp) => rcp.id === id);
  let newFavoriteRecipes = [];
  if (isFavorite) {
    newFavoriteRecipes = favoriteRecipes.filter((rcp) => rcp.id !== id);
  } else {
    const { category, nationality,
      name, img, alcoholic } = recipe;
    const newFavoriteRecipe = {
      id: recipe.id,
      type,
      nationality,
      category,
      alcoholicOrNot: alcoholic || '',
      name,
      image: img,
    };
    newFavoriteRecipes = [...favoriteRecipes, newFavoriteRecipe];
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  return !isFavorite;
}

export function onClickFinishRecipeBtn(id, recipe, type) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const { nationality, category, name, img, alcoholic, tags } = recipe;
  const newDoneRecipe = {
    id: recipe.id,
    type,
    nationality,
    category,
    name,
    image: img,
    alcoholicOrNot: alcoholic || '',
    doneDate: new Date(Date.now()).toISOString(),
    tags,
  };
  localStorage.setItem('doneRecipes', JSON
    .stringify([...doneRecipes, newDoneRecipe]));
}
