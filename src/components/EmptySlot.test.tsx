import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EmptySlot from "./EmptySlot";

describe("EmptySlot", () => {
  it("should render a Plus icon from lucide-react", () => {
    const { container } = render(<EmptySlot />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("should have correct structure with flex layout", () => {
    const { container } = render(<EmptySlot />);
    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass("flex", "flex-col", "items-center", "gap-2");
  });

  it("should have circular border styling on inner div", () => {
    const { container } = render(<EmptySlot />);
    const innerDiv = container.querySelector(
      ".glow-gold-hover.w-20.h-20.rounded-full",
    );
    expect(innerDiv).toHaveClass(
      "border-2",
      "border-muted-foreground/40",
      "cursor-pointer",
    );
  });

  it("should have Plus icon with correct dimensions and classes", () => {
    const { container } = render(<EmptySlot />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("w-6", "h-6");
  });
});
