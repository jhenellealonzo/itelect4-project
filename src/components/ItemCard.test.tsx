import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ItemCard from "./ItemCard";
import type { ApiItem } from "../types";

describe("ItemCard", () => {
  it("renders the item's status and updates the visible status when the prop changes", () => {
    const item: ApiItem = {
      id: "item-1",
      name: "Blue tumbler",
      description: "Blue insulated tumbler with a silver lid.",
      location: "Library",
      dateLost: "2026-10-20T08:00:00.000Z",
      status: "lost",
      ownerId: "user-1",
    };
    const onSelect = vi.fn();

    const { rerender } = render(
      <ItemCard item={item} onSelect={onSelect} />,
    );

    expect(screen.getByRole("heading", { name: "Blue tumbler" })).toBeInTheDocument();
    expect(screen.getByText("Status: lost")).toBeInTheDocument();

    rerender(
      <ItemCard item={{ ...item, status: "found" }} onSelect={onSelect} />,
    );

    expect(screen.getByText("Status: found")).toBeInTheDocument();
    expect(screen.queryByText("Status: lost")).not.toBeInTheDocument();
  });
});
