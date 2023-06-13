import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import clipboardCopy from 'clipboard-copy';
import mockFetchDetails from './helpers/mocks/mockDetails/mockFetchDetails';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import App from '../App';
import { corbaName } from './helpers/mocks/mockSearch/corbaName';
import { a1Name } from './helpers/mocks/mockSearch/a1name';
import { mockDefaultDrinks, mockDefaultMeals } from './helpers/mocks/mockData';

jest.mock('clipboard-copy');

const mealRoute = '/meals/52977';
const drinkRoute = '/drinks/17222';
const recipePhotoID = 'recipe-photo';
const recipeTitleID = 'recipe-title';
const recipeCategoryID = 'recipe-category';
const instructionsID = 'instructions';
const videoID = 'video';
const favBtnID = 'favorite-btn';
const startRecipeID = 'start-recipe-btn';

afterEach(() => {
  global.fetch.mockClear();
  localStorage.clear();
});

beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetchDetails));

describe('Testando a página de Detalhes de bebidas e comidas', () => {
  it('Testando se na página de detalhes de comida 2 fetches são feitos', async () => {
    renderWithRouterAndContext(<App />, mealRoute);
    await screen.findByRole('heading', { name: /corba/i });
    expect(fetch).toBeCalledTimes(2);
  });
  it('Testando se na página de detalhes de bebidas 2 fetches são feitos', async () => {
    renderWithRouterAndContext(<App />, drinkRoute);
    await screen.findByRole('heading', { name: /a1/i });
    expect(fetch).toBeCalledTimes(2);
  });
  it('Verifica se os elementos do protótipo existem na tela de comida', async () => {
    renderWithRouterAndContext(<App />, mealRoute);
    const imgMeal = await screen.findByTestId(recipePhotoID);
    expect(imgMeal.tagName).toBe('IMG');
    const titleMeal = screen.getByRole('heading', { name: /corba/i });
    expect(titleMeal.innerHTML).toBe('Corba');
    const categoryMeal = screen.getByRole('heading', { name: /side/i });
    expect(categoryMeal.innerHTML).toBe('Side');
    for (let i = 0; i < 13; i += 1) {
      const ingAndMeas = screen.getByTestId(`${i}-ingredient-name-and-measure`);
      expect(ingAndMeas.innerHTML).toContain(corbaName.meals[0][`strIngredient${i + 1}`]);
      expect(ingAndMeas.innerHTML).toContain(corbaName.meals[0][`strMeasure${i + 1}`]);
    }
    const instructionsMeal = screen.getByTestId('instructions');
    expect(instructionsMeal.innerHTML).toBe(corbaName.meals[0].strInstructions);
    screen.getByRole('heading', { name: /recomendations/i });
  });
  it('Verifica se os elementos do protótipo existem na tela de bebida', async () => {
    renderWithRouterAndContext(<App />, drinkRoute);
    const imgDrink = await screen.findByTestId(recipePhotoID);
    expect(imgDrink.tagName).toBe('IMG');
    const titleDrink = screen.getByRole('heading', { name: /a1/i });
    expect(titleDrink.innerHTML).toBe('A1');
    const categoryDrink = screen.getByRole('heading', { name: /alcoholic/i });
    expect(categoryDrink.innerHTML).toBe('Alcoholic');
    for (let i = 0; i < 4; i += 1) {
      const ingAndMeas = screen.getByTestId(`${i}-ingredient-name-and-measure`);
      expect(ingAndMeas.innerHTML).toContain(a1Name.drinks[0][`strIngredient${i + 1}`]);
      expect(ingAndMeas.innerHTML).toContain(a1Name.drinks[0][`strMeasure${i + 1}`]);
    }
    const instructionsDrink = screen.getByTestId('instructions');
    expect(instructionsDrink.innerHTML).toBe(a1Name.drinks[0].strInstructions);
    screen.getByRole('heading', { name: /recomendations/i });
  });
  it('Verifica se todos os data-testid estão presentes na tela de comida', async () => {
    renderWithRouterAndContext(<App />, mealRoute);
    await screen.findByTestId(recipePhotoID);
    screen.getByTestId(recipeTitleID);
    screen.getByTestId(recipeCategoryID);
    screen.getByTestId('0-ingredient-name-and-measure');
    screen.getByTestId(instructionsID);
    screen.getByTestId(videoID);
  });
  it('Verifica se todos os data-testid estão presentes na tela de bebida', async () => {
    renderWithRouterAndContext(<App />, drinkRoute);
    await screen.findByTestId(recipePhotoID);
    screen.getByTestId(recipeTitleID);
    screen.getByTestId(recipeCategoryID);
    screen.getByTestId('0-ingredient-name-and-measure');
    screen.getByTestId(instructionsID);
  });
  it('Verifica se existem as recomendações de bebidas na tela de comidas', async () => {
    renderWithRouterAndContext(<App />, mealRoute);
    await screen.findByTestId(recipePhotoID);
    for (let i = 0; i < 6; i += 1) {
      screen.getByTestId(`${i}-recommendation-card`);
      const recomendationTitle = screen.getByTestId(`${i}-recommendation-title`);
      expect(recomendationTitle.innerHTML).toBe(mockDefaultDrinks.drinks[i].strDrink);
    }
  });
  it('Verifica se existem as recomendações de comidas na tela de bebidas', async () => {
    renderWithRouterAndContext(<App />, drinkRoute);
    await screen.findByTestId(recipePhotoID);
    for (let i = 0; i < 6; i += 1) {
      screen.getByTestId(`${i}-recommendation-card`);
      const recomendationTitle = screen.getByTestId(`${i}-recommendation-title`);
      expect(recomendationTitle.innerHTML).toBe(mockDefaultMeals.meals[i].strMeal);
    }
  });
  it('Verifica se existem os botões de favoritar e copiar e suas funções acontecem na página de detalhes da comida', async () => {
    clipboardCopy.mockImplementation(() => {});
    act(() => {
      renderWithRouterAndContext(<App />, mealRoute);
    });
    await screen.findByTestId(recipePhotoID);
    const shareBtn = screen.getByTestId('share-btn');
    screen.getByTestId(favBtnID);
    act(() => userEvent.click(shareBtn));
    expect(clipboardCopy).toHaveBeenCalled();
    // expect(clipboardCopy).toHaveBeenCalledWith('http://localhost:3000/meals/52977');
    screen.getByText(/link copied!/i);
    const favBtn = screen.getByTestId(favBtnID);
    expect(favBtn).toHaveAttribute('src', '../images/whiteHeartIcon.svg');
    act(() => userEvent.click(favBtn));
    expect(favBtn).toHaveAttribute('src', '../images/blackHeartIcon.svg');
    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipe[0].id).toBe('52977');
    expect(favoriteRecipe[0].type).toBe('meal');
    expect(favoriteRecipe[0].nationality).toBe('Turkish');
    expect(favoriteRecipe[0].category).toBe('Side');
    expect(favoriteRecipe[0].name).toBe('Corba');
    expect(favoriteRecipe[0].image).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    clipboardCopy.mockClear();
  });
  it('Verifica se depois de clicar no start recipe o pathname fica in progress', async () => {
    const { history } = renderWithRouterAndContext(<App />, mealRoute);
    await screen.findByTestId(recipePhotoID);
    const startRecipeBtn = screen.getByTestId(startRecipeID);
    act(() => userEvent.click(startRecipeBtn));
    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });
  it('Verifica se a receita estiver in progress o botão é continue recipe', async () => {
    const inProgressRecipes = {
      meals: {
        52771: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    renderWithRouterAndContext(<App />, mealRoute);
    await screen.findByTestId(recipePhotoID);
    const continueBtn = screen.getByTestId(startRecipeID);
    expect(continueBtn.innerHTML).toBe('Continue Recipe');
  });
  it('Verifica se existem os botões de favoritar e copiar e suas funções acontecem na página de detalhes da bebida', async () => {
    jest.resetModules();
    clipboardCopy.mockImplementation(() => {});
    act(() => {
      renderWithRouterAndContext(<App />, drinkRoute);
    });
    await screen.findByTestId(recipePhotoID);
    const shareBtn = screen.getByTestId('share-btn');
    screen.getByTestId(favBtnID);
    act(() => userEvent.click(shareBtn));
    expect(clipboardCopy).toHaveBeenCalled();
    screen.getByText(/link copied!/i);
    const favBtn = screen.getByTestId(favBtnID);
    expect(favBtn).toHaveAttribute('src', '../images/whiteHeartIcon.svg');
    act(() => userEvent.click(favBtn));
    expect(favBtn).toHaveAttribute('src', '../images/blackHeartIcon.svg');
    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipe[0].id).toBe('17222');
    expect(favoriteRecipe[0].type).toBe('drink');
    expect(favoriteRecipe[0].nationality).toBe('');
    expect(favoriteRecipe[0].category).toBe('Cocktail');
    expect(favoriteRecipe[0].name).toBe('A1');
    expect(favoriteRecipe[0].alcoholicOrNot).toBe('Alcoholic');
    expect(favoriteRecipe[0].image).toBe('https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg');
  });
  it('Verifica se depois de clicar no start recipe o pathname fica in progress nas bebidas', async () => {
    const { history } = renderWithRouterAndContext(<App />, drinkRoute);
    await screen.findByTestId(recipePhotoID);
    const startRecipeBtn = screen.getByTestId(startRecipeID);
    act(() => userEvent.click(startRecipeBtn));
    expect(history.location.pathname).toBe('/drinks/17222/in-progress');
  });
  it('Verifica se a receita estiver in progress o botão é continue recipe nas bebidas', async () => {
    const inProgressRecipes = {
      drinks: {
        17222: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    renderWithRouterAndContext(<App />, drinkRoute);
    await screen.findByTestId(recipePhotoID);
    const continueBtn = screen.getByTestId(startRecipeID);
    expect(continueBtn.innerHTML).toBe('Continue Recipe');
  });
});
