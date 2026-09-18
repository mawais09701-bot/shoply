import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import App from "./App.jsx";

vi.mock("./components/navbar/Navbar.jsx", () => ({
  default: () => <nav aria-label="Mock navbar">Navbar</nav>,
}));

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");

  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Outlet content</div>,
  };
});

describe("App", () => {
  it("renders the navbar", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("navigation", { name: "Mock navbar" }),
    ).toBeInTheDocument();
  });

  it("renders the routed page content through the outlet", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("outlet")).toBeInTheDocument();
    expect(screen.getByText("Outlet content")).toBeInTheDocument();
  });

  it("renders both the navbar and outlet content", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("navigation", { name: "Mock navbar" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Outlet content")).toBeInTheDocument();
  });
});