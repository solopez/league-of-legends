import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders the footer element", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("displays the modelviewer.lol link", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /modelviewer\.lol/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://modelviewer.lol/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("displays the copyright disclaimer text", () => {
    render(<Footer />);
    expect(screen.getByText(/Models provided by/)).toBeInTheDocument();
    expect(screen.getByText(/League of Legends/)).toBeInTheDocument();
    expect(
      screen.getByText(/I do not own any rights to the game/)
    ).toBeInTheDocument();
  });

  it("applies correct styling classes to footer", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass(
      "bg-bottom-bar",
      "border-t",
      "border-gold/20",
      "fixed",
      "bottom-0",
      "left-0",
      "w-full"
    );
  });
});