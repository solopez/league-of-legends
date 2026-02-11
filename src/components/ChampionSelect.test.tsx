import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ChampionSelect from "./ChampionSelect";

vi.mock("./championData", () => ({
  default: {
    Caitlyn: { history: "Test history", abilities: ["Q", "W", "E", "R"] },
    Jinx: { history: "Test history", abilities: ["Q", "W", "E", "R"] },
  },
}));

vi.mock("../assets/logo.png", () => ({
  default: "logo.png",
}));

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <ChampionSelect />
    </BrowserRouter>,
  );
};

describe("ChampionSelect", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title", () => {
    renderComponent();
    expect(screen.getByText("SELECT YOUR CHAMPION!")).toBeInTheDocument();
  });

  it("renders logo with correct link", () => {
    renderComponent();
    const logo = screen.getByAltText("Home");
    expect(logo).toBeInTheDocument();
  });

  it("renders all champion cards", () => {
    renderComponent();
    const champImages = screen.getAllByRole("img");
    expect(champImages.length).toBeGreaterThan(20);
  });

  it("displays ChampionCard when champion is clicked", () => {
    renderComponent();
    const caitlynImg = screen.getByTitle("Caitlyn");
    fireEvent.click(caitlynImg.closest("div")!);
    expect(screen.getByText("Test history")).toBeInTheDocument();
  });

  it("handles image error by changing src to jpg", () => {
    renderComponent();
    const img = screen.getByTitle("Caitlyn") as HTMLImageElement;
    fireEvent.error(img);
    expect(img.src).toContain(".jpg");
  });

  it("constructs correct image URL for champion names with spaces", () => {
    renderComponent();
    const xinZhaoImg = screen.getByTitle("Xin Zhao") as HTMLImageElement;
    expect(xinZhaoImg.src).toContain("xin-zhao");
  });
});
