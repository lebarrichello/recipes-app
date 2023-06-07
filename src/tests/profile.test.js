import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

const mockEmail = 'teste@trybe.com';
const profFavoriteBtnStr = 'profile-favorite-btn';
const profDoneBtnStr = 'profile-done-btn';
const profLogoutBtnStr = 'profile-logout-btn';

describe('Testando a página de perfil', () => {
  it('Se aparece o campo de email, botões de receitas favoritas, receitas feitas e logout', () => {
    renderWithRouterAndContext(<App />, '/profile');
    screen.getByTestId('profile-email');
    screen.getByTestId(profFavoriteBtnStr);
    screen.getByTestId(profDoneBtnStr);
    screen.getByTestId(profLogoutBtnStr);
  });
  it('Se o email do localStorage está visível', () => {
    localStorage.setItem('user', JSON.stringify({
      email: 'teste@trybe.com',
    }));
    renderWithRouterAndContext(<App />, '/profile');
    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail.innerHTML).toBe(mockEmail);
  });
  it('Se a página possui os 3 botões: um de nome Done Recipes, um de nome Favorite Recipes e um de nome Logout', () => {
    renderWithRouterAndContext(<App />, '/profile');
    const profFavBtn = screen.getByTestId(profFavoriteBtnStr);
    const profDoneBtn = screen.getByTestId(profDoneBtnStr);
    const profLogoutBtn = screen.getByTestId(profLogoutBtnStr);
    expect(profFavBtn.innerHTML).toBe('Favorite Recipes');
    expect(profDoneBtn.innerHTML).toBe('Done Recipes');
    expect(profLogoutBtn.innerHTML).toBe('Logout');
  });
  it('Se a página redireciona para done recipes ao clicar no botão', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');
    const profDoneBtn = screen.getByTestId(profDoneBtnStr);
    act(() => userEvent.click(profDoneBtn));
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Se a página redireciona para favorite recipes ao clicar no botão', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');
    const profFavBtn = screen.getByTestId(profFavoriteBtnStr);
    act(() => userEvent.click(profFavBtn));
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Se a página redireciona para a inicial e limpa o localStorage ao clicar no botão Logout', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');
    localStorage.setItem('user', JSON.stringify({
      email: 'teste@trybe.com',
    }));
    const profLogoutBtn = screen.getByTestId(profLogoutBtnStr);
    act(() => userEvent.click(profLogoutBtn));
    expect(history.location.pathname).toBe('/');
    const user = JSON.parse(localStorage.getItem('user'));
    expect(user).toBe(null);
  });
});
