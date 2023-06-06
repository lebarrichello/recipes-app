import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
// import appFooter from './Components/Footer';
import Meals from './Paginas/Meals';
import Profile from './Paginas/Profile';
import Recipes from './Paginas/Recipes';
import Done from './Paginas/DoneRecipes';
import Favorites from './Paginas/FavoriteRecipes';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ Recipes } />
          <Route path="/drinks" component={ Recipes } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ Done } />
          <Route path="/favorite-recipes" component={ Favorites } />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
