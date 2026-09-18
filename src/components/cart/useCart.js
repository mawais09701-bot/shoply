import { useSyncExternalStore } from "react";
import {
  getCart,
  subscribe,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "./cartStore";

export function useCart() {
  const cart = useSyncExternalStore(subscribe, getCart, getCart);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
}
