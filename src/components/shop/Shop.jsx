import { useState } from "react";
import styles from "./Shop.module.css";
import { useCart } from "../cart/useCart.js";
import useProducts from "../../hooks/useProducts.js";

function Shop() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

  function handleQuantityChange(productId, value) {
    const quantity = Math.max(1, Number(value) || 1);

    setQuantities((current) => ({
      ...current,
      [productId]: quantity,
    }));
  }

  function handleAddToCart(product) {
    const quantity = quantities[product.id] ?? 1;
    addToCart(product, quantity);
  }

  if (loading) {
    return (
      <main className={styles.shop}>
        <div className={styles.status} role="status">
          <p>Loading products...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.shop}>
        <div className={styles.status} role="alert">
          <h1>Something went wrong</h1>
          <p>We couldn't load the products. Please try again.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.shop}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Our collection</p>
          <h1>Shop all products</h1>
        </div>

        <p className={styles.productCount}>{products.length} products</p>
      </header>

      <section aria-labelledby="products-heading">
        <h2 id="products-heading" className={styles.visuallyHidden}>
          Products
        </h2>

        <ul className={styles.productGrid}>
          {products.map((product) => {
            const quantity = quantities[product.id] ?? 1;

            return (
              <li key={product.id} className={styles.productItem}>
                <article className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.content}>
                    <h3 className={styles.title}>{product.title}</h3>

                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.footer}>
                      <p className={styles.price}>
                        ${product.price.toFixed(2)}
                      </p>

                      <div className={styles.actions}>
                        <label
                          htmlFor={`quantity-${product.id}`}
                          className={styles.quantityLabel}
                        >
                          Quantity
                        </label>

                        <input
                          id={`quantity-${product.id}`}
                          className={styles.quantityInput}
                          type="number"
                          min="1"
                          step="1"
                          value={quantity}
                          onChange={(event) =>
                            handleQuantityChange(product.id, event.target.value)
                          }
                        />

                        <button
                          type="button"
                          className={styles.addButton}
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Shop;
