import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import getStatusRecipe from '../services/getStatusRecipe';
import styles from '../styles/RecipeDetails.module.css';

function RecipeBtn({ id, type }) {
  const { push } = useHistory();
  const statusRecipe = getStatusRecipe(id, type === 'meal' ? 'meals' : 'drinks').progress;
  switch (statusRecipe) {
  case 'NoProgress':
    return (
      <button
        className={ styles.startRecipeBtn }
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => push(`/drinks/${id}/in-progress`) }
      >
        Start Recipe
      </button>
    );
  case 'InProgress':
    return (
      <button
        className={ styles.startRecipeBtn }
        type="button"
        data-testid="start-recipe-btn"
      >
        Continue Recipe
      </button>
    );
  default:
    return null;
  }
}

RecipeBtn.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default RecipeBtn;
