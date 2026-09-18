const API_URL = "https://fakestoreapi.com/products";

async function getProducts(signal) {
  const response = await fetch(API_URL, { signal: signal });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export default getProducts;
