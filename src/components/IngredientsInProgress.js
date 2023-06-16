import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import getStatusRecipe from '../services/getStatusRecipe';

function IngredientsInProgress({ id, recipe, type, setIsDone }) {
  const CheckboxGroup = Checkbox.Group;

  const [updateLocalStorage, setUpdateLocalStorage] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    if (updateLocalStorage) {
      const progressRecipes = JSON.parse(localStorage
        .getItem('inProgressRecipes')) || { drinks: {}, meals: {} };
      let progressRecipe = {};
      if (type === 'meal') {
        progressRecipe = {
          ...progressRecipes,
          meals: {
            ...progressRecipes.meals,
            [id]: [...checkedIngredients],
          },
        };
      } else {
        progressRecipe = {
          ...progressRecipes,
          drinks: {
            ...progressRecipes.drinks,
            [id]: [...checkedIngredients],
          },
        };
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
      setUpdateLocalStorage(false);
      setIsDone(checkedIngredients
        .length === recipe.ingredients.length);
    }
  }, [checkedIngredients, id, updateLocalStorage, type, recipe, setIsDone]);

  useEffect(() => {
    const statusRecipe = getStatusRecipe(
      id,
      type === 'meal' ? 'meals' : 'drinks',
    );
    if (statusRecipe.progress === 'InProgress') {
      setCheckedIngredients([...statusRecipe.indexIngredients]);
    }
  }, [id, type]);

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
  return (
    <CheckboxGroup
      name="ingredients"
      value={ checkedIngredients }
      onChange={ handleIngredientChange }
    >
      {recipe.ingredients
        .map(({ ingredient, measure }, index) => (
          <div key={ index } className="ingredient">
            <input
              type="checkbox"
              onChange={ () => handleIngredientCheck(index) }
              checked={ checkedIngredients.includes(index) }
              className="checkbox"
              id={ `${index}_label` }
            />
            <label
              data-testid={ `${index}-ingredient-step` }
              className={ checkedIngredients.includes(index)
                ? 'label_ingredient checked_ingredient' : 'label_ingredient' }
              htmlFor={ `${index}_label` }
            >
              {measure ? `${measure} ${ingredient}` : ingredient}
            </label>
          </div>
        ))}

    </CheckboxGroup>
  );
}

IngredientsInProgress.propTypes = {
  id: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    category: PropTypes.string,
    img: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
      measure: PropTypes.string,
      ingredient: PropTypes.string,
    })),
    instructions: PropTypes.string,
    name: PropTypes.string,
    youtube: PropTypes.string,
  }).isRequired,
  setIsDone: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientsInProgress;
