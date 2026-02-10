import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
    it("renders header element", () => {
        render(<Header />);
        const header = screen.getByRole("banner");
        expect(header).toBeInTheDocument();
    });

    it("renders title text", () => {
        render(<Header />);
        expect(screen.getByText("GI · URFAR · Aleatorio")).toBeInTheDocument();
    });

    it("applies correct CSS classes to header", () => {
        render(<Header />);
        const header = screen.getByRole("banner");
        expect(header).toHaveClass(
            "flex",
            "items-center",
            "gap-2",
            "px-6",
            "py-3",
            "bg-bottom-bar",
            "border-b",
            "border-gold/20"
        );
    });

    it("renders Info icon with correct styling", () => {
        render(<Header />);
        const header = screen.getByRole("banner");
        const infoIcon = header.querySelector("svg:last-child");
        expect(infoIcon).toHaveClass("cursor-pointer");
    });
});