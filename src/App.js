import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import RecipeDetails from './pages/RecipeDetails';
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
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
//       <Route path="/comidas" component={ Comidas } />
//       <Route path="/bebidas" component={ Bebidas } />
//       <Route path="/meals" component={ Meals } />
//       <Route path="/drinks" component={ Drinks } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ Done } />
      <Route path="/favorite-recipes" component={ Favorites } />
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ Done } />
        <Route path="/favorite-recipes" component={ Favorites } />
      </Switch>
    </AppProvider>
  );
}

export default App;
