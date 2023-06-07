const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  if (data.drinks === null || data.meals === null) {
    throw new Error('Sorry, we haven\'t found any recipes for these filters.');
  }

  return data;
};

export const fetchProducts = async (productURL) => fetchData(productURL);
