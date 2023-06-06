import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AppProvider from '../../context/AppProvider';

function renderWithRouterAndContext(component, path = '/') {
  const history = createMemoryHistory({ initialEntries: [path] });

  return {
    ...render(
      <AppProvider>
        <Router history={ history }>
          {component}
        </Router>
      </AppProvider>,
    ),
    history,
  };
}

export default renderWithRouterAndContext;
