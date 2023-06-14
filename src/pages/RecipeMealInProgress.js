import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { Checkbox } from 'antd';
import whiteheart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import styles from '../styles/RecipeDetails.module.css';
import { getFoodRecipeWithId, getFoodsRecomendatios } from '../services/fetchFunctions';
import { extractIngredientsFunction } from '../services/extractIngredientsFunction';
import Loading from '../components/Loading';
import getStatusRecipe from '../services/getStatusRecipe';
import { onClickFavoriteMealBtn } from '../services/onClickFuntions';

const CheckboxGroup = Checkbox.Group;

function RecipeMealInProgress() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const history = useHistory();
  const [recomendations, setRecomendations] = useState([]);
  const [statusRecipe, setStatusRecipe] = useState({
    progress: 'NoProgress',
    isFavorite: false,
  });

  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const handleIngredientChange = (newIngredients) => {
    setCheckedIngredients(newIngredients);
  };

  const handleIngredientCheck = (index) => {
    if (checkedIngredients.includes(index)) {
      setCheckedIngredients(checkedIngredients.filter((i) => i !== index));
    } else {
      setCheckedIngredients([...checkedIngredients, index]);
    }
  };

  useEffect(() => {
    const getRecipe = async () => {
      const mealRecipe = await getFoodRecipeWithId(id);
      setRecipe(mealRecipe);

      const recomendationsRecipes = await getFoodsRecomendatios();
      setRecomendations(recomendationsRecipes);

      setIsLoading(false);
    };
    getRecipe();
    setStatusRecipe(getStatusRecipe(id));
  }, [id]);
  console.log(styles);

  return isLoading ? (
    <Loading />
  ) : (
    <main>
      <img
        className={ styles.imgRecipe }
        src={ recipe.strMealThumb }
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
          isFavorite: onClickFavoriteMealBtn(id, recipe),
        }) }
      >
        {statusRecipe.isFavorite ? (
          <img src={ blackHeart } alt="Favorite Icon" />
        ) : (
          <img src={ whiteheart } alt="Favorite Icon" />
        )}
        Favoritar
      </button>

      <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
      <section>
        <CheckboxGroup
          name="ingredients"
          value={ checkedIngredients }
          onChange={ handleIngredientChange }
        >
          {extractIngredientsFunction(recipe)
            // .filter(({ ingredient }) => ingredient !== null || ingredient.length > 0)
            .map(({ ingredient, measure }, index) => (
              <div key={ index }>
                <label
                  data-testid={ `${index}-ingredient-step` }
                  style={ {
                    textDecoration: checkedIngredients.includes(index)
                      ? 'line-through solid rgb(0, 0, 0)'
                      : 'none',
                  } }
                >
                  <input
                    type="checkbox"
                    onChange={ () => handleIngredientCheck(index) }
                    checked={ checkedIngredients.includes(index) }
                  />
                  {measure ? `${measure} ${ingredient}` : ingredient}
                </label>
              </div>
            ))}
        </CheckboxGroup>
      </section>
      <section>
        <h3>Instruções</h3>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </section>

      <h3>Recomendações</h3>
      <div className={ styles.carousel }>
        {recomendations.map((food, index) => (
          <div key={ index } className={ styles.card }>
            <img
              className={ styles.recomendationImg }
              src={ food.strMealThumb }
              alt={ food.strMeal }
              data-testid={ `${index}-recomendation-card` }
            />
            <p data-testid={ `${index}-recomendation-title` }>{food.strMeal}</p>
          </div>
        ))}
      </div>
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
