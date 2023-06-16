import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppProvider from './context/AppProvider';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route component={ Login } />
      </Switch>
    </AppProvider>
  );
}

export default App;
