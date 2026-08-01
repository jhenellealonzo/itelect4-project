import type { Items } from "../types";

interface ItemCardProps {
  item: Items;
  onSelect: (item: Items) => void;
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
        border-gray-200
        bg-white
        p-5
        shadow-sm
        dark:bg-gray-800
        dark:border-gray-700
      "
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {item.name}
      </h3>

      {!isCompact && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {item.description}
        </p>
      )}

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Location: {item.location}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Status: {item.status}
      </p>

      <button
        onClick={() => onSelect(item)}
        className="
          mt-4
          rounded
          bg-blue-600
          px-3
          py-1.5
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-blue-700
        "
      >
        View Item
      </button>
    </div>
  );
}

export default ItemCard;