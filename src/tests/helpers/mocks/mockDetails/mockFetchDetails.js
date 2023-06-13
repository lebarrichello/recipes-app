import { mockDefaultDrinks, mockDefaultMeals } from '../mockData';
import { a1Name } from '../mockSearch/a1name';
import { corbaName } from '../mockSearch/corbaName';

const mockFetchDetails = (url) => {
  if (url.includes('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977')) {
    return Promise.resolve({ json: () => Promise.resolve(corbaName) });
  }
  if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')) {
    return Promise.resolve({ json: () => Promise.resolve(mockDefaultDrinks) });
  }
  if (url.includes('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222')) {
    return Promise.resolve({ json: () => Promise.resolve(a1Name) });
  }
  if (url.includes('https://www.themealdb.com/api/json/v1/1/search.php?s=')) {
    return Promise.resolve({ json: () => Promise.resolve(mockDefaultMeals) });
  }
};

export default mockFetchDetails;
