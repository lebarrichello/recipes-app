import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Router } from 'react-router-dom/cjs/react-router-dom.min';
import { createMemoryHistory } from 'history';
import App from '../App';

const emailInputID = 'email-input';
const passwordInputID = 'password-input';
const submitBtnID = 'login-submit-btn';

describe('Testando o tela de Login', () => {
  it('Testando se a aplicacao renderiza os inputs e os botoes', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const emailInput = screen.getByTestId(emailInputID);
    const passwordInput = screen.getByTestId(passwordInputID);
    const submitBtn = screen.getByTestId(submitBtnID);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });
  it('Testando se os inputs sao digitaveis e testando a validacao do botao', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const emailInput = screen.getByTestId(emailInputID);
    const passwordInput = screen.getByTestId(passwordInputID);
    const submitBtn = screen.getByTestId(submitBtnID);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    act(() => {
      userEvent.type(emailInput, 'teste@trybe');
      userEvent.type(passwordInput, '12345');
    });
    expect(submitBtn).toBeDisabled();
    act(() => {
      userEvent.clear(emailInput);
      userEvent.clear(passwordInput);
      userEvent.type(emailInput, 'teste');
      userEvent.type(passwordInput, '123456');
    });
    expect(submitBtn).toBeDisabled();
    act(() => {
      userEvent.clear(emailInput);
      userEvent.clear(passwordInput);
      userEvent.type(emailInput, 'teste@trybe.com');
      userEvent.type(passwordInput, '1234567');
    });
    expect(submitBtn).toBeEnabled();
  });
  it('Testando se apos o login e escrito no localStorage e a rota muda', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const emailInput = screen.getByTestId(emailInputID);
    const passwordInput = screen.getByTestId(passwordInputID);
    const submitBtn = screen.getByTestId(submitBtnID);
    act(() => {
      userEvent.type(emailInput, 'teste@trybe.com');
      userEvent.type(passwordInput, '1234567');
      userEvent.click(submitBtn);
    });
    expect(history.location.pathname).toBe('/meals');
    expect(localStorage.getItem('email')).toBe('test@trybe.com');
  });
});
