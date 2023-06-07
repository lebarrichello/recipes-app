import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import appFooter from './Components/Footer';
import AppProvider from './context/AppProvider';
import RecipeDetailsFood from './pages/RecipeDetailsFood';
import RecipeDetailsDrink from './pages/RecipeDetailsDrink';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoritesRecipes from './pages/FavoritesRecipes';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Login from './components backup/Login';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals/:id" component={ RecipeDetailsFood } />
        <Route path="/drinks/:id" component={ RecipeDetailsDrink } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoritesRecipes } />
      </Switch>
    </AppProvider>
  );
}

export default App;
