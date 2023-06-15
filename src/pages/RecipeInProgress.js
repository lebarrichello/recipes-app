import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../styles/RecipeDetails.module.css';
import { getDrinkRecipeWithId,
  getFoodRecipeWithId } from '../services/fetchFunctions';
import Loading from '../components/Loading';
import ShareAndFavoriteBtn from '../components/ShareAndFavoriteBtn';
import IngredientsInProgress from '../components/IngredientsInProgress';
import { onClickFinishRecipeBtn } from '../services/onClickFuntions';

function RecipeInProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const { push, location: { pathname } } = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);

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

  console.log(isDone);

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
        link={ `http://localhost:3000/${type === 'meal' ? 'meals' : 'drinks'}/${id}` }
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
        <IngredientsInProgress
          id={ id }
          recipe={ recipe }
          type={ type }
          setIsDone={ setIsDone }
        />
      </section>
      <section
        data-testid="instructions"
      >
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
    </main>
  );
}

export default RecipeInProgress;
