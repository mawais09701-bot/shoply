import { Link } from "react-router";
import styles from "./Home.module.css";

function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>WELCOME TO SHOPLY</p>

          <h1>
            Shopping made
            <span> simple.</span>
          </h1>

          <p className={styles.heroText}>
            Discover products you'll love, explore new collections, and find
            everything you need in one simple shopping experience.
          </p>

          <div className={styles.heroActions}>
            <Link to="/shop" className={styles.primaryButton}>
              Explore the shop
              <span aria-hidden="true">→</span>
            </Link>

            <a href="#about" className={styles.secondaryButton}>
              Discover Shoply
            </a>
          </div>

          <div className={styles.heroStats}>
            <div>
              <strong>500+</strong>
              <span>Products</span>
            </div>

            <div>
              <strong>20+</strong>
              <span>Categories</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Shopping</span>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroImageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85"
              alt="Minimal wristwatch displayed as a shopping product"
            />
          </div>

          <div className={styles.floatingCard}>
            <span className={styles.floatingIcon}>✦</span>

            <div>
              <strong>Fresh finds</strong>
              <p>New products every day</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className={styles.about}>
        <div className={styles.aboutImage}>
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85"
            alt="Modern shopping store interior"
          />
        </div>

        <div className={styles.aboutContent}>
          <p className={styles.eyebrow}>ABOUT SHOPLY</p>

          <h2>
            More than a store.
            <span>A simpler way to shop.</span>
          </h2>

          <p>
            Shoply is built around one simple idea: shopping shouldn't feel
            complicated.
          </p>

          <p>
            Explore a carefully organized collection of products, discover
            something new, and add your favorites to your cart without getting
            lost in a complicated shopping experience.
          </p>

          <Link to="/shop" className={styles.textLink}>
            Start exploring
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className={styles.categories}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>EXPLORE COLLECTIONS</p>

            <h2>Something for everyone.</h2>
          </div>

          <Link to="/shop" className={styles.viewAll}>
            View all products →
          </Link>
        </div>

        <div className={styles.categoryGrid}>
          <article className={styles.categoryCard}>
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=85"
              alt="Fashion clothing"
            />

            <div className={styles.categoryOverlay}>
              <p>01</p>
              <h3>Fashion</h3>
              <span>Explore collection →</span>
            </div>
          </article>

          <article className={styles.categoryCard}>
            <img
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=85"
              alt="Modern electronic devices"
            />

            <div className={styles.categoryOverlay}>
              <p>02</p>
              <h3>Electronics</h3>
              <span>Explore collection →</span>
            </div>
          </article>

          <article className={styles.categoryCard}>
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85"
              alt="Modern home interior"
            />

            <div className={styles.categoryOverlay}>
              <p>03</p>
              <h3>Home & Living</h3>
              <span>Explore collection →</span>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.sectionHeaderCenter}>
          <p className={styles.eyebrow}>THE SHOPLY EXPERIENCE</p>

          <h2>Designed around you.</h2>

          <p>
            Everything you need for a smooth and enjoyable shopping experience.
          </p>
        </div>

        <div className={styles.featureGrid}>
          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>◈</div>

            <h3>Curated products</h3>

            <p>
              Browse an organized collection that makes discovering products
              simple.
            </p>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>♡</div>

            <h3>Simple shopping</h3>

            <p>
              Find what you want quickly and add products to your cart with
              ease.
            </p>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>✦</div>

            <h3>Always discover</h3>

            <p>
              Explore different categories and discover products you didn't know
              you needed.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <p className={styles.eyebrow}>READY WHEN YOU ARE</p>

          <h2>Find something you'll love.</h2>

          <p>
            Take a look around Shoply and discover your next favorite product.
          </p>

          <Link to="/shop" className={styles.ctaButton}>
            Start shopping
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
