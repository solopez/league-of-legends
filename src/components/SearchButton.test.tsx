import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchButton from "./SearchButton";

describe("SearchButton", () => {
  it("renders button with correct label", () => {
    render(<SearchButton onClick={() => {}} label="Search" />);
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<SearchButton onClick={handleClick} label="Click me" />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("applies correct CSS classes", () => {
    render(<SearchButton onClick={() => {}} label="Test" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("glow-gold-btn", "px-12", "py-4");
  });
});
