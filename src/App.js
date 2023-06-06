import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Meals from './Paginas/Meals';
import Profile from './Paginas/Profile';
import Drinks from './Paginas/Drinks';
import Done from './Paginas/DoneRecipes';
import Favorites from './Paginas/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Meals } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ Done } />
      <Route path="/favorite-recipes" component={ Favorites } />
    </Switch>
  );
}

export default App;
