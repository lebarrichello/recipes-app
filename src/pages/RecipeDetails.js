import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../styles/RecipeDetails.module.css';
import Loading from '../Components/Loading';
import PlayerYoutube from '../Components/PlayerYoutube';
import { getFoodRecipeWithId, getDrinkRecipeWithId } from '../services/fetchFunctions';
import { extractIngredientsFunction } from '../services/extractIngredientsFunction';

function RecipeDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const history = useHistory();
  const [typeRecipe, setTypeRecipe] = useState('');
  // idFood = 52977
  // idDrink = 15997

  useEffect(() => {
    const getRecipe = async () => {
      const { pathname } = history.location;
      if (pathname.includes('/meals')) {
        const foodRecipe = await getFoodRecipeWithId(id);
        setRecipe(foodRecipe);
        setTypeRecipe('Food');
        setIsLoading(false);
      } else {
        const drinkRecipe = await getDrinkRecipeWithId(id);
        setRecipe(drinkRecipe);
        setTypeRecipe('Drink');
        setIsLoading(false);
      }
    };
    getRecipe();
  }, [history, id]);

  console.log(recipe);

  return isLoading ? (<Loading />) : (
    <main>
      <img
        className={ styles.imgRecipe }
        src={ typeRecipe === 'Food' ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt="Recipe"
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        {typeRecipe === 'Food' ? recipe.strMeal : recipe.strDrink}
      </h1>
      <h2
        data-testid="recipe-category"
      >
        {typeRecipe === 'Food' ? recipe.strCategory : recipe.strAlcoholic}

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
    </main>
  );
}

export default RecipeDetails;
