import type { ReactNode } from "react";
import type { Claims } from "@/types";


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
        border-border
        bg-card
        p-5
        shadow-sm
      "
    >

      <h3 className="text-lg font-bold text-foreground">
        Claim Information
      </h3>


      <p className="mt-2 text-muted-foreground">
        Claim ID: {claim.id}
      </p>


      {!isCompact && (
        <>

          <p className="text-muted-foreground">
            Item ID: {claim.itemId}
          </p>


          <p className="text-muted-foreground">
            Claimant ID: {claim.claimantId}
          </p>


          <p className="text-muted-foreground">
            Proof: {claim.proof}
          </p>

        </>
      )}


      <p
        className="
          mt-2
          text-sm
          font-semibold
          text-green-600
        "
      >
        Status: {claim.status}
      </p>


      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}


    </div>
  );
}


export default ClaimCard;