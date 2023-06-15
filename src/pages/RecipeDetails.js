import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../styles/RecipeDetails.module.css';
import PlayerYoutube from '../components/PlayerYoutube';
import { getDrinkRecipeWithId,
  getFoodRecipeWithId } from '../services/fetchFunctions';
import Loading from '../components/Loading';
import RecipeBtn from '../components/RecipeBtn';
import Recomendations from '../components/Recomendations';
import ShareAndFavoriteBtn from '../components/ShareAndFavoriteBtn';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const { location: { pathname } } = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [type] = useState(pathname.includes('meals') ? 'meal' : 'drink');

  // idFood = 52977
  // idDrink = 15997

  useEffect(() => {
    const getRecipe = async () => {
      if (type === 'meal') {
        const foodRecipe = await getFoodRecipeWithId(id);
        setRecipe(foodRecipe);
      } else {
        const drinkRecipe = await getDrinkRecipeWithId(id);
        setRecipe(drinkRecipe);
      }
      setIsLoading(false);
    };
    getRecipe();
  }, [id, type]);

  return isLoading ? (<Loading />) : (
    <main>
      <img
        className={ styles.imgRecipe }
        src={ recipe.img }
        alt="Recipe Preview"
        data-testid="recipe-photo"
      />
      <ShareAndFavoriteBtn
        id={ id }
        recipe={ recipe }
        type={ type }
        link={ window.location.href }
      />
      <h1
        data-testid="recipe-title"
      >
        { recipe.name}
      </h1>
      <h2
        data-testid="recipe-category"
      >
        { type === 'meal' ? recipe.category : recipe.alcoholic}

      </h2>
      <section>
        { recipe.ingredients
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
        {recipe.instructions}
      </section>
      {recipe.youtube && (
        <section
          data-testid="video"
        >
          <PlayerYoutube
            linkVideo={ recipe.youtube }
          />
        </section>
      )}
      <section>
        <h2>Recomendations</h2>
        <Recomendations type={ type } id={ id } />
      </section>
      <RecipeBtn id={ id } type={ type } />
    </main>
  );
}

export default RecipeDetails;
