import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { FiChevronLeft } from 'react-icons/fi';
import styles from '../styles/RecipeDetails.module.css';
import { getDrinkRecipeWithId,
  getFoodRecipeWithId } from '../services/fetchFunctions';
import Loading from '../components/Loading';
import ShareAndFavoriteBtn from '../components/ShareAndFavoriteBtn';
import IngredientsInProgress from '../components/IngredientsInProgress';
import { onClickFinishRecipeBtn } from '../services/onClickFuntions';
import '../styles/Details.css';

function RecipeInProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const { push, location: { pathname } } = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);

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

  console.log(isDone);

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
        <div className="container__recipe-details-header">
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
            link={ `http://localhost:3000/${type === 'meal' ? 'meals' : 'drinks'}/${id}` }
          />
        </div>
        <section className="recipe-details__ingredients">
          <h3>Ingredients</h3>
          <IngredientsInProgress
            id={ id }
            recipe={ recipe }
            type={ type }
            setIsDone={ setIsDone }
          />
        </section>
        <section
          className="container__instructions"
          data-testid="instructions"
        >
          <h3>Instructions</h3>
          {recipe.instructions}
        </section>
        <button
          type="button"
          className={ styles.finishRecipeButton }
          data-testid="finish-recipe-btn"
          disabled={ !isDone }
          onClick={ () => {
            onClickFinishRecipeBtn(id, recipe, type);
            push('/done-recipes');
          } }
        >
          Finalizar Receita
        </button>
      </div>
    </main>
  );
}

export default RecipeInProgress;
