import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ChampionSelect from "./ChampionSelect";
import championData from "../models/ChampionData";

vi.mock("./ChampionCard", () => ({
  default: ({ champ }: any) => (
    <div data-testid={`champion-card-${champ.id}`}>{champ.name}</div>
  ),
}));

describe("ChampionSelect", () => {
  it("renders the component with title", () => {
    render(<ChampionSelect />);
    expect(screen.getByText("SELECT YOUR CHAMPION")).toBeInTheDocument();
  });

  it("renders all champions from championData", () => {
    render(<ChampionSelect />);
    const championCount = Object.keys(championData).length;
    const championCards = screen.getAllByTestId(/^champion-card-/);
    expect(championCards).toHaveLength(championCount);
  });

  it("builds champion objects with correct structure", () => {
    render(<ChampionSelect />);
    const firstChampion = Object.keys(championData)[0];
    expect(screen.getByText(firstChampion)).toBeInTheDocument();
  });

  it("renders background image", () => {
    render(<ChampionSelect />);
    const backgroundImage = screen.getByAltText("Background");
    expect(backgroundImage).toHaveAttribute(
      "src",
      "/league-of-legends/images/select.jpg",
    );
  });

  it("applies correct CSS classes for layout", () => {
    const { container } = render(<ChampionSelect />);
    const mainContainer = container.querySelector(".min-h-screen");
    expect(mainContainer).toBeInTheDocument();
  });
});
