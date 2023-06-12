import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import mockFetchFilters from './helpers/mockFetchFilters';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import App from '../App';
import { mockDefaultDrinks } from './helpers/mocks/mockData';

afterEach(() => {
  global.fetch.mockClear();
});

beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetchFilters));

describe('Testando os filtros', () => {
  it('Testando se os filtros aparecem na tela de meals', async () => {
    act(() => renderWithRouterAndContext(<App />, '/meals'));
    await waitFor(() => {
      screen.getByTestId('page-title');
      screen.getByTestId('All-category-filter');
      screen.getByTestId('Beef-category-filter');
      screen.getByTestId('Breakfast-category-filter');
      screen.getByTestId('Chicken-category-filter');
      screen.getByTestId('Dessert-category-filter');
      screen.getByTestId('Goat-category-filter');
    });
  });
  it('Testando se 12 primeiros retornos da API de meals aparecem na tela', async () => {
    act(() => renderWithRouterAndContext(<App />, '/meals'));
    await waitFor(() => {
      screen.getByTestId('page-title');
      screen.getByTestId('All-category-filter');
      screen.getByTestId('Beef-category-filter');
      screen.getByTestId('Breakfast-category-filter');
      screen.getByTestId('Chicken-category-filter');
      screen.getByTestId('Dessert-category-filter');
      screen.getByTestId('Goat-category-filter');
    });
    for (let i = 0; i < 12; i += 1) {
      screen.getByTestId(`${i}-recipe-card`);
      screen.getByTestId(`${i}-card-img`);
      screen.getByTestId(`${i}-card-name`);
    }
  });
  it('Testando se 12 primeiros retornos da API aparecem na tela', async () => {
    act(() => renderWithRouterAndContext(<App />, '/drinks'));
    await waitFor(() => {
      screen.getByTestId('page-title');
      screen.getByTestId('All-category-filter');
      screen.getByTestId('Ordinary Drink-category-filter');
      screen.getByTestId('Cocktail-category-filter');
      screen.getByTestId('Shake-category-filter');
      screen.getByTestId('Other / Unknown-category-filter');
      screen.getByTestId('Cocoa-category-filter');
    });
    for (let i = 0; i < 12; i += 1) {
      screen.getByTestId(`${i}-recipe-card`);
      screen.getByTestId(`${i}-card-img`);
      screen.getByTestId(`${i}-card-name`);
      console.log(mockDefaultDrinks.drinks[i].strDrink);
    }
  });
});
