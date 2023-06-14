import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Checkbox } from 'antd';
import clipboardCopy from 'clipboard-copy';
import styles from '../styles/RecipeDetails.module.css';
import { getDrinkRecipeWithId } from '../services/fetchFunctions';
import { extractIngredientsFunction } from '../services/extractIngredientsFunction';
import Loading from '../components/Loading';
import getStatusRecipe from '../services/getStatusRecipe';
import { onClickFavoriteDrinkBtn } from '../services/onClickFuntions';

const CheckboxGroup = Checkbox.Group;

function RecipeDrinkInProgress() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [updateLocalStorage, setUpdateLocalStorage] = useState(false);
  const [statusRecipe, setStatusRecipe] = useState({});
  const [linkCopied, setLinkCopied] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getRecipe = async () => {
      const drinkRecipe = await getDrinkRecipeWithId(id);
      setRecipe(drinkRecipe);
      setStatusRecipe(getStatusRecipe(id, 'drinks'));
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
        drinks: {
          ...progressRecipes.drinks,
          [id]: [...checkedIngredients],
        },
      }));
      setUpdateLocalStorage(false);
    }
  }, [checkedIngredients, id, updateLocalStorage]);

  useEffect(() => {
    if (statusRecipe.progress === 'InProgress') {
      setCheckedIngredients([...statusRecipe.indexIngredients]);
    }
  }, [statusRecipe]);

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
        src={ recipe.strDrinkThumb }
        alt="Recipe Preview"
        data-testid="recipe-photo"
      />

      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          clipboardCopy(`http://localhost:3000/drinks/${id}`);
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

      <section
        data-testid="instructions"
      >
        {recipe.strInstructions}
      </section>

      <button
        type="button"
        className={ styles.finishRecipeButton }
        data-testid="finish-recipe-btn"
        disabled={ checkedIngredients
          .length !== extractIngredientsFunction(recipe).length }
        onClick={ () => {
          history.push('/done-recipes');
          const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
          const newDoneRecipe = {
            id: recipe.idDrink,
            type: 'drink',
            nationality: recipe.strArea || '',
            category: recipe.strCategory || '',
            name: recipe.strDrink,
            image: recipe.strDrinkThumb,
            alcoholicOrNot: recipe.strAlcoholic,
            doneDate: new Date(Date.now()).toISOString(),
            tags: recipe.strTags || [],
          };
          localStorage.setItem('doneRecipes', JSON
            .stringify([...doneRecipes, newDoneRecipe]));
        } }
      >
        Finalizar Receita
      </button>

    </main>
  );
}

export default RecipeDrinkInProgress;
