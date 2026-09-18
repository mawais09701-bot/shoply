import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Cart from "./Cart.jsx";
import { useCart } from "./useCart.js";

vi.mock("./useCart.js", () => ({
  useCart: vi.fn(),
}));

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 59.99,
    quantity: 2,
    image: "headphones.jpg",
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 89.5,
    quantity: 1,
    image: "watch.jpg",
  },
];

const updateQuantity = vi.fn();
const removeFromCart = vi.fn();
const clearCart = vi.fn();

function renderCart() {
  return render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>,
  );
}

describe("Cart", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useCart.mockReturnValue({
      cart: products,
      totalItems: 3,
      totalPrice: 209.48,
      updateQuantity,
      removeFromCart,
      clearCart,
    });
  });

  it("renders the empty cart state when the cart has no items", () => {
    useCart.mockReturnValue({
      cart: [],
      totalItems: 0,
      totalPrice: 0,
      updateQuantity,
      removeFromCart,
      clearCart,
    });

    renderCart();

    expect(
      screen.getByRole("heading", { name: "Your cart is empty" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Looks like you haven't added anything to your cart yet.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Start shopping" }),
    ).toHaveAttribute("href", "/shop");

    expect(
      screen.queryByRole("button", { name: "Clear cart" }),
    ).not.toBeInTheDocument();
  });

  it("renders the cart heading and item count", () => {
    renderCart();

    expect(
      screen.getByRole("heading", { name: "Your cart" }),
    ).toBeInTheDocument();

    expect(screen.getByText("3 items")).toBeInTheDocument();
  });

  it("uses singular item when there is one item", () => {
    useCart.mockReturnValue({
      cart: [products[0]],
      totalItems: 1,
      totalPrice: 59.99,
      updateQuantity,
      removeFromCart,
      clearCart,
    });

    renderCart();

    expect(screen.getByText("1 item")).toBeInTheDocument();
    expect(screen.queryByText("1 items")).not.toBeInTheDocument();
  });

  it("renders every cart item", () => {
    renderCart();

    expect(
      screen.getByRole("heading", { name: "Wireless Headphones" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Smart Watch" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: "Wireless Headphones" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: "Smart Watch" }),
    ).toBeInTheDocument();
  });

  it("displays each product's unit price", () => {
    renderCart();

    expect(screen.getByText("$59.99 each")).toBeInTheDocument();
    expect(screen.getByText("$89.50 each")).toBeInTheDocument();
  });

  it("displays each item's total price", () => {
    renderCart();

    expect(screen.getByText("$119.98")).toBeInTheDocument();
    expect(screen.getByText("$89.50")).toBeInTheDocument();
  });

  it("renders the correct quantities for cart items", () => {
    renderCart();

    const quantityInputs = screen.getAllByRole("spinbutton");

    expect(quantityInputs).toHaveLength(2);
    expect(quantityInputs[0]).toHaveValue(2);
    expect(quantityInputs[1]).toHaveValue(1);
  });

  it("updates the quantity of a cart item", () => {
    renderCart();

    const quantityInputs = screen.getAllByRole("spinbutton");

    fireEvent.change(quantityInputs[0], {
      target: { value: "4" },
    });

    expect(updateQuantity).toHaveBeenCalledWith(1, 4);
  });

  it("removes the correct product from the cart", async () => {
    const user = userEvent.setup();

    renderCart();

    const removeButton = screen.getByRole("button", {
      name: "Remove Wireless Headphones from cart",
    });

    await user.click(removeButton);

    expect(removeFromCart).toHaveBeenCalledWith(1);
  });

  it("removes the other correct product from the cart", async () => {
    const user = userEvent.setup();

    renderCart();

    const removeButton = screen.getByRole("button", {
      name: "Remove Smart Watch from cart",
    });

    await user.click(removeButton);

    expect(removeFromCart).toHaveBeenCalledWith(2);
  });

  it("clears the cart when Clear cart is clicked", async () => {
    const user = userEvent.setup();

    renderCart();

    await user.click(screen.getByRole("button", { name: "Clear cart" }));

    expect(clearCart).toHaveBeenCalledTimes(1);
  });

  it("renders the order summary", () => {
    renderCart();

    expect(
      screen.getByRole("heading", { name: "Order summary" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Items")).toBeInTheDocument();
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Free")).toBeInTheDocument();
  });

  it("displays the correct order totals", () => {
    renderCart();

    const summary = screen.getByRole("complementary");

    expect(summary).toHaveTextContent("3");
    expect(summary).toHaveTextContent("$209.48");
    expect(summary).toHaveTextContent("Free");
  });

  it("renders the checkout button", () => {
    renderCart();

    expect(
      screen.getByRole("button", { name: "Proceed to checkout" }),
    ).toBeInTheDocument();
  });

  it("links Start shopping to the shop page in the empty cart", () => {
    useCart.mockReturnValue({
      cart: [],
      totalItems: 0,
      totalPrice: 0,
      updateQuantity,
      removeFromCart,
      clearCart,
    });

    renderCart();

    expect(
      screen.getByRole("link", { name: "Start shopping" }),
    ).toHaveAttribute("href", "/shop");
  });

  it("links Continue shopping to the shop page", () => {
    renderCart();

    expect(
      screen.getByRole("link", { name: "Continue shopping" }),
    ).toHaveAttribute("href", "/shop");
  });
});
