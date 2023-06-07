const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export const fetchProducts = async (productURL) => fetchData(productURL);
