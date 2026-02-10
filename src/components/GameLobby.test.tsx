import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import GameLobby from "./GameLobby";

vi.mock("./Header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock("./PlayerSlots", () => ({
  default: () => <div data-testid="player-slots">PlayerSlots</div>,
}));

vi.mock("./SearchButton", () => ({
  default: ({ onClick }: { onClick: () => void }) => (
    <button data-testid="search-button" onClick={onClick}>
      Search
    </button>
  ),
}));

vi.mock("./Loading", () => ({
  default: () => <div data-testid="loading">Loading</div>,
}));

vi.mock("../assets/lobby-bg.png", () => ({
  default: "/mocked-lobby-bg.png",
}));

const renderGameLobby = () => {
  return render(
    <BrowserRouter>
      <GameLobby />
    </BrowserRouter>,
  );
};

describe("GameLobby", () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("should render lobby components on initial load", () => {
    renderGameLobby();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("player-slots")).toBeInTheDocument();
    expect(screen.getByTestId("search-button")).toBeInTheDocument();
  });

  it("should render lobby background image", () => {
    renderGameLobby();

    const img = screen.getByAltText("Lobby background");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/mocked-lobby-bg.png");
  });
});
