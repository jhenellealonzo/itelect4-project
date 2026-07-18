import type { Items } from "../types";

interface ItemCardProps {
  item: Items;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="item-card">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Location: {item.location}</p>
      <p>Status: {item.status}</p>
    </div>
  );
}

export default ItemCard;