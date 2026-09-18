import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import Home from "./Home.jsx";

describe("Home", () => {
  const renderHome = () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
  };

  it("renders the hero content", () => {
    renderHome();

    expect(
      screen.getByText("Shopping made", { exact: false }).closest("h1"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/discover products you'll love/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /explore the shop/i }),
    ).toBeInTheDocument();
  });

  it("provides the expected shopping statistics", () => {
    renderHome();

    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("20+")).toBeInTheDocument();
    expect(screen.getByText("24/7")).toBeInTheDocument();

    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("Shopping")).toBeInTheDocument();
  });

  it("renders the hero product image with accessible text", () => {
    renderHome();

    expect(
      screen.getByRole("img", {
        name: /minimal wristwatch displayed as a shopping product/i,
      }),
    ).toBeInTheDocument();
  });

  it("links users to the about section", () => {
    renderHome();

    expect(
      screen.getByRole("link", { name: /discover shoply/i }),
    ).toHaveAttribute("href", "#about");
  });

  it("renders the about section", () => {
    renderHome();

    expect(
      screen.getByRole("heading", {
        name: /More than a store\.\s*A simpler way to shop\./i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/shopping shouldn't feel complicated/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /start exploring/i }),
    ).toHaveAttribute("href", "/shop");
  });

  it("renders all product categories", () => {
    renderHome();

    expect(
      screen.getByRole("heading", { name: "Fashion" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Electronics" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Home & Living" }),
    ).toBeInTheDocument();
  });

  it("renders category images with accessible descriptions", () => {
    renderHome();

    expect(
      screen.getByRole("img", { name: /fashion clothing/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: /modern electronic devices/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: /modern home interior/i }),
    ).toBeInTheDocument();
  });

  it("provides links to browse all products", () => {
    renderHome();

    const productLinks = screen.getAllByRole("link", {
      name: /view all products/i,
    });

    expect(productLinks).toHaveLength(1);
    expect(productLinks[0]).toHaveAttribute("href", "/shop");
  });

  it("renders the Shoply experience features", () => {
    renderHome();

    expect(
      screen.getByRole("heading", { name: /designed around you/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Curated products" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Simple shopping" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Always discover" }),
    ).toBeInTheDocument();
  });

  it("renders the final call to action", () => {
    renderHome();

    expect(
      screen.getByRole("heading", { name: /find something you'll love/i }),
    ).toBeInTheDocument();

    const shoppingLink = screen.getByRole("link", {
      name: /start shopping/i,
    });

    expect(shoppingLink).toHaveAttribute("href", "/shop");
  });

  it("contains all shop links pointing to the shop page", () => {
    renderHome();

    const shopLinks = screen.getAllByRole("link", {
      name: /explore the shop|start exploring|view all products|start shopping/i,
    });

    expect(shopLinks).toHaveLength(4);

    shopLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/shop");
    });
  });
});
