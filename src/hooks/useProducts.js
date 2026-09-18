import { useEffect, useState } from "react";
import getProducts from "../services/productsApi.js";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchProducts() {
      try {
        const data = await getProducts(controller.signal);
        setProducts(data);
        
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setError(error);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  return { products, loading, error };
}

export default useProducts;
