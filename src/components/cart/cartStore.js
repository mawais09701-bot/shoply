const STORAGE_KEY = "shoply-cart";

let cart = loadCart();
const listeners = new Set();

function loadCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function notify() {
  saveCart();

  listeners.forEach((listener) => {
    listener();
  });
}

export function getCart() {
  return cart;
}

export function subscribe(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function addToCart(product, quantity = 1) {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    cart = cart.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + quantity,
          }
        : item,
    );
  } else {
    cart = [
      ...cart,
      {
        ...product,
        quantity,
      },
    ];
  }

  notify();
}

export function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  cart = cart.map((item) =>
    item.id === productId
      ? {
          ...item,
          quantity,
        }
      : item,
  );

  notify();
}

export function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);

  notify();
}

export function clearCart() {
  cart = [];

  notify();
}
