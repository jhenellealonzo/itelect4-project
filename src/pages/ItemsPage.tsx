import { useRef } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

import type { ApiItem } from "../types/index";
import ItemCard from "../components/ItemCard";
import { usePrevious } from "../hooks/usePrevious";
import useUiStore from "../store/uiStore";
import { fetchItems } from "../api/client";

function ItemsPage() {
  // React Query now handles loading, errors, and API data.
  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery<ApiItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  // Search term now belongs to the shared UI store.
  const searchTerm = useUiStore(
    (state) => state.searchTerm
  );

  const setSearchTerm = useUiStore(
    (state) => state.setSearchTerm
  );

  const searchInputRef = useRef<HTMLInputElement>(null);

  const previousSearch = usePrevious(searchTerm);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  // React Query has not finished loading yet.
  if (isPending) {
    return (
      <div className="animate-pulse p-6">
        Loading lost and found items...
      </div>
    );
  }

  // The API request failed.
  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message} -- is json-server running on port 3001?
      </div>
    );
  }

  // After the two early returns above,
  // TypeScript knows that data is ApiItem[].
  const filteredItems = data.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.location
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Lost & Found Items
      </h2>

      <input
        ref={searchInputRef}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search lost and found items..."
        className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 placeholder:text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
      />

      {previousSearch !== undefined &&
        previousSearch !== searchTerm && (
          <p className="mt-1 text-sm text-gray-500">
            Previous search: "{previousSearch}"
          </p>
        )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            to={`/items/${item.id}`}
          >
            <ItemCard
              item={item}
              onSelect={() => {}}
              variant="default"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ItemsPage;