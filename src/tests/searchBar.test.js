import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockDefaultDrinks, mockDefaultMeals } from './helpers/mockData';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

beforeEach(jest.restoreAllMocks);

describe('Testando o componente SearchBar', () => {
  it('Testando se o elemento é renderizado na rota meals', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDefaultMeals),
    });
    act(() => renderWithRouterAndContext(<App />, '/meals'));
    const searchEnablerBtn = screen.getByTestId('search-top-btn');
    act(() => userEvent.click(searchEnablerBtn));
    screen.getByTestId('search-input');
    screen.getByTestId('ingredient-search-radio');
    screen.getByTestId('name-search-radio');
    screen.getByTestId('first-letter-search-radio');
    screen.getByTestId('exec-search-btn');
  });
  it('Testando se o elemento é renderizado na rota drinks', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDefaultDrinks),
    });
    act(() => renderWithRouterAndContext(<App />, '/drinks'));
    const searchEnablerBtn = screen.getByTestId('search-top-btn');
    act(() => userEvent.click(searchEnablerBtn));
    screen.getByTestId('search-input');
    screen.getByTestId('ingredient-search-radio');
    screen.getByTestId('name-search-radio');
    screen.getByTestId('first-letter-search-radio');
    screen.getByTestId('exec-search-btn');
  });
  it('Testando se o elemento é renderizado na rota meals', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDefaultMeals),
    });
    act(() => renderWithRouterAndContext(<App />, '/meals'));
    const searchEnablerBtn = screen.getByTestId('search-top-btn');
    act(() => userEvent.click(searchEnablerBtn));
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadioBtn = screen.getByTestId('ingredient-search-radio');
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    act(() => {
      userEvent.type(searchInput, 'algo');
      userEvent.click(ingredientRadioBtn);
      userEvent.click(execSearchBtn);
    });
  });
});
