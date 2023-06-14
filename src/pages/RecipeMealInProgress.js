import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { Checkbox } from 'antd';
import styles from '../styles/RecipeDetails.module.css';
import { getFoodRecipeWithId } from '../services/fetchFunctions';
import { extractIngredientsFunction } from '../services/extractIngredientsFunction';
import Loading from '../components/Loading';
import { onClickFavoriteDrinkBtn } from '../services/onClickFuntions';

const CheckboxGroup = Checkbox.Group;

function RecipeMealInProgress() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const history = useHistory();
  const [statusRecipe, setStatusRecipe] = useState({
    progress: 'NoProgress',
    isFavorite: false });

  const [linkCopied, setLinkCopied] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const handleIngredientChange = (newIngredients) => {
    setCheckedIngredients(newIngredients);
  };

  useEffect(() => {
    const getRecipe = async () => {
      const mealRecipe = await getFoodRecipeWithId(id);
      setRecipe(mealRecipe);

      setIsLoading(false);
    };
    getRecipe();
  }, [id]);

  return isLoading ? (
    <Loading />
  ) : (
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
      >
        {statusRecipe.isFavorite ? (
          <img src="../images/blackHeartIcon.svg" alt="Favorite Icon" />
        ) : (
          <img src="../images/whiteHeartIcon.svg" alt="Favorite Icon" />
        )}
        Favoritar
      </button>
      {linkCopied && <p>Link copied!</p>}
      <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
      <h2 data-testid="recipe-category">{recipe.strAlcoholic}</h2>
      <section>
        <CheckboxGroup
          name="ingredients"
          value={ checkedIngredients }
          onChange={ handleIngredientChange }
        >
          {extractIngredientsFunction(recipe).map(({ ingredient, measure }, index) => (
            <label key={ index } data-testid={ `${index}-ingredient-step` }>
              <Checkbox value={ ingredient } />
              <span
                className={
                  checkedIngredients.includes(ingredient)
                    ? `${styles.checkedIngredient}`
                    : `${styles.uncheckedIngredient}`
                }
              >
                {`${ingredient} - ${measure}`}
              </span>
            </label>
          ))}
        </CheckboxGroup>
      </section>
      <section>
        <h3>Instruções</h3>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </section>
      <button
        type="button"
        className={ styles.finishRecipeButton }
        data-testid="finish-recipe-btn"
        disabled={ checkedIngredients
          .length !== extractIngredientsFunction(recipe).length }
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </main>
  );
}

export default RecipeMealInProgress;
