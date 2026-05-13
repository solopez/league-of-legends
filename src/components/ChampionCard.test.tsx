import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ChampionCard from "./ChampionCard";

vi.mock("framer-motion", () => ({
  motion: {
    button: ({ children, onClick, style, className }: React.HTMLAttributes<HTMLButtonElement> & { onClick?: () => void }) => (
      <button onClick={onClick} style={style} className={className}>{children}</button>
    ),
    span: ({ children, style, className }: React.HTMLAttributes<HTMLSpanElement>) => (
      <span style={style} className={className}>{children}</span>
    ),
  },
}));

const defaultProps = {
  ddId: "Ahri",
  name: "Ahri",
  selected: false,
  onClick: vi.fn(),
  index: 0,
};

describe("ChampionCard", () => {
  test("renders the champion name", () => {
    render(<ChampionCard {...defaultProps} />);
    expect(screen.getByText(/Ahri/i)).toBeInTheDocument();
  });

  test("renders the champion portrait image", () => {
    render(<ChampionCard {...defaultProps} />);
    const portraits = screen.getAllByAltText(/Ahri/i);
    expect(portraits.length).toBeGreaterThan(0);
  });

  test("does not show selected indicator when not selected", () => {
    render(<ChampionCard {...defaultProps} selected={false} />);
    expect(screen.queryByText("✦")).not.toBeInTheDocument();
  });

  test("shows selected indicator when selected", () => {
    render(<ChampionCard {...defaultProps} selected={true} />);
    expect(screen.getByText("✦")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<ChampionCard {...defaultProps} onClick={onClick} />);
    screen.getByText(/Ahri/i).closest("button")?.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
