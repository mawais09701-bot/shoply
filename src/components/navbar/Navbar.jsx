import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useCart } from "../cart/useCart.js";
import styles from "./Navbar.module.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoMark}>S</span> <span>Shoply</span>
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Cart
            </NavLink>
          </li>
        </ul>
        <Link to="/cart" className={styles.cartButton}>
          <span>Cart</span>
          <span className={styles.cartIcon} aria-hidden="true">
            🛒
          </span>
          <span
            className={styles.cartBadge}
            aria-label={`${totalItems} items in cart`}
          >
            {totalItems}
          </span>
        </Link>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          <span></span> <span></span>
        </button>
        <div
          className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        >
          <ul>
            <li>
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? styles.mobileActive : ""
                }
              >
                Home <span>01</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? styles.mobileActive : ""
                }
              >
                Shop <span>02</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? styles.mobileActive : ""
                }
              >
                Cart <span>03</span>
              </NavLink>
            </li>
          </ul>
          <div className={styles.mobileMenuFooter}>
            <span>SHOPLY</span> <span>Simple shopping.</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Navbar;
