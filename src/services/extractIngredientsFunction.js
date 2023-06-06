export function extractIngredientsFunction(recipe) {
  const arrayEntries = Object.entries(recipe);
  const arrayEntriesIngredients = arrayEntries
    .filter((entrie) => entrie[0].includes('strIngredient') && entrie[1] !== '');
  const ingredients = arrayEntriesIngredients
    .reduce((acc, ingredient) => {
      acc = [...acc, { ingredient: ingredient[1] }];
      return acc;
    }, []);
  return ingredients;
}
