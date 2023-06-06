import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDrinkRecipeWithId } from '../services/fetchFunctions';
import { extractIngredientsFunction } from '../services/extractIngredientsFunction';
import PlayerYoutube from './PlayerYoutube';
import Loading from './Loading';

function RecipeDetailsDrinks() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // idFood = 52977
  // idDrink = 15997

  useEffect(() => {
    const getRecipe = async () => {
      const drinkRecipe = await getDrinkRecipeWithId(id);
      setRecipe(drinkRecipe);
      setIsLoading(false);
    };
    getRecipe();
  }, [id]);

  console.log(recipe);
  return isLoading ? (<Loading />) : (
    <main>
      <img
        src={ recipe.strDrinkThumb }
        alt="Recipe"
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        {recipe.strDrink}
      </h1>
      <h2
        data-testid="recipe-category"
      >
        {recipe.strCategory}
      </h2>
      <section>
        { extractIngredientsFunction(recipe)
          .map(({ ingredient }, index) => (
            <span
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </span>
          ))}
      </section>
      <section>
        {recipe.strInstructions}
      </section>
      {recipe.strYoutube && (
        <section
          data-testid="video"
        >
          <PlayerYoutube
            linkVideo={ recipe.strYoutube }
          />
        </section>
      )}
    </main>
  );
}

export default RecipeDetailsDrinks;
