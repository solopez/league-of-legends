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

describe("PlayerCard", () => {
  const defaultProps = {
    nick: "TestPlayer",
    description: "A skilled player",
    modelSource: "/models/player.glb",
    splashId: "Ashe",
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

  it("renders the Model3D component with correct src", () => {
    render(<PlayerCard {...defaultProps} />);
    const model3d = screen.getByTestId("model-3d");
    expect(model3d).toHaveAttribute("data-src", "/models/player.glb");
  });
});
