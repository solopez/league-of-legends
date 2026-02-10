import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GameLobby from "./GameLobby";

vi.mock("./Header", () => ({
    default: () => <div data-testid="header">Header</div>,
}));

vi.mock("./PlayerSlots", () => ({
    default: ({ players }: { players: unknown[] }) => (
        <div data-testid="player-slots">{players.length} players</div>
    ),
}));

vi.mock("./Footer", () => ({
    default: ({ setShowWallpaper }: { setShowWallpaper: unknown }) => (
        <div data-testid="footer">Footer</div>
    ),
}));

vi.mock("./Loading", () => ({
    default: ({ setShowWallpaper }: { setShowWallpaper: unknown }) => (
        <div data-testid="loading">Loading</div>
    ),
}));

describe("GameLobby", () => {
    it("renders header, player slots, and footer initially", () => {
        render(<GameLobby />);
        expect(screen.getByTestId("header")).toBeInTheDocument();
        expect(screen.getByTestId("player-slots")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    it("renders lobby background image", () => {
        render(<GameLobby />);
        const img = screen.getByAltText("Lobby background");
        expect(img).toBeInTheDocument();
    });

    it("passes 2 players to PlayerSlots component", () => {
        render(<GameLobby />);
        expect(screen.getByText("2 players")).toBeInTheDocument();
    });

    it("renders container with correct classes", () => {
        const { container } = render(<GameLobby />);
        const div = container.querySelector(".container.mx-auto.relative");
        expect(div).toBeInTheDocument();
    });
});