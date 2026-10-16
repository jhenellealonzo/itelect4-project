import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ApiClaim, ApiItem } from "../types";
import ClaimCard from "../components/ClaimCard";
import { createClaim, fetchClaims, fetchItems } from "../api/client";
import {
  claimSchema,
  type ClaimFormValues,
} from "../schemas/claimSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ClaimsPage() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClaimFormValues>({
    resolver: zodResolver(claimSchema),
    mode: "onBlur",
    defaultValues: {
      itemId: "",
      proof: "",
    },
  });

  const claimsQuery = useQuery<ApiClaim[]>({
    queryKey: ["claims"],
    queryFn: fetchClaims,
  });

  const itemsQuery = useQuery<ApiItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const addClaim = useMutation({
    mutationFn: createClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      reset();
    },
  });

  const onSubmit = (values: ClaimFormValues): void => {
    addClaim.mutate({
      itemId: values.itemId,
      proof: values.proof,
    });
  };

  if (claimsQuery.isPending || itemsQuery.isPending) {
    return (
      <div className="animate-pulse p-6">
        Loading claims and available items...
      </div>
    );
  }

  if (claimsQuery.isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {claimsQuery.error.message}
      </div>
    );
  }

  if (itemsQuery.isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {itemsQuery.error.message}
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Claims
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 grid gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
      >
        <div className="grid gap-1.5">
          <Label htmlFor="itemId" className="text-gray-900 dark:text-white">
            Item
          </Label>

          <select
            id="itemId"
            {...register("itemId")}
            className="h-8 w-full rounded-lg border border-input bg-white px-2.5 text-sm text-gray-900 dark:bg-gray-900 dark:text-white"
            aria-invalid={errors.itemId ? true : undefined}
          >
            <option value="">Select an item</option>
            {itemsQuery.data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} — {item.location} ({item.status})
              </option>
            ))}
          </select>

          {errors.itemId && (
            <p className="text-sm text-red-600">{errors.itemId.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="proof" className="text-gray-900 dark:text-white">
            Proof of ownership
          </Label>

          <Input
            id="proof"
            {...register("proof")}
            placeholder="Describe proof of ownership"
            className="bg-white text-gray-900 placeholder:text-gray-500 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:border-gray-600"
            aria-invalid={errors.proof ? true : undefined}
          />

          {errors.proof && (
            <p className="text-sm text-red-600">{errors.proof.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={addClaim.isPending}
          className="justify-self-start"
        >
          {addClaim.isPending ? "Saving..." : "Add Claim"}
        </Button>
      </form>

      {addClaim.isError && (
        <p className="mb-4 text-sm text-red-700">
          {addClaim.error.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {claimsQuery.data.map((claim) => (
          <ClaimCard key={claim.id} claim={claim}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Proof: {claim.proof}
            </p>
          </ClaimCard>
        ))}
      </div>
    </div>
  );
}

export default ClaimsPage;
