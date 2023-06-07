import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import mockFetch from './helpers/mocks/mockFetch';

const searchTopBtn = 'search-top-btn';
const searchInputStr = 'search-input';
const ingredientSearchRadio = 'ingredient-search-radio';
const execSearchBtnStr = 'exec-search-btn';
const nameRadioBtnStr = 'name-search-radio';
const firstLetterSearchRadio = 'first-letter-search-radio';

afterEach(() => {
  global.fetch.mockClear();
});

beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));

describe('Testando o componente SearchBar', () => {
  it('Testando se o elemento é renderizado na rota meals', () => {
    act(() => renderWithRouterAndContext(<App />, '/meals'));
    const searchEnablerBtn = screen.getByTestId(searchTopBtn);
    act(() => userEvent.click(searchEnablerBtn));
    screen.getByTestId(searchInputStr);
    screen.getByTestId(ingredientSearchRadio);
    screen.getByTestId(nameRadioBtnStr);
    screen.getByTestId(firstLetterSearchRadio);
    screen.getByTestId(execSearchBtnStr);
  });
  it('Testando se o elemento é renderizado na rota drinks', () => {
    act(() => renderWithRouterAndContext(<App />, '/drinks'));
    const searchEnablerBtn = screen.getByTestId(searchTopBtn);
    act(() => userEvent.click(searchEnablerBtn));
    screen.getByTestId(searchInputStr);
    screen.getByTestId(ingredientSearchRadio);
    screen.getByTestId(nameRadioBtnStr);
    screen.getByTestId(firstLetterSearchRadio);
    screen.getByTestId(execSearchBtnStr);
  });
  it('Testando se o elemento faz a busca e retorna receitas de frango', () => {
    act(() => renderWithRouterAndContext(<App />, '/meals'));
    const searchEnablerBtn = screen.getByTestId(searchTopBtn);
    act(() => userEvent.click(searchEnablerBtn));
    const searchInput = screen.getByTestId(searchInputStr);
    const ingredientRadioBtn = screen.getByTestId(ingredientSearchRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnStr);
    act(() => {
      userEvent.type(searchInput, 'chicken');
      userEvent.click(ingredientRadioBtn);
      userEvent.click(execSearchBtn);
    });
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });
  it('Testando se o elemento faz a busca e retorna receitas de corba', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/meals');
    const searchEnablerBtn = screen.getByTestId(searchTopBtn);
    act(() => userEvent.click(searchEnablerBtn));
    const searchInput = screen.getByTestId(searchInputStr);
    const nameRadioBtn = screen.getByTestId(nameRadioBtnStr);
    const execSearchBtn = screen.getByTestId(execSearchBtnStr);
    act(() => {
      userEvent.type(searchInput, 'corba');
      userEvent.click(nameRadioBtn);
      userEvent.click(execSearchBtn);
    });
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=corba');
    await screen.findByText(/recipe details/i);
    expect(history.location.pathname).toBe('/meals/52977');
  });
  it('Testando se o elemento faz a busca e retorna receitas de f como primeira letra', () => {
    act(() => renderWithRouterAndContext(<App />, '/meals'));
    const searchEnablerBtn = screen.getByTestId(searchTopBtn);
    act(() => userEvent.click(searchEnablerBtn));
    const searchInput = screen.getByTestId(searchInputStr);
    const flRadBtn = screen.getByTestId(firstLetterSearchRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnStr);
    act(() => {
      userEvent.type(searchInput, 'f');
      userEvent.click(flRadBtn);
      userEvent.click(execSearchBtn);
    });
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=f');
  });
  it('Testando se o elemento faz a busca e retorna drinks de gin', () => {
    act(() => renderWithRouterAndContext(<App />, '/drinks'));
    const searchEnablerBtn = screen.getByTestId(searchTopBtn);
    act(() => userEvent.click(searchEnablerBtn));
    const searchInput = screen.getByTestId(searchInputStr);
    const ingredientRadioBtn = screen.getByTestId(ingredientSearchRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnStr);
    act(() => {
      userEvent.type(searchInput, 'gin');
      userEvent.click(ingredientRadioBtn);
      userEvent.click(execSearchBtn);
    });
    expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin');
  });
  it('Testando se o elemento faz a busca e retorna o drink A1', () => {
    act(() => renderWithRouterAndContext(<App />, '/drinks'));
    const searchEnablerBtn = screen.getByTestId(searchTopBtn);
    act(() => userEvent.click(searchEnablerBtn));
    const searchInput = screen.getByTestId(searchInputStr);
    const nameRadioBtn = screen.getByTestId(nameRadioBtnStr);
    const execSearchBtn = screen.getByTestId(execSearchBtnStr);
    act(() => {
      userEvent.type(searchInput, 'a1');
      userEvent.click(nameRadioBtn);
      userEvent.click(execSearchBtn);
    });
    expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a1');
  });
  it('Testando se o elemento faz a busca e retorna drinks de d como primeira letra', () => {
    act(() => renderWithRouterAndContext(<App />, '/drinks'));
    const searchEnablerBtn = screen.getByTestId(searchTopBtn);
    act(() => userEvent.click(searchEnablerBtn));
    const searchInput = screen.getByTestId(searchInputStr);
    const flRadBtn = screen.getByTestId(firstLetterSearchRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnStr);
    act(() => {
      userEvent.type(searchInput, 'd');
      userEvent.click(flRadBtn);
      userEvent.click(execSearchBtn);
    });
    expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=d');
  });
  it('Testando se o elemento lança erro quando não se escolhe o tipo de busca', () => {
    const alertMock = jest.spyOn(window, 'alert');
    act(() => renderWithRouterAndContext(<App />, '/meals'));
    const searchEnablerBtn = screen.getByTestId(searchTopBtn);
    act(() => userEvent.click(searchEnablerBtn));
    const searchInput = screen.getByTestId(searchInputStr);
    const execSearchBtn = screen.getByTestId(execSearchBtnStr);
    act(() => {
      userEvent.type(searchInput, 'd');
      userEvent.click(execSearchBtn);
    });
    expect(alertMock).toHaveBeenCalledWith('Please select one of the types');
    alertMock.mockRestore();
  });
  it('Testando se o elemento lança erro quando não se digita a busca', () => {
    const alertMock = jest.spyOn(window, 'alert');
    act(() => renderWithRouterAndContext(<App />, '/meals'));
    const searchEnablerBtn = screen.getByTestId(searchTopBtn);
    act(() => userEvent.click(searchEnablerBtn));
    const flRadBtn = screen.getByTestId(firstLetterSearchRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnStr);
    act(() => {
      userEvent.click(flRadBtn);
      userEvent.click(execSearchBtn);
    });
    expect(alertMock).toHaveBeenCalledWith('Please write on the box an ingredient, a name or a first letter');
    alertMock.mockRestore();
  });
  it('Testando se o elemento lança erro quando se digita 2 caracteres e seleciona first letter', () => {
    const alertMock = jest.spyOn(window, 'alert');
    act(() => renderWithRouterAndContext(<App />, '/meals'));
    const searchEnablerBtn = screen.getByTestId(searchTopBtn);
    act(() => userEvent.click(searchEnablerBtn));
    const searchInput = screen.getByTestId(searchInputStr);
    const flRadBtn = screen.getByTestId(firstLetterSearchRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnStr);
    act(() => {
      userEvent.type(searchInput, 'dd');
      userEvent.click(flRadBtn);
      userEvent.click(execSearchBtn);
    });
    expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    alertMock.mockRestore();
  });
  it('Testando se o elemento lança erro quando a busca não retorna nada', () => {
    const alertMock = jest.spyOn(window, 'alert');
    act(() => renderWithRouterAndContext(<App />, '/meals'));
    const searchEnablerBtn = screen.getByTestId(searchTopBtn);
    act(() => userEvent.click(searchEnablerBtn));
    const searchInput = screen.getByTestId(searchInputStr);
    const ingredientRadioBtn = screen.getByTestId(ingredientSearchRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnStr);
    act(() => {
      userEvent.type(searchInput, 'asdfgh');
      userEvent.click(ingredientRadioBtn);
      userEvent.click(execSearchBtn);
    });
    expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    alertMock.mockRestore();
  });
});
