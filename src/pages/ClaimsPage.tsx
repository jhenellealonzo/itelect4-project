import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ApiClaim, Claims } from "../types/index";
import ClaimCard from "../components/ClaimCard";

import { fetchClaims, createClaim } from "../api/client";

import {
  claimSchema,
  type ClaimFormValues,
} from "../schemas/claimSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


function ClaimsPage() {
  const queryClient = useQueryClient();


  // =========================
  // FORM HANDLING
  // =========================

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



  // =========================
  // READ CLAIMS
  // =========================

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery<ApiClaim[], Error, Claims[]>({
    queryKey: ["claims"],
    queryFn: fetchClaims,

    select: (claims) =>
      claims.map((claim) => ({
        ...claim,
        id: Number(claim.id),
        claimDate: new Date(claim.claimDate),
      })),
  });



  // =========================
  // CREATE CLAIM
  // =========================

  const addClaim = useMutation({

    mutationFn: createClaim,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["claims"],
      });

      reset();
    },

  });



  // =========================
  // SUBMIT
  // =========================

  const onSubmit = (
    values: ClaimFormValues
  ): void => {

    addClaim.mutate({

      itemId: Number(values.itemId),

      claimantId: 1,

      claimDate:
        new Date().toISOString(),

      status: "approved",

      proof: values.proof,

    });

  };



  if (isPending) {
    return (
      <div className="animate-pulse p-6">
        Loading claims...
      </div>
    );
  }



  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message} -- is json-server running on port 3001?
      </div>
    );
  }



  return (
    <div>

      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Claims
      </h2>



      {/* CLAIM FORM */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          mb-6
          grid
          gap-4
          rounded-lg
          border
          border-gray-200
          p-4
          dark:border-gray-700
        "
      >



        {/* ITEM ID */}

        <div className="grid gap-1.5">

          <Label
            htmlFor="itemId"
            className="text-gray-900 dark:text-white"
          >
            Item ID
          </Label>



          <Input

            id="itemId"

            type="number"

            {...register("itemId")}

            placeholder="Enter item ID"

            className="
              bg-white
              text-gray-900
              placeholder:text-gray-500

              dark:bg-gray-900
              dark:text-white
              dark:placeholder:text-gray-400
              dark:border-gray-600
            "

            aria-invalid={
              errors.itemId
                ? true
                : undefined
            }

          />



          {errors.itemId && (

            <p className="text-sm text-red-600">

              {errors.itemId.message}

            </p>

          )}

        </div>





        {/* PROOF */}

        <div className="grid gap-1.5">


          <Label
            htmlFor="proof"
            className="text-gray-900 dark:text-white"
          >
            Proof of ownership
          </Label>



          <Input

            id="proof"

            {...register("proof")}

            placeholder="Describe proof of ownership"


            className="
              bg-white
              text-gray-900
              placeholder:text-gray-500

              dark:bg-gray-900
              dark:text-white
              dark:placeholder:text-gray-400
              dark:border-gray-600
            "


            aria-invalid={
              errors.proof
                ? true
                : undefined
            }

          />



          {errors.proof && (

            <p className="text-sm text-red-600">

              {errors.proof.message}

            </p>

          )}


        </div>




        <Button
          type="submit"
          disabled={addClaim.isPending}
          className="justify-self-start"
        >

          {
            addClaim.isPending
              ? "Saving..."
              : "Add Claim"
          }

        </Button>



      </form>





      {/* MUTATION ERROR */}

      {addClaim.isError && (

        <p className="mb-4 text-sm text-red-700">

          {addClaim.error.message}

        </p>

      )}







      {/* CLAIM LIST */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {data.map((claim) => (

          <ClaimCard

            key={claim.id}

            claim={claim}

          >

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