import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import clipboardCopy from 'clipboard-copy';
import mockFetchDetails from './helpers/mocks/mockDetails/mockFetchDetails';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import App from '../App';

jest.mock('clipboard-copy');

const inProgressCorbaPage = '/meals/52977/in-progress';
const inProgressA1Page = '/drinks/17222/in-progress';
const recipePhotoID = 'recipe-photo';
const recipeTitleID = 'recipe-title';
const shareBtnID = 'share-btn';
const favBtnID = 'favorite-btn';
const recipeCategoryID = 'recipe-category';
const instructionsID = 'instructions';
const finishRecipeBtnID = 'finish-recipe-btn';
const mealURL = 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg';

beforeAll(() => {
  global.window = {
    location: {
      reload: jest.fn(),
    },
  };
});

afterAll(() => {
  delete global.window;
});

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(mockFetchDetails);
  localStorage.clear();
});

afterEach(() => {
  global.fetch.mockClear();
});

describe('Testando a página de inProgress de comidas e bebidas', () => {
  it('Testando se os elementos na página de comidas existem', async () => {
    renderWithRouterAndContext(<App />, inProgressCorbaPage);
    await screen.findByTestId(recipePhotoID);
    screen.getByTestId(recipeTitleID);
    screen.getByTestId(shareBtnID);
    screen.getByTestId(favBtnID);
    screen.getByTestId(recipeCategoryID);
    screen.getByTestId(finishRecipeBtnID);
    screen.getByTestId(instructionsID);
  });
  it('Testando se os elementos na página de bebidas existem', async () => {
    renderWithRouterAndContext(<App />, inProgressA1Page);
    await screen.findByTestId(recipePhotoID);
    screen.getByTestId(recipeTitleID);
    screen.getByTestId(shareBtnID);
    screen.getByTestId(favBtnID);
    screen.getByTestId(recipeCategoryID);
    screen.getByTestId(finishRecipeBtnID);
    screen.getByTestId(instructionsID);
  });
  it('Testando se todos os ingredientes da comida tem um checkbox', async () => {
    renderWithRouterAndContext(<App />, inProgressCorbaPage);
    await screen.findByTestId(recipePhotoID);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(13);
    for (let index = 0; index < 13; index += 1) {
      screen.getByTestId(`${index}-ingredient-step`);
    }
  });
  it('Testando se todos os ingredientes da bebida tem um checkbox', async () => {
    renderWithRouterAndContext(<App />, inProgressA1Page);
    await screen.findByTestId(recipePhotoID);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(4);
    for (let index = 0; index < 4; index += 1) {
      screen.getByTestId(`${index}-ingredient-step`);
    }
  });
  it('Testa se a página salva o progresso de uma comida ao recarregar', async () => {
    act(() => renderWithRouterAndContext(<App />, inProgressCorbaPage));
    await screen.findByTestId(recipePhotoID);
    const checkbox0 = screen.getByRole('checkbox', { name: /1 cup lentils/i });
    act(() => userEvent.click(checkbox0));
    expect(checkbox0).toBeChecked();
    act(() => renderWithRouterAndContext(<App />, inProgressCorbaPage));
    await screen.findByTestId(recipePhotoID);
    const checkbox1 = screen.getByRole('checkbox', { name: /1 cup lentils/i });
    expect(checkbox1).toBeChecked();
  });
  it('Testa se a página salva o progresso de uma bebida ao recarregar', async () => {
    act(() => renderWithRouterAndContext(<App />, inProgressA1Page));
    await screen.findByTestId(recipePhotoID);
    const checkbox0 = screen.getByRole('checkbox', { name: /1 3\/4 shot gin/i });
    act(() => userEvent.click(checkbox0));
    expect(checkbox0).toBeChecked();
    act(() => renderWithRouterAndContext(<App />, inProgressA1Page));
    await screen.findByTestId(recipePhotoID);
    const checkbox1 = screen.getByRole('checkbox', { name: /1 3\/4 shot gin/i });
    expect(checkbox1).toBeChecked();
  });
  it('Verifica se existem os botões de favoritar e copiar e suas funções acontecem na página de detalhes da comida', async () => {
    clipboardCopy.mockImplementation(() => {});
    act(() => {
      renderWithRouterAndContext(<App />, inProgressCorbaPage);
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
    expect(favoriteRecipe[0].image).toBe(mealURL);
    clipboardCopy.mockClear();
  });
  it('Verifica se existem os botões de favoritar e copiar e suas funções acontecem na página de detalhes da bebida', async () => {
    jest.resetModules();
    clipboardCopy.mockImplementation(() => {});
    act(() => {
      renderWithRouterAndContext(<App />, inProgressA1Page);
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
  it('Verifica se o botão de terminar receita está desabilitado ao não clicar nos ingredientes na página de comida', async () => {
    renderWithRouterAndContext(<App />, inProgressCorbaPage);
    await screen.findByTestId(recipePhotoID);
    const finishRecipeBtn = screen.getByTestId(finishRecipeBtnID);
    expect(finishRecipeBtn).toBeDisabled();
  });
  it('Verifica se o botão de terminar receita está desabilitado ao não clicar nos ingredientes na página de bebida', async () => {
    renderWithRouterAndContext(<App />, inProgressA1Page);
    await screen.findByTestId(recipePhotoID);
    const finishRecipeBtn = screen.getByTestId(finishRecipeBtnID);
    expect(finishRecipeBtn).toBeDisabled();
  });
  it('Verifica se o botão de terminar receita está habilitado ao clicar nos ingredientes na página de comida', async () => {
    renderWithRouterAndContext(<App />, inProgressCorbaPage);
    await screen.findByTestId(recipePhotoID);
    const finishRecipeBtn = screen.getByTestId(finishRecipeBtnID);
    expect(finishRecipeBtn).toBeDisabled();
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      act(() => userEvent.click(checkbox));
    });
    expect(finishRecipeBtn).toBeEnabled();
  });
  it('Verifica se o botão de terminar receita está habilitado ao clicar nos ingredientes na página de bebida', async () => {
    renderWithRouterAndContext(<App />, inProgressA1Page);
    await screen.findByTestId(recipePhotoID);
    const finishRecipeBtn = screen.getByTestId(finishRecipeBtnID);
    expect(finishRecipeBtn).toBeDisabled();
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      act(() => userEvent.click(checkbox));
    });
    expect(finishRecipeBtn).toBeEnabled();
  });
  it('Verifica se redireciona a pessoa usuária para done recipes e coloca no localStorage da pagina de comidas', async () => {
    const { history } = renderWithRouterAndContext(<App />, inProgressCorbaPage);
    await screen.findByTestId(recipePhotoID);
    const finishRecipeBtn = screen.getByTestId(finishRecipeBtnID);
    expect(finishRecipeBtn).toBeDisabled();
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      act(() => userEvent.click(checkbox));
    });
    expect(finishRecipeBtn).toBeEnabled();
    act(() => finishRecipeBtn);
    expect(history.location.pathname).toBe('/done-recipes');
    const retrievedStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const dateNow = new Date();
    const mockStorage = [
      {
        id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        name: 'Corba',
        image: mealURL,
        doneDate: dateNow.toISOString(),
        tags: 'Soup',
      },
    ];
    expect(retrievedStorage).toBe(mockStorage);
  });
  it('Verifica se redireciona a pessoa usuária para done recipes e coloca no localStorage da pagina de comidas', async () => {
    const { history } = renderWithRouterAndContext(<App />, inProgressA1Page);
    await screen.findByTestId(recipePhotoID);
    const finishRecipeBtn = screen.getByTestId(finishRecipeBtnID);
    expect(finishRecipeBtn).toBeDisabled();
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      act(() => userEvent.click(checkbox));
    });
    expect(finishRecipeBtn).toBeEnabled();
    act(() => finishRecipeBtn);
    expect(history.location.pathname).toBe('/done-recipes');
    const retrievedStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const dateNow = new Date();
    const mockStorage = [
      {
        id: '17222',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'A1',
        image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
        doneDate: dateNow.toISOString(),
      },
    ];
    expect(retrievedStorage).toBe(mockStorage);
  });
});
