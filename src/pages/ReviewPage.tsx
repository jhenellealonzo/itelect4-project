import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { askAi } from "../api/client";
import type { AiItemReportReview } from "../types";
import { reviewFormSchema, type ReviewFormValues } from "../schemas/reviewSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const READINESS_STYLE: Record<AiItemReportReview["readiness"], string> = {
  ready: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
  almost: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200",
  "not-yet": "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
};

function ReviewPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const review = useMutation({
    mutationFn: askAi,
  });

  const onSubmit = (values: ReviewFormValues): void => {
    review.mutate(values.prompt);
  };

  return (
    <div className="max-w-3xl">
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        AI Report Review
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Describe a lost or found item and get feedback on whether the report
        contains enough useful identifying details.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
      >
        <div className="grid gap-1.5">
          <Label htmlFor="prompt" className="text-gray-900 dark:text-white">
            Item report description
          </Label>
          <textarea
            id="prompt"
            rows={6}
            {...register("prompt")}
            aria-invalid={errors.prompt ? true : undefined}
            placeholder="Example: Black wallet lost near the library, with a silver zipper and a scratch on one corner..."
            className="w-full resize-y rounded-lg border border-input bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400"
          />
          {errors.prompt && (
            <p className="text-sm text-red-600">{errors.prompt.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={review.isPending}
          className="justify-self-start"
        >
          {review.isPending ? "Reviewing..." : "Review item report"}
        </Button>
      </form>

      {review.isError && (
        <p className="mt-4 text-sm text-red-700">{review.error.message}</p>
      )}

      {review.data && (
        <section
          aria-live="polite"
          className="mt-6 grid gap-5 rounded-lg border border-gray-200 p-5 dark:border-gray-700"
        >
          <div>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold capitalize ${READINESS_STYLE[review.data.readiness]}`}
            >
              {review.data.readiness}
            </span>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
              Summary
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {review.data.summary}
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
              Key details detected
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
              {review.data.keyDetails.map((detail, index) => (
                <li key={`${detail}-${index}`}>{detail}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
              Suggestions to improve the report
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
              {review.data.suggestions.map((suggestion, index) => (
                <li key={`${suggestion}-${index}`}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

export default ReviewPage;
