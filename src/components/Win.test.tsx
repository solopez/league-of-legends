import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Win from "./Win";

describe("Win Component", () => {
  it("should render the component", () => {
    render(<Win />);
    const container = screen.getByRole("img", { name: /Logo LoL/i });
    expect(container).toBeInTheDocument();
  });

  it("should display victory text", () => {
    render(<Win />);
    const victoryText = screen.getByText("VICTORY");
    expect(victoryText).toBeInTheDocument();
  });

  it("should have correct logo alt text", () => {
    render(<Win />);
    const logoImg = screen.getByAltText("Logo LoL");
    expect(logoImg).toBeInTheDocument();
  });

  it("should apply correct styling classes to main container", () => {
    render(<Win />);
    const container =
      screen.getByAltText("Logo LoL").parentElement?.parentElement;
    expect(container?.className).toContain("fixed");
    expect(container?.className).toContain("cursor-pointer");
  });

  it("should display victory text with correct styling", () => {
    render(<Win />);
    const victorySpan = screen.getByText("VICTORY").parentElement;
    expect(victorySpan?.className).toContain("text-yellow-400");
    expect(victorySpan?.className).toContain("tracking-widest");
  });
});
