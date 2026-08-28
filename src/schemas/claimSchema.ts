import { z } from "zod";

export const claimSchema = z.object({
  itemId: z
    .string()
    .min(1, "Item ID is required."),

  proof: z
    .string()
    .min(5, "Proof must be at least 5 characters.")
    .refine(
      (proof) => proof.trim().length > 0,
      "Proof cannot be empty."
    ),
});

export type ClaimFormValues = z.infer<typeof claimSchema>;