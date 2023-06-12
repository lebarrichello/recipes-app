import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  it('Testando se 12 retornos da API de meals aparecem na tela', async () => {
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
  it('Testando se 12 retornos da API de drinks aparecem na tela', async () => {
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
    }
  });
  it('Testando se clicando em um filtro Beef, as receitas de beef são mostradas', async () => {
    act(() => renderWithRouterAndContext(<App />, '/meals'));
    await waitFor(() => {
      screen.getByTestId('Beef-category-filter');
    });
    const beefFilterBtn = screen.getByTestId('Beef-category-filter');
    act(() => userEvent.click(beefFilterBtn));
    await waitFor(() => {
      screen.getByRole('heading', {
        name: /beef and mustard pie/i,
      });
      screen.getByRole('heading', {
        name: /beef and oyster pie/i,
      });
      screen.getByRole('heading', {
        name: /beef asado/i,
      });
    });
  });
  it('Testando se clicando em um filtro Cocoa, as receitas de cocoa são mostradas', async () => {
    act(() => renderWithRouterAndContext(<App />, '/drinks'));
    await waitFor(() => {
      screen.getByTestId('Cocoa-category-filter');
    });
    const cocoaDrinkFilter = screen.getByTestId('Cocoa-category-filter');
    act(() => userEvent.click(cocoaDrinkFilter));
    await waitFor(() => {
      screen.getByRole('heading', {
        name: /castillian hot chocolate/i,
      });
      screen.getByRole('heading', {
        name: /castillian hot chocolate/i,
      });
      screen.getByRole('heading', {
        name: /chocolate drink/i,
      });
    });
  });
  it('Testando se clicando em um filtro Cocoa, e depois clicando em All, aparece a tela inicial de drinks', async () => {
    act(() => renderWithRouterAndContext(<App />, '/drinks'));
    await waitFor(() => {
      screen.getByTestId('Cocoa-category-filter');
    });
    const cocoaDrinkFilter = screen.getByTestId('Cocoa-category-filter');
    act(() => userEvent.click(cocoaDrinkFilter));
    await waitFor(() => {
      screen.getByRole('heading', {
        name: /castillian hot chocolate/i,
      });
      screen.getByRole('heading', {
        name: /castillian hot chocolate/i,
      });
      screen.getByRole('heading', {
        name: /chocolate drink/i,
      });
    });
    const allFilter = screen.getByTestId('All-category-filter');
    act(() => userEvent.click(allFilter));
    await waitFor(() => {
      screen.getByRole('heading', {
        name: /orgasm/i,
      });
      screen.getByRole('heading', {
        name: /radler/i,
      });
    });
  });
});
