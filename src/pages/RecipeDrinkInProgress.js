import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Checkbox } from 'antd';
import styles from '../styles/RecipeDetails.module.css';
import { getDrinkRecipeWithId } from '../services/fetchFunctions';
import { extractIngredientsFunction } from '../services/extractIngredientsFunction';
import Loading from '../components/Loading';

const CheckboxGroup = Checkbox.Group;

function RecipeDrinkInProgress() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      const drinkRecipe = await getDrinkRecipeWithId(id);
      setRecipe(drinkRecipe);

      setIsLoading(false);
    };
    getRecipe();
  }, [id]);

  const handleIngredientChange = (newIngredients) => {
    setCheckedIngredients(newIngredients);
  };
  console.log(recipe);
  const handleIngredientCheck = (index) => {
    if (checkedIngredients.includes(index)) {
      setCheckedIngredients(checkedIngredients.filter((i) => i !== index));
    } else {
      setCheckedIngredients([...checkedIngredients, index]);
    }
  };
  console.log(styles);
  return isLoading ? (<Loading data-testid="loading" />) : (
    <main>
      <img
        className={ styles.imgRecipe }
        src={ recipe.strDrinkThumb }
        alt="Recipe Preview"
        data-testid="recipe-photo"
      />

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

      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>

    </main>
  );
}

export default RecipeDrinkInProgress;
