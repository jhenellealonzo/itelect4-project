import type { MouseEvent } from "react";
import type { Items } from "../types";

interface ItemCardProps {
  item: Items;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
}

function ItemCard({ item, onSelect }: ItemCardProps) {
  return (
    <div className="item-card">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Location: {item.location}</p>
      <p>Status: {item.status}</p>

      <button onClick={onSelect}>
        View Item
      </button>
    </div>
  );
}

export default ItemCard;