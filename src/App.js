import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import appFooter from './Components/Footer';
import AppProvider from './context/AppProvider';
import RecipeDetailsDrinks from './pages/RecipeDetailsDrinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetailsMeals from './pages/RecipeDetailsMeals';
import RecipeMealInProgress from './pages/RecipeMealInProgress';
import RecipeDrinkInProgress from './pages/RecipeDrinkInProgress';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id" component={ RecipeDetailsMeals } />
        <Route exact path="/drinks/:id" component={ RecipeDetailsDrinks } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />

        <Route path="/favorite-recipes" component={ FavoriteRecipes } />

        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/meals/:id/in-progress" component={ RecipeMealInProgress } />
        <Route path="/drinks/:id/in-progress" component={ RecipeDrinkInProgress } />

        <Route component={ Login } />
      </Switch>
    </AppProvider>
  );
}

export default App;
