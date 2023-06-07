import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../styles/RecipeDetails.module.css';
import Loading from './Loading';
import PlayerYoutube from './PlayerYoutube';
import { getFoodRecipeWithId, getDrinksRecomendations } from '../services/fetchFunctions';
import { extractIngredientsFunction } from '../services/extractIngredientsFunction';

function RecipeDetailsFood() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([]);
  // idFood = 52977
  // idDrink = 15997

  useEffect(() => {
    const getRecipe = async () => {
      const foodRecipe = await getFoodRecipeWithId(id);
      setRecipe(foodRecipe);

      const recomendationsRecipes = await getDrinksRecomendations();
      setRecomendations(recomendationsRecipes);

      setIsLoading(false);
    };
    getRecipe();
  }, [id]);

  return isLoading ? (<Loading />) : (
    <main>
      <img
        className={ styles.imgRecipe }
        src={ recipe.strMealThumb }
        alt="Recipe Preview"
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        {recipe.strMeal}
      </h1>
      <h2
        data-testid="recipe-category"
      >
        {recipe.strCategory}

      </h2>
      <section>
        { extractIngredientsFunction(recipe)
          .map(({ ingredient, measure }, index) => (
            <div key={ index }>
              <span
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {measure ? (`${measure} ${ingredient}`) : (ingredient)}
              </span>
            </div>
          ))}
      </section>
      <section
        data-testid="instructions"
      >
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
      <section
        className={ styles.divRecomendations }
      >
        <h2>Recomendations</h2>
        {recomendations.map(({ strDrinkThumb, strDrink }, index) => {
          const numberMinRecipes = 6;
          if (index < numberMinRecipes) {
            return (
              <div
                key={ index }
                className={ styles.imgRecipeRecomendation }
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  src={ strDrinkThumb }
                  alt="Recommended Recipe Preview"
                  className={ styles.imgRecipeRecomendation }
                />
                <h2
                  data-testid={ `${index}-recommendation-title` }
                >
                  {strDrink}
                </h2>
              </div>
            );
          }
          return null;
        })}
      </section>
    </main>
  );
}

export default RecipeDetailsFood;
