import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { FiChevronLeft } from 'react-icons/fi';
import styles from '../styles/RecipeDetails.module.css';
import PlayerYoutube from '../components/PlayerYoutube';
import { getDrinkRecipeWithId,
  getFoodRecipeWithId } from '../services/fetchFunctions';
import Loading from '../components/Loading';
import RecipeBtn from '../components/RecipeBtn';
import Recomendations from '../components/Recomendations';
import ShareAndFavoriteBtn from '../components/ShareAndFavoriteBtn';
import '../styles/Details.css';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const { location: { pathname } } = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [type] = useState(pathname.includes('meals') ? 'meal' : 'drink');
  const history = useHistory();

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
      <div className="div__FiChevronLeft" />
      <FiChevronLeft
        className="btn-togoback"
        size="3rem"
        onClick={ () => history.goBack() }
      />
      <img
        className={ styles.imgRecipe }
        src={ recipe.img }
        alt="Recipe Preview"
        data-testid="recipe-photo"
      />
      <div className="container__recipe-details">
        <div className="recipe-details__header">
          <div>
            <h2
              data-testid="recipe-title"
            >
              { recipe.name}
            </h2>
            <span
              data-testid="recipe-category"
            >
              { type === 'meal' ? recipe.category : recipe.alcoholic}

            </span>
          </div>
          <div className="recipe-details-header__buttons" />
          <ShareAndFavoriteBtn
            id={ id }
            recipe={ recipe }
            type={ type }
            link={ window.location.href }
          />
        </div>
        <section className="recipe-details__ingredients">
          <h3>Ingredients</h3>
          { recipe.ingredients
            .map(({ ingredient, measure }, index) => (
              <ul key={ index }>
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  <span>{measure ? (`${measure} ${ingredient}`) : (ingredient)}</span>
                </li>
              </ul>
            ))}
        </section>
        <section
          className="container__instructions"
          data-testid="instructions"
        >
          <h3>Instructions</h3>
          {recipe.instructions}
        </section>
        {recipe.youtube && (
          <section
            data-testid="video"
          >
            <div className="video">
              <h3>Video</h3>
              <PlayerYoutube
                linkVideo={ recipe.youtube }
              />
            </div>
          </section>
        )}
        <section>
          <h3>Recommendations</h3>
          <Recomendations type={ type } id={ id } />
        </section>
        <RecipeBtn id={ id } type={ type } />
      </div>
    </main>

  );
}

export default RecipeDetails;
