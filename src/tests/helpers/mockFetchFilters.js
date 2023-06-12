import { mockDefaultDrinks, mockDefaultMeals } from './mocks/mockData';
import { mockDefaultCategoriesDrinks, mockDefaultCategoriesMeals } from './mocks/mockDefaultCategories';
import { mockBeefFilter } from './mocks/mockFilters/beefFilter';
import { mockBreakfastFilter } from './mocks/mockFilters/breakfastFilter';
import { mockCocktailFilter } from './mocks/mockFilters/cocktailFilter';
import { mockCocoaFilter } from './mocks/mockFilters/cocoaFilter';
import { mockDessertFilter } from './mocks/mockFilters/dessertFilter';
import { mockGoatFilter } from './mocks/mockFilters/goatFilter';
import { mockOrdinaryDrinkFilter } from './mocks/mockFilters/ordinaryDrinkFilter';
import { mockOtherUnknownFilter } from './mocks/mockFilters/otherUnknownFilter';
import { mockShakeFilter } from './mocks/mockFilters/shakeFilter';

const mockFetchFilters = (url) => {
  if (url.includes('https://www.themealdb.com/api/json/v1/1/search.php?s=')) {
    return Promise.resolve({ json: () => Promise.resolve(mockDefaultMeals) });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
    return Promise.resolve({ json: () => Promise.resolve(mockDefaultCategoriesMeals) });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') {
    return Promise.resolve({ json: () => Promise.resolve(mockBeefFilter) });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast') {
    return Promise.resolve({ json: () => Promise.resolve(mockBreakfastFilter) });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert') {
    return Promise.resolve({ json: () => Promise.resolve(mockDessertFilter) });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat') {
    return Promise.resolve({ json: () => Promise.resolve(mockGoatFilter) });
  }
  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
    return Promise.resolve({ json: () => Promise.resolve(mockDefaultDrinks) });
  }
  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
    return Promise.resolve({ json: () => Promise.resolve(mockDefaultCategoriesDrinks) });
  }
  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary%20Drink') {
    return Promise.resolve({ json: () => Promise.resolve(mockOrdinaryDrinkFilter) });
  }
  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail') {
    return Promise.resolve({ json: () => Promise.resolve(mockCocktailFilter) });
  }
  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake') {
    return Promise.resolve({ json: () => Promise.resolve(mockShakeFilter) });
  }
  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other%20/%20Unknown') {
    return Promise.resolve({ json: () => Promise.resolve(mockOtherUnknownFilter) });
  }
  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa') {
    return Promise.resolve({ json: () => Promise.resolve(mockCocoaFilter) });
  }
  return Promise.reject(new Error('Houve algo de errado com o endpoint, verifique se ele está correto'));
};

export default mockFetchFilters;
