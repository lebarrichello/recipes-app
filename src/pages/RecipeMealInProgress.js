import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import clipboardCopy from 'clipboard-copy';
import { Checkbox } from 'antd';
// import whiteheart from '../images/whiteHeartIcon.svg';
// import blackHeart from '../images/blackHeartIcon.svg';
import styles from '../styles/RecipeDetails.module.css';
import { getFoodRecipeWithId } from '../services/fetchFunctions';
import { extractIngredientsFunction } from '../services/extractIngredientsFunction';
import Loading from '../components/Loading';
// import { onClickFavoriteDrinkBtn,
//   onClickFavoriteMealBtn } from '../services/onClickFuntions';
import getStatusRecipe from '../services/getStatusRecipe';

const CheckboxGroup = Checkbox.Group;

function RecipeMealInProgress() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [updateLocalStorage, setUpdateLocalStorage] = useState(false);
  const history = useHistory();

  //   {
  //     drinks: {
  //         id-da-bebida: [lista-de-ingredientes-utilizados],
  //         ...
  //     },
  //     meals: {
  //         id-da-comida: [lista-de-ingredientes-utilizados],
  //         ...
  //     }
  // }

  function updateCheckedIngredients(statusRecipe) {
    if (statusRecipe.progress === 'InProgress') {
      setCheckedIngredients([...statusRecipe.indexIngredients]);
    }
  }

  useEffect(() => {
    const getRecipe = async () => {
      const mealRecipe = await getFoodRecipeWithId(id);
      setRecipe(mealRecipe);
      updateCheckedIngredients(getStatusRecipe(id, 'meals'));
      setIsLoading(false);
    };
    getRecipe();
  }, [id]);

  useEffect(() => {
    if (updateLocalStorage) {
      const progressRecipes = JSON.parse(localStorage
        .getItem('inProgressRecipes')) || { drinks: {}, meals: {} };
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...progressRecipes,
        meals: {
          ...progressRecipes.meals,
          [id]: [...checkedIngredients],
        },
      }));
      setUpdateLocalStorage(false);
    }
  }, [checkedIngredients, id, updateLocalStorage]);

  const handleIngredientChange = (newIngredients) => {
    setCheckedIngredients(newIngredients);
  };

  const handleIngredientCheck = (index) => {
    if (checkedIngredients.includes(index)) {
      setCheckedIngredients(checkedIngredients.filter((i) => i !== index));
    } else {
      setCheckedIngredients([...checkedIngredients, index]);
    }
    setUpdateLocalStorage(true);
  };

  return isLoading ? (<Loading data-testid="loading" />) : (
    <main>
      <img
        className={ styles.imgRecipe }
        src={ recipe.strMealThumb }
        alt="Recipe Preview"
        data-testid="recipe-photo"
      />

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

      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>
    </main>
  );
}

export default RecipeMealInProgress;
