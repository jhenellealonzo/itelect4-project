import type { Claims } from "../types";
import type { ReactNode } from "react";

interface ClaimCardProps {
  claim: Claims;
  variant?: "default" | "compact";
  children?: ReactNode;
}

function ClaimCard({
  claim,
  variant = "default",
  children,
}: ClaimCardProps) {
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
        Claim Information
      </h3>

      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Claim ID: {claim.id}
      </p>

      {!isCompact && (
        <>
          <p className="text-gray-600 dark:text-gray-300">
            Item ID: {claim.itemId}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            Claimant ID: {claim.claimantId}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            Proof: {claim.proof}
          </p>
        </>
      )}

      <p className="mt-2 text-sm font-semibold text-green-600 dark:text-green-400">
        Status: {claim.status}
      </p>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default ClaimCard;