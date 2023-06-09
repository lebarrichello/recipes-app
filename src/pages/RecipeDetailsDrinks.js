import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import clipboardCopy from 'clipboard-copy';
import styles from '../styles/RecipeDetails.module.css';
import PlayerYoutube from '../components/PlayerYoutube';
import { getDrinkRecipeWithId,
  getFoodsRecomendatios } from '../services/fetchFunctions';
import { extractIngredientsFunction } from '../services/extractIngredientsFunction';
import Loading from '../components/Loading';
import getStatusRecipe from '../services/getStatusRecipe';
import { onClickFavoriteDrinkBtn } from '../services/onClickFuntions';

function RecipeDetailsDrinks() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const history = useHistory();
  const [recomendations, setRecomendations] = useState([]);
  const [statusRecipe, setStatusRecipe] = useState({ progress: 'NoProgress',
    isFavorite: false });
  const [linkCopied, setLinkCopied] = useState(false);
  // idFood = 52977
  // idDrink = 15997

  useEffect(() => {
    const getRecipe = async () => {
      const drinkRecipe = await getDrinkRecipeWithId(id);
      setRecipe(drinkRecipe);

      const recomendationsRecipes = await getFoodsRecomendatios();
      setRecomendations(recomendationsRecipes);

      setIsLoading(false);
    };
    getRecipe();
    setStatusRecipe(getStatusRecipe(id));
  }, [id]);

  return isLoading ? (<Loading />) : (
    <main>
      <img
        className={ styles.imgRecipe }
        src={ recipe.strDrinkThumb }
        alt="Recipe Preview"
        data-testid="recipe-photo"
      />
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          clipboardCopy(window.location.href);
          setLinkCopied(true);
        } }
      >
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <use xlinkHref="../images/shareIcon.svg" />
          </svg>
        </i>
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => setStatusRecipe({
          ...statusRecipe,
          isFavorite: onClickFavoriteDrinkBtn(id, recipe),
        }) }
        src={ statusRecipe.isFavorite
          ? '../images/blackHeartIcon.svg'
          : '../images/whiteHeartIcon.svg' }
      >
        Favoritar
      </button>
      {linkCopied && <p>Link copied!</p>}
      <h1
        data-testid="recipe-title"
      >
        { recipe.strDrink}
      </h1>
      <h2
        data-testid="recipe-category"
      >
        { recipe.strAlcoholic}

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
        {recomendations.map(({ strMealThumb, strMeal }, index) => {
          const numberMinRecipes = 6;
          if (index < numberMinRecipes) {
            return (
              <div
                key={ index }
                className={ styles.divRecipe }
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  src={ strMealThumb }
                  alt="Recommended Recipe Preview"
                  className={ styles.imgRecipeRecomendation }
                />
                <h2
                  data-testid={ `${index}-recommendation-title` }
                >
                  {strMeal}
                </h2>
              </div>
            );
          }
          return null;
        })}
      </section>
      {statusRecipe.progress !== 'Done' && (
        statusRecipe.progress === 'NoProgress' ? (
          <button
            className={ styles.startRecipeBtn }
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/drinks/${id}/in-progress`) }
          >
            Start Recipe
          </button>
        ) : (
          <button
            className={ styles.startRecipeBtn }
            type="button"
            data-testid="start-recipe-btn"
          >
            Continue Recipe
          </button>
        )
      )}
    </main>
  );
}

export default RecipeDetailsDrinks;
