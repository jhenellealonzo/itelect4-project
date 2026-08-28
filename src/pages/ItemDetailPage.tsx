import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

import type { ApiItem } from "../types/index";
import ItemCard from "../components/ItemCard";
import { fetchItemById } from "../api/client";

function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery<ApiItem>({
    queryKey: ["items", id],
    queryFn: () => fetchItemById(id!),
    enabled: id !== undefined,
  });

  if (isPending) {
    return (
      <div className="animate-pulse p-6">
        Loading item...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Item Details
      </h2>

      <div className="max-w-sm">
        <ItemCard
          item={data}
          onSelect={() => { }}
          variant="default"
        />
      </div>

      <Button
        onClick={() => navigate("/items")}
        className="mt-4"
      >
        Back to Items
      </Button>
    </div>
  );
}

export default ItemDetailPage;