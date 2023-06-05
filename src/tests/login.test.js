import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o tela de Login', () => {
  it('Testando se a aplicacao renderiza os inputs e os botoes', () => {
    render(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByTestId('login-submit-btn');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });
  it('Testando se os inputs sao digitaveis e testando a validacao do botao', () => {
    render(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByTestId('login-submit-btn');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailBtn).toBeInTheDocument();
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
      userEvent.type(passwordInput, '123456');
    });
    expect(submitBtn).toBeEnabled();
  });
  it('Testando se apos o login e escrito no localStorage e a rota muda', () => {
    const { history } = render(<App />);
    // const { pathname } = hist;
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByTestId('login-submit-btn');
    act(() => {
      userEvent.type(emailInput, 'teste@trybe.com');
      userEvent.type(passwordInput, '123456');
      userEvent.click(submitBtn);
    });
  });
});
