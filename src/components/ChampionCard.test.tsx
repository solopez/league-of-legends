import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ChampionCard from "./ChampionCard";

const mockChampion = {
  id: 1,
  name: "Ahri",
  image: "ahri-image.jpg",
  description: "A magical champion",
};

vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}));

describe("ChampionCard", () => {
  test("should render the champion card with name and image", () => {
    render(<ChampionCard champ={mockChampion} />);

    const imageElement = screen.getByAltText(/Ahri/i);
    const nameElement = screen.getByText(/Ahri/i);

    expect(imageElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
  });

  test("should show the modal when clicked on the card", () => {
    render(<ChampionCard champ={mockChampion} />);

    fireEvent.click(screen.getByAltText(/Ahri/i));

    const modalElement = screen.getByText(/A magical champion/i);
    expect(modalElement).toBeInTheDocument();
  });
});
