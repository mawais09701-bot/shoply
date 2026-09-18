import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Navbar from "./Navbar.jsx";
import { useCart } from "../cart/useCart.js";

vi.mock("../cart/useCart.js", () => ({
  useCart: vi.fn(),
}));

function renderNavbar(initialEntry = "/") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Navbar />
    </MemoryRouter>,
  );
}

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useCart.mockReturnValue({
      totalItems: 3,
    });
  });

  it("renders the Shoply logo", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: /shoply/i })).toBeInTheDocument();
  });

  it("links the logo to the home page", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: /shoply/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders the main navigation links", () => {
    renderNavbar();

    const navigation = screen.getByRole("navigation", {
      name: "Main navigation",
    });

    expect(navigation.querySelectorAll('a[href="/"]').length).toBeGreaterThan(
      0,
    );

    expect(
      navigation.querySelectorAll('a[href="/shop"]').length,
    ).toBeGreaterThan(0);

    expect(
      navigation.querySelectorAll('a[href="/cart"]').length,
    ).toBeGreaterThan(0);
  });

  it("renders the cart item count", () => {
    renderNavbar();

    expect(screen.getByLabelText("3 items in cart")).toBeInTheDocument();

    expect(screen.getByLabelText("3 items in cart")).toHaveTextContent("3");
  });

  it("links the cart button to the cart page", () => {
    renderNavbar();

    const cartLinks = screen.getAllByRole("link", { name: /cart/i });

    expect(
      cartLinks.some((link) => link.getAttribute("href") === "/cart"),
    ).toBe(true);
  });

  it("opens the mobile navigation menu", async () => {
    const user = userEvent.setup();

    renderNavbar();

    const menuButton = screen.getByRole("button", {
      name: "Open navigation menu",
    });

    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await user.click(menuButton);

    expect(
      screen.getByRole("button", {
        name: "Close navigation menu",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Close navigation menu",
      }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the mobile navigation menu when the menu button is clicked again", async () => {
    const user = userEvent.setup();

    renderNavbar();

    const openButton = screen.getByRole("button", {
      name: "Open navigation menu",
    });

    await user.click(openButton);

    const closeButton = screen.getByRole("button", {
      name: "Close navigation menu",
    });

    await user.click(closeButton);

    expect(
      screen.getByRole("button", {
        name: "Open navigation menu",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Open navigation menu",
      }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("renders the mobile menu links", () => {
    renderNavbar();

    expect(screen.getAllByRole("link", { name: /^Home/ })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: /^Shop/ })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: /^Cart/ })).toHaveLength(3);
  });

  it("closes the mobile menu when a mobile navigation link is clicked", async () => {
    const user = userEvent.setup();

    renderNavbar();

    await user.click(
      screen.getByRole("button", {
        name: "Open navigation menu",
      }),
    );

    const shopLinks = screen.getAllByRole("link", { name: /^Shop/ });

    const mobileShopLink = shopLinks[1];

    await user.click(mobileShopLink);

    expect(
      screen.getByRole("button", {
        name: "Open navigation menu",
      }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu when the logo is clicked", async () => {
    const user = userEvent.setup();

    renderNavbar();

    await user.click(
      screen.getByRole("button", {
        name: "Open navigation menu",
      }),
    );

    await user.click(screen.getByRole("link", { name: /shoply/i }));

    expect(
      screen.getByRole("button", {
        name: "Open navigation menu",
      }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("marks the home navigation link as active on the home page", () => {
    renderNavbar("/");

    const homeLinks = screen.getAllByRole("link", { name: /^Home/ });

    expect(homeLinks[0]).toHaveAttribute("aria-current", "page");
  });

  it("marks the shop navigation link as active on the shop page", () => {
    renderNavbar("/shop");

    const shopLinks = screen.getAllByRole("link", { name: /^Shop/ });

    expect(shopLinks[0]).toHaveAttribute("aria-current", "page");
  });

  it("marks the cart navigation link as active on the cart page", () => {
    renderNavbar("/cart");

    const cartLinks = screen.getAllByRole("link", { name: /^Cart/ });

    expect(cartLinks[0]).toHaveAttribute("aria-current", "page");
  });

  it("updates the cart badge when the cart count changes", () => {
    useCart.mockReturnValue({
      totalItems: 7,
    });

    renderNavbar();

    expect(screen.getByLabelText("7 items in cart")).toHaveTextContent("7");
  });
});
