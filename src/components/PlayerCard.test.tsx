import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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
    />
  ),
}));

vi.mock("../assets/ashe.png", () => ({ default: "ashe.png" }));
vi.mock("../assets/avatar.png", () => ({ default: "avatar.png" }));
vi.mock("../assets/cait.png", () => ({ default: "cait.png" }));

describe("PlayerCard", () => {
  const defaultProps = {
    nick: "TestPlayer",
    description: "Professional player",
    modelSource: "/test_model.glb",
  };

  it("renders player card with nick and description", () => {
    render(<PlayerCard {...defaultProps} />);

    expect(screen.getByText("TestPlayer")).toBeInTheDocument();
    expect(screen.getByText("Professional player")).toBeInTheDocument();
  });

  it("renders avatar image with correct alt text", () => {
    render(<PlayerCard {...defaultProps} />);

    const avatarImg = screen.getByAltText("Player avatar");
    expect(avatarImg).toBeInTheDocument();
  });

  it("renders Model3D component with correct props", () => {
    render(<PlayerCard {...defaultProps} />);

    const model3d = screen.getByTestId("model-3d");
    expect(model3d).toHaveAttribute("data-src", "/test_model.glb");
    expect(model3d).toHaveAttribute("data-width", "400px");
    expect(model3d).toHaveAttribute("data-height", "400px");
  });

  it("renders Caitlyn image when modelSource is firecracker_caitlyn", () => {
    render(
      <PlayerCard {...defaultProps} modelSource="/firecracker_caitlyn.glb" />,
    );

    const playerImg = screen.getByAltText("Player");
    expect(playerImg).toHaveAttribute("src", expect.stringContaining("cait"));
  });

  it("renders Ashe image when modelSource is not firecracker_caitlyn", () => {
    render(<PlayerCard {...defaultProps} modelSource="/other_model.glb" />);

    const playerImg = screen.getByAltText("Player");
    expect(playerImg).toHaveAttribute("src", expect.stringContaining("ashe"));
  });

  it("renders Crown icon", () => {
    const { container } = render(<PlayerCard {...defaultProps} />);

    const crownIcon = container.querySelector("svg");
    expect(crownIcon).toBeInTheDocument();
  });

  it("applies hidden class for non-lg screens", () => {
    const { container } = render(<PlayerCard {...defaultProps} />);

    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass("hidden", "lg:block");
  });
});
