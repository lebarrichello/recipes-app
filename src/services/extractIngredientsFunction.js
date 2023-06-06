export function extractIngredientsFunction(recipe) {
  const arrayEntries = Object.entries(recipe);
  const arrayEntriesIngredients = arrayEntries
    .filter((entrie) => entrie[0]
      .includes('strIngredient'));
  const arrayEntriesMeasures = arrayEntries
    .filter((entrie) => entrie[0]
      .includes('strMeasure'));
  const ingredients = arrayEntriesIngredients
    .reduce((acc, ingredient, index) => {
      acc = [...acc, {
        measure: arrayEntriesMeasures[index][1],
        ingredient: ingredient[1],
      }];
      return acc;
    }, []);
  return ingredients;
}
