import { Button } from "@/components/ui/button";
import type { ApiItem } from "@/types";


interface ItemCardProps {
  item: ApiItem;
  onSelect: (item: ApiItem) => void;
  variant?: "default" | "compact";
}


function ItemCard({
  item,
  onSelect,
  variant = "default",
}: ItemCardProps) {

  const isCompact = variant === "compact";


  return (
    <div
      className="
        rounded-lg
        border
        border-border
        bg-card
        p-5
        shadow-sm
      "
    >

      <h3 className="text-lg font-bold text-foreground">
        {item.name}
      </h3>


      {!isCompact && (
        <p className="mt-2 text-muted-foreground">
          {item.description}
        </p>
      )}


      <p className="mt-2 text-sm text-muted-foreground">
        Location: {item.location}
      </p>


      <p className="text-sm text-muted-foreground">
        Status: {item.status}
      </p>


      <Button
        onClick={() => onSelect(item)}
        className="mt-4"
      >
        View Item
      </Button>


    </div>
  );
}


export default ItemCard;