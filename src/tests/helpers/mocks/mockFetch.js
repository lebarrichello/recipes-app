import { mockDefaultDrinks, mockDefaultMeals } from './mockData';
import { mockDefaultCategoriesDrinks, mockDefaultCategoriesMeals } from './mockDefaultCategories';
import { a1Name } from './mockSearch/a1name';
import { asdfghSearch } from './mockSearch/asdfgh';
import { chickenIngredient } from './mockSearch/chickeningredient';
import { corbaName } from './mockSearch/corbaName';
import { dFirstLetter } from './mockSearch/dFirstLetter';
import { fFirstLetter } from './mockSearch/fFirstLetter';
import { ginIngredient } from './mockSearch/ginIngredient';

const mockFetch = (url) => {
  if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
    return Promise.resolve({ json: () => Promise.resolve(mockDefaultMeals) });
  }
  if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')) {
    return Promise.resolve({ json: () => Promise.resolve(mockDefaultDrinks) });
  }
  if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin')) {
    return Promise.resolve({ json: () => Promise.resolve(ginIngredient) });
  }
  if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a1')) {
    return Promise.resolve({ json: () => Promise.resolve(a1Name) });
  }
  if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=d')) {
    return Promise.resolve({ json: () => Promise.resolve(dFirstLetter) });
  }
  if (url.includes('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken')) {
    return Promise.resolve({ json: () => Promise.resolve(chickenIngredient) });
  }
  if (url.includes('https://www.themealdb.com/api/json/v1/1/filter.php?i=asdfgh')) {
    return Promise.resolve({ json: () => Promise.resolve(asdfghSearch) });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=corba' || url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') {
    return Promise.resolve({ json: () => Promise.resolve(corbaName) });
  }
  if (url.includes('https://www.themealdb.com/api/json/v1/1/search.php?f=f')) {
    return Promise.resolve({ json: () => Promise.resolve(fFirstLetter) });
  }
  if (url.includes('https://www.themealdb.com/api/json/v1/1/list.php?c=list')) {
    return Promise.resolve({ json: () => Promise.resolve(mockDefaultCategoriesMeals) });
  }
  if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')) {
    return Promise.resolve({ json: () => Promise.resolve(mockDefaultCategoriesDrinks) });
  }
  return Promise.reject(new Error('Houve algo de errado com o endpoint, verifique se ele está correto'));
};

export default mockFetch;
