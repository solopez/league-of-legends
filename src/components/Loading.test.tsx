import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading Component", () => {
  it("should render the component", () => {
    render(<Loading />);
    expect(screen.getByAltText("Logo LoL")).toBeInTheDocument();
  });

  it("should display the LOADING text", () => {
    render(<Loading />);
    expect(screen.getByText("LOADING")).toBeInTheDocument();
  });

  it("should have the correct logo image", () => {
    render(<Loading />);
    const logo = screen.getByAltText("Logo LoL") as HTMLImageElement;
    expect(logo).toHaveClass("w-70", "h-70");
  });

  it("should render the progress bar container", () => {
    const { container } = render(<Loading />);
    const progressContainer = container.querySelector(".w-72.h-4");
    expect(progressContainer).toBeInTheDocument();
  });

  it("should render the progress bar fill with 65% width", () => {
    const { container } = render(<Loading />);
    const progressFill = container.querySelector(".progress");
    expect(progressFill).toHaveStyle({ width: "65%" });
  });

  it("should have full screen fixed positioning styles", () => {
    const { container } = render(<Loading />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass("fixed", "inset-0", "w-screen", "h-screen");
  });
});
