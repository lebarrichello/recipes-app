import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import DoneRecipes from '../pages/DoneRecipes';
import mockDoneRecipes from './helpers/mocks/mockDoneRecipes/mockDoneRecipes';

const filterAllBtn = 'filter-by-all-btn';
const filterMealBtn = 'filter-by-meal-btn';
const filterDrinkBtn = 'filter-by-drink-btn';
const btnShareMeal = '0-horizontal-share-btn';
const btnShareDrink = '1-horizontal-share-btn';
const PAGE_URL = '/done-recipes';

describe('Testando a pagina de receitas feitas (DoneRecipes)', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('Testando se os botoes de filtro sao renderizados na pagina', () => {
    renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();

    const allBtn = screen.getByTestId(filterAllBtn);
    expect(allBtn).toBeInTheDocument();
    const mealBtn = screen.getByTestId(filterMealBtn);
    expect(mealBtn).toBeInTheDocument();
    const drinkBtn = screen.getByTestId(filterDrinkBtn);
    expect(drinkBtn).toBeInTheDocument();
  });

  it('Testando se é renderizado na pagina a lista de refeicoes feitas', () => {
    renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const mealImg = screen.getByTestId('0-horizontal-image');
    expect(mealImg).toBeInTheDocument();
    const mealCategory = screen.getByTestId('0-horizontal-top-text');
    expect(mealCategory).toBeInTheDocument();
    expect(mealCategory.innerHTML).toBe('Italian - Vegetarian');
    const mealName = screen.getByTestId('0-horizontal-name');
    expect(mealName).toBeInTheDocument();
    expect(mealName.innerHTML).toBe('Spicy Arrabiata Penne');
    const mealTag1 = screen.getByTestId('0-Pasta-horizontal-tag');
    expect(mealTag1).toBeInTheDocument();
    expect(mealTag1.innerHTML).toBe('Pasta');
    const mealTag2 = screen.getByTestId('0-Curry-horizontal-tag');
    expect(mealTag2).toBeInTheDocument();
    expect(mealTag2.innerHTML).toBe('Curry');
    const mealShareBtn = screen.getByTestId(btnShareMeal);
    expect(mealShareBtn).toBeInTheDocument();
  });

  it('Testando se é renderizado na pagina a lista de bebidas feitas', () => {
    renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const drinkImg = screen.getByTestId('1-horizontal-image');
    expect(drinkImg).toBeInTheDocument();
    const drinkCategory = screen.getByTestId('1-horizontal-top-text');
    expect(drinkCategory).toBeInTheDocument();
    expect(drinkCategory.innerHTML).toBe('Alcoholic');
    const drinkName = screen.getByTestId('1-horizontal-name');
    expect(drinkName).toBeInTheDocument();
    expect(drinkName.innerHTML).toBe('Aquamarine');
    const drinkShareBtn = screen.getByTestId(btnShareDrink);
    expect(drinkShareBtn).toBeInTheDocument();
  });

  it('Testando se é renderizado na pagina a lista de refeicoes/bebidas feitas de acordo com o filtro selecionado', () => {
    renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const mealBtn = screen.getByTestId(filterMealBtn);
    const mealName = screen.getByText(/spicy arrabiata penne/i);
    const drinkName = screen.getByText(/aquamarine/i);

    expect(drinkName).toBeInTheDocument();
    expect(mealName).toBeInTheDocument();

    act(() => {
      userEvent.click(mealBtn);
    });

    expect(mealName).toBeInTheDocument();
    expect(drinkName).not.toBeInTheDocument();

    act(() => {
      userEvent.click(screen.getByTestId(filterDrinkBtn));
    });

    expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();
    expect(screen.queryByText(/spicy arrabiata penne/i)).not.toBeInTheDocument();

    act(() => {
      userEvent.click(screen.getByTestId(filterAllBtn));
    });
    expect(screen.getByText(/spicy arrabiata penne/i)).toBeInTheDocument();
    expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();
  });

  it('Testando o botoes de compartilhar refeicao', () => {
    renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const writeText = jest.fn();

    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    const foodShareBtn = screen.getByTestId(btnShareMeal);
    expect(foodShareBtn).toBeInTheDocument();
    const drinkShareBtn = screen.getByTestId(btnShareDrink);
    expect(drinkShareBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(foodShareBtn);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/meals/52771');
    expect(
      screen.getByRole('button', {
        name: /link copied!/i,
      }),
    ).toBeInTheDocument();
  });

  it('Testando o botao de compartilhar bebida', () => {
    renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const writeText = jest.fn();

    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    const foodShareBtn = screen.getByTestId(btnShareMeal);
    expect(foodShareBtn).toBeInTheDocument();
    const drinkShareBtn = screen.getByTestId(btnShareDrink);
    expect(drinkShareBtn).toBeInTheDocument();

    act(() => {
      userEvent.click(drinkShareBtn);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/drinks/178319');
    expect(
      screen.getByRole('button', {
        name: /link copied!/i,
      }),
    ).toBeInTheDocument();
  });
  it('Testando se a ao clicar na imagem da refeicao é alterada a rota para a pagina de detalhes', () => {
    const { history } = renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const FoodImg = screen.getByTestId('0-horizontal-image');
    expect(FoodImg).toBeInTheDocument();
    act(() => {
      userEvent.click(FoodImg);
    });

    expect(history.location.pathname).toBe('/meals/52771');
  });
  it('Testando se a ao clicar no nome da refeicao é alterada a rota para a pagina de detalhes', () => {
    const { history } = renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const foodName = screen.getByTestId('0-horizontal-name');
    expect(foodName).toBeInTheDocument();
    act(() => {
      userEvent.click(foodName);
    });

    expect(history.location.pathname).toBe('/meals/52771');
  });
  it('Testando se a ao clicar na imagem da bebida é alterada a rota para a pagina de detalhes', () => {
    const { history } = renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const drinkImg = screen.getByTestId('1-horizontal-image');
    expect(drinkImg).toBeInTheDocument();
    act(() => {
      userEvent.click(drinkImg);
    });

    expect(history.location.pathname).toBe('/drinks/178319');
  });
  it('Testando se a ao clicar no nome da bebida é alterada a rota para a pagina de detalhes', () => {
    const { history } = renderWithRouterAndContext(<DoneRecipes />, PAGE_URL);

    const drinkName = screen.getByTestId('1-horizontal-name');
    expect(drinkName).toBeInTheDocument();
    act(() => {
      userEvent.click(drinkName);
    });

    expect(history.location.pathname).toBe('/drinks/178319');
  });
});

/* npm run test-coverage -- --collectCoverageFrom=src/pages/doneRecipes.js */
