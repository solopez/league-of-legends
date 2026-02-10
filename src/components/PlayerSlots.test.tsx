import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PlayerSlots from "./PlayerSlots";

vi.mock("./EmptySlot", () => ({
  default: () => <div data-testid="empty-slot">Empty Slot</div>,
}));

vi.mock("./PlayerCard", () => ({
  default: ({ nick, description, modelSource }: any) => (
    <div data-testid={`player-card-${nick}`}>
      {nick} - {description} - {modelSource}
    </div>
  ),
}));

describe("PlayerSlots", () => {
  it("renders without crashing", () => {
    render(<PlayerSlots players={[]} />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders two EmptySlot components", () => {
    render(<PlayerSlots players={[]} />);
    const emptySlots = screen.getAllByTestId("empty-slot");
    expect(emptySlots).toHaveLength(2);
  });

  it("renders PlayerCard for each player", () => {
    const players = [
      { nick: "Player1", description: "desc1", modelSource: "source1" },
      { nick: "Player2", description: "desc2", modelSource: "source2" },
    ];
    render(<PlayerSlots players={players} />);
    expect(screen.getByTestId("player-card-Player1")).toBeInTheDocument();
    expect(screen.getByTestId("player-card-Player2")).toBeInTheDocument();
  });

  it("passes correct props to PlayerCard", () => {
    const players = [
      {
        nick: "TestPlayer",
        description: "Test Description",
        modelSource: "Test Source",
      },
    ];
    render(<PlayerSlots players={players} />);
    expect(
      screen.getByText(/TestPlayer - Test Description - Test Source/),
    ).toBeInTheDocument();
  });

  it("renders empty list when no players provided", () => {
    render(<PlayerSlots players={[]} />);
    expect(screen.getAllByTestId("empty-slot")).toHaveLength(2);
  });
});
