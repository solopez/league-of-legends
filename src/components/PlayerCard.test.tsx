import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PlayerCard from "./PlayerCard";

vi.mock("../components/Model3D", () => ({
  default: ({
    src,
    width,
    height,
  }: {
    src: string;
    width: string;
    height: string;
  }) => (
    <div
      data-testid="model-3d"
      data-src={src}
      data-width={width}
      data-height={height}
    >
      Model3D Component
    </div>
  ),
}));

vi.mock("../assets/avatar.png", () => ({
  default: "mocked-avatar.png",
}));

describe("PlayerCard", () => {
  const defaultProps = {
    nick: "TestPlayer",
    description: "A skilled player",
    modelSource: "/models/player.glb",
  };

  it("renders the player card component", () => {
    render(<PlayerCard {...defaultProps} />);
    expect(screen.getByText("TestPlayer")).toBeInTheDocument();
  });

  it("displays the player nick", () => {
    render(<PlayerCard {...defaultProps} />);
    expect(screen.getByText("TestPlayer")).toBeInTheDocument();
  });

  it("displays the player description", () => {
    render(<PlayerCard {...defaultProps} />);
    expect(screen.getByText("A skilled player")).toBeInTheDocument();
  });

  it("renders the crown icon", () => {
    const { container } = render(<PlayerCard {...defaultProps} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the Model3D component with correct props", () => {
    render(<PlayerCard {...defaultProps} />);
    const model3d = screen.getByTestId("model-3d");
    expect(model3d).toHaveAttribute("data-src", "/models/player.glb");
    expect(model3d).toHaveAttribute("data-width", "250px");
    expect(model3d).toHaveAttribute("data-height", "250px");
  });

  it("renders the avatar image", () => {
    const { container } = render(<PlayerCard {...defaultProps} />);
    const avatarImg = container.querySelector('img[alt="Player avatar"]');
    expect(avatarImg).toBeInTheDocument();
  });
});
