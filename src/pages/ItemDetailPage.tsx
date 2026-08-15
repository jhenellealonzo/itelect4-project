import { useParams, useNavigate } from "react-router";

import ItemCard from "../components/ItemCard";
import { allItems } from "../data/mockData";

function ItemDetailPage() {
  // Reads whatever is in the :id slot of the URL
  const { id } = useParams<{ id: string }>();

  // Used for navigation inside an event handler
  const navigate = useNavigate();

  // Find the item that matches the ID from the URL
  const item = allItems.find(
    (item) => item.id === Number(id)
  );

  // The URL is user input, so handle invalid IDs
  if (item === undefined) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        No item found with ID "{id}".
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {item.name}
      </h2>

      <div className="max-w-sm">
        <ItemCard
          item={item}
          onSelect={() => {}}
          variant="default"
        />
      </div>

      <button
        onClick={() => navigate("/items")}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Lost & Found
      </button>
    </div>
  );
}

export default ItemDetailPage;