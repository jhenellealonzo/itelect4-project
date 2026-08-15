import ClaimCard from "../components/ClaimCard";
import { allClaims } from "../data/mockData";

function ClaimsPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Claims
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allClaims.map((claim) => (
          <ClaimCard
            key={claim.id}
            claim={claim}
            variant="default"
          >
            <p className="text-sm text-green-600 dark:text-green-400">
              Claim status: {claim.status}
            </p>
          </ClaimCard>
        ))}
      </div>

      {allClaims.length === 0 && (
        <p className="mt-6 text-gray-500 dark:text-gray-400">
          No claims found.
        </p>
      )}
    </div>
  );
}

export default ClaimsPage;