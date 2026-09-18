import { Link } from "react-router";
import { useCart } from "./useCart";
import styles from "./Cart.module.css";

function Cart() {
  const {
    cart,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className={styles.cart}>
        <section className={styles.emptyCart} aria-labelledby="empty-title">
          <span className={styles.emptyIcon} aria-hidden="true">
            🛒
          </span>

          <p className={styles.eyebrow}>Your cart</p>

          <h1 id="empty-title">Your cart is empty</h1>

          <p>Looks like you haven't added anything to your cart yet.</p>

          <Link to="/shop" className={styles.shopButton}>
            Start shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.cart}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Your selection</p>

          <h1>Your cart</h1>

          <p className={styles.itemCount}>
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
        </div>

        <button
          type="button"
          className={styles.clearButton}
          onClick={clearCart}
        >
          Clear cart
        </button>
      </header>

      <div className={styles.layout}>
        <section aria-labelledby="cart-items-title">
          <h2 id="cart-items-title" className={styles.visuallyHidden}>
            Cart items
          </h2>

          <ul className={styles.items}>
            {cart.map((item) => (
              <li key={item.id} className={styles.item}>
                <article className={styles.product}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.productInfo}>
                    <div className={styles.productHeader}>
                      <div>
                        <h3>{item.title}</h3>

                        <p className={styles.unitPrice}>
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        Remove
                      </button>
                    </div>

                    <div className={styles.productBottom}>
                      <div className={styles.quantity}>
                        <label htmlFor={`cart-quantity-${item.id}`}>
                          Quantity
                        </label>

                        <input
                          id={`cart-quantity-${item.id}`}
                          type="number"
                          min="1"
                          step="1"
                          value={item.quantity}
                          onChange={(event) =>
                            updateQuantity(item.id, Number(event.target.value))
                          }
                        />
                      </div>

                      <p className={styles.itemTotal}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <aside className={styles.summary} aria-labelledby="summary-title">
          <h2 id="summary-title">Order summary</h2>

          <dl>
            <div>
              <dt>Items</dt>
              <dd>{totalItems}</dd>
            </div>

            <div>
              <dt>Subtotal</dt>
              <dd>${totalPrice.toFixed(2)}</dd>
            </div>

            <div>
              <dt>Shipping</dt>
              <dd>Free</dd>
            </div>
          </dl>

          <div className={styles.total}>
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <button type="button" className={styles.checkoutButton}>
            Proceed to checkout
          </button>

          <Link to="/shop" className={styles.continueShopping}>
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
