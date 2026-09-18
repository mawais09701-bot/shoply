import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Shop from "./Shop.jsx";
import { useCart } from "../cart/useCart.js";
import useProducts from "../../hooks/useProducts.js";

vi.mock("../cart/useCart.js", () => ({
  useCart: vi.fn(),
}));

vi.mock("../../hooks/useProducts.js", () => ({
  default: vi.fn(),
}));

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    description: "High quality wireless headphones.",
    price: 59.99,
    image: "headphones.jpg",
  },
  {
    id: 2,
    title: "Smart Watch",
    description: "A modern smartwatch.",
    price: 89.5,
    image: "watch.jpg",
  },
];

const addToCart = vi.fn();

function renderShop() {
  return render(<Shop />);
}

describe("Shop", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useCart.mockReturnValue({
      addToCart,
    });

    useProducts.mockReturnValue({
      products,
      loading: false,
      error: null,
    });
  });

  it("renders the shop heading", () => {
    renderShop();

    expect(
      screen.getByRole("heading", { name: "Shop all products" }),
    ).toBeInTheDocument();
  });

  it("shows the correct number of products", () => {
    renderShop();

    expect(screen.getByText("2 products")).toBeInTheDocument();
  });

  it("renders all products", () => {
    renderShop();

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

  it("displays product prices with two decimal places", () => {
    renderShop();

    expect(screen.getByText("$59.99")).toBeInTheDocument();
    expect(screen.getByText("$89.50")).toBeInTheDocument();
  });

  it("renders quantity inputs with a default value of 1", () => {
    renderShop();

    const quantityInputs = screen.getAllByRole("spinbutton");

    expect(quantityInputs).toHaveLength(2);
    expect(quantityInputs[0]).toHaveValue(1);
    expect(quantityInputs[1]).toHaveValue(1);
  });

  it("renders an add to cart button for every product", () => {
    renderShop();

    expect(screen.getAllByRole("button", { name: "Add to cart" })).toHaveLength(
      products.length,
    );
  });

  it("changes the quantity for a product", () => {
    renderShop();

    const quantityInput = screen.getAllByRole("spinbutton")[0];

    fireEvent.change(quantityInput, {
      target: { value: "3" },
    });

    expect(quantityInput).toHaveValue(3);
  });

  it("uses quantity 1 when an invalid quantity is entered", () => {
    renderShop();

    const quantityInput = screen.getAllByRole("spinbutton")[0];

    fireEvent.change(quantityInput, {
      target: { value: "0" },
    });

    expect(quantityInput).toHaveValue(1);
  });

  it("adds a product to the cart with the default quantity", async () => {
    const user = userEvent.setup();

    renderShop();

    const addButtons = screen.getAllByRole("button", {
      name: "Add to cart",
    });

    await user.click(addButtons[0]);

    expect(addToCart).toHaveBeenCalledWith(products[0], 1);
  });

  it("adds a product to the cart with the selected quantity", async () => {
    const user = userEvent.setup();

    renderShop();

    const quantityInput = screen.getAllByRole("spinbutton")[0];

    fireEvent.change(quantityInput, {
      target: { value: "4" },
    });

    expect(quantityInput).toHaveValue(4);

    const addButtons = screen.getAllByRole("button", {
      name: "Add to cart",
    });

    await user.click(addButtons[0]);

    expect(addToCart).toHaveBeenCalledWith(products[0], 4);
  });

  it("shows the loading state", () => {
    useProducts.mockReturnValue({
      products: [],
      loading: true,
      error: null,
    });

    renderShop();

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  it("shows the error state", () => {
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: new Error("Failed to fetch products"),
    });

    renderShop();

    expect(screen.getByRole("alert")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Something went wrong" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("We couldn't load the products. Please try again."),
    ).toBeInTheDocument();
  });
});
