import { beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ReviewForm } from "@/components/review/ReviewForm";

vi.mock("@/lib/supabase/client", () => ({ createClient: vi.fn() }));

beforeAll(() => {
  // jsdom has no scrolling layout; the keyboard handler still exercises it.
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: vi.fn(),
  });
});

const venues = [
  { id: "alpha", name: "Alpha Theater", slug: "alpha-theater" },
  { id: "beta", name: "Beta Museum", slug: "beta-museum" },
];

describe("Review form venue search", () => {
  it("clears the keyboard highlight when the search changes", () => {
    render(<ReviewForm venues={venues} />);
    const input = screen.getByRole("combobox", { name: /Venue/ });
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveAttribute("aria-activedescendant", "venue-option-0");

    fireEvent.change(input, { target: { value: "Beta" } });
    expect(input).not.toHaveAttribute("aria-activedescendant");
    expect(screen.getByRole("option", { name: "Beta Museum" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.queryByText("Selected: Beta Museum")).not.toBeInTheDocument();

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByText("Selected: Beta Museum")).toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-activedescendant");
  });

  it("clears an old selection when editing, and Escape closes the options", () => {
    render(<ReviewForm venues={venues} />);
    const input = screen.getByRole("combobox", { name: /Venue/ });
    fireEvent.focus(input);
    fireEvent.mouseDown(screen.getByRole("option", { name: "Alpha Theater" }));
    expect(screen.getByText("Selected: Alpha Theater")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Beta" } });
    expect(screen.queryByText("Selected: Alpha Theater")).not.toBeInTheDocument();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).not.toHaveAttribute("aria-activedescendant");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
