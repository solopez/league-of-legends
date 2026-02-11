import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import PlayerSlots from "./PlayerSlots";

vi.useFakeTimers();

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("./EmptySlot", () => ({
  default: () => <div data-testid="empty-slot">EmptySlot</div>,
}));

vi.mock("./Loading", () => ({
  default: () => <div data-testid="loading">Loading</div>,
}));

vi.mock("./PlayerCard", () => ({
  default: ({ nick }: { nick: string }) => (
    <div data-testid={`player-card-${nick}`}>PlayerCard: {nick}</div>
  ),
}));

vi.mock("./SearchButton", () => ({
  default: ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button onClick={onClick} data-testid="search-button">
      {label}
    </button>
  ),
}));

describe("PlayerSlots", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render empty slots and search button initially", () => {
    render(
      <BrowserRouter>
        <PlayerSlots players={[]} />
      </BrowserRouter>,
    );

    expect(screen.getAllByTestId("empty-slot")).toHaveLength(2);
    expect(screen.getByTestId("search-button")).toBeInTheDocument();
  });

  it("should render player cards for each player", () => {
    const players = [
      {
        nick: "Player1",
        description: "Desc1",
        modelSource: "source1",
      },
      {
        nick: "Player2",
        description: "Desc2",
        modelSource: "source2",
      },
    ];

    render(
      <BrowserRouter>
        <PlayerSlots players={players} />
      </BrowserRouter>,
    );

    expect(screen.getByTestId("player-card-Player1")).toBeInTheDocument();
    expect(screen.getByTestId("player-card-Player2")).toBeInTheDocument();
  });

  it("should navigate after 2 seconds when search button is clicked", () => {
    const mockNavigate = vi.fn(); 
    const user = userEvent.setup({ delay: null });

    render(
      <BrowserRouter>
        <PlayerSlots players={[]} />
      </BrowserRouter>,
    );

    const searchButton = screen.getByTestId("search-button");

    
    user.click(searchButton);

    
    vi.advanceTimersByTime(2000); 

    
    waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/champion-select");
    });
  });
});
