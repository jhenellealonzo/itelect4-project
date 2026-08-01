import { useState, useEffect, useRef } from "react";

import type { User, Items, Claims } from "./types";

import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimCard from "./components/ClaimCard";

import { useToggle } from "./hooks/useToggle";
import { usePrevious } from "./hooks/usePrevious";

function App() {
  // ===== STATE =====

  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  const [items, setItems] =
    useState<Items[]>([]);

  const [claim, setClaim] =
    useState<Claims | null>(null);

  const [isLoading, setIsLoading] =
    useState<boolean>(true);

  const [isError, setIsError] =
    useState<boolean>(false);

  const [searchTerm, setSearchTerm] =
    useState<string>("");

  // ===== REF =====

  const searchInputRef =
    useRef<HTMLInputElement>(null);

  // ===== CUSTOM HOOKS =====

  const [showDetails, toggleDetails] =
    useToggle(false);

  const [isDarkMode, toggleDarkMode] =
    useToggle(false);

  const previousSearch =
    usePrevious(searchTerm);

  // ===== LOAD MOCK DATA =====

  useEffect(() => {
    const mockUser: User = {
      id: 1,
      name: "Jhenelle Kath Olan",
      email: "jhenelle@example.com",
      role: "student",
      isActive: true,
    };

    const mockItems: Items[] = [
      {
        id: 1,
        name: "Pink Umbrella",
        description: "Left in the Library",
        location: "Library",
        dateLost: new Date(),
        status: "lost",
        ownerId: 1,
      },
      {
        id: 2,
        name: "Blue Water Bottle",
        description: "Found near the Gym",
        location: "Gym",
        dateLost: new Date(),
        status: "found",
        ownerId: 2,
      },
    ];

    const mockClaim: Claims = {
      id: 1,
      itemId: 1,
      claimantId: 2,
      claimDate: new Date(),
      status: "approved",
      proof: "Student ID Presented",
    };

    const timer = setTimeout(() => {
      setSelectedUser(mockUser);
      setItems(mockItems);
      setClaim(mockClaim);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // ===== EVENTS =====

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  const focusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  const handleViewItem = (
    item: Items
  ): void => {
    alert(`Viewing Item: ${item.name}`);
  };

  // ===== FILTER =====

  const filteredItems = items.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.location
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // ===== LOADING =====

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="animate-pulse text-lg text-gray-700 dark:text-gray-300">
          Loading lost and found items...
        </p>
      </div>
    );
  }

  // ===== ERROR =====

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="rounded-lg bg-red-100 p-6 text-red-700 dark:bg-red-900 dark:text-red-300">
          <p>Could not load lost and found items.</p>

          <button
            onClick={() => setIsError(false)}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ===== RENDER =====

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 p-6 transition-colors dark:bg-gray-900">

        <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
          Campus Lost & Found Tracker
        </h1>

        {/* Buttons */}

        <div className="mb-6 flex gap-3">

          <button
            onClick={toggleDarkMode}
            className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-black"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <button
            onClick={() => setIsError(true)}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Simulate Error
          </button>

        </div>

        {/* Search */}

        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search lost items..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="
            w-full
            rounded
            border
            border-gray-300
            bg-white
            p-3
            text-gray-900
            placeholder-gray-500
            dark:border-gray-700
            dark:bg-gray-800
            dark:text-white
            dark:placeholder-gray-400
          "
        />

        <button
          onClick={focusSearch}
          className="mt-3 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Focus Search
        </button>

        {previousSearch !== undefined &&
          previousSearch !== searchTerm && (
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              Previous Search: "{previousSearch}"
            </p>
          )}

        {/* User */}

        {selectedUser && (
          <>
            <div className="mt-8">
              <UserCard
                user={selectedUser}
                onSelect={setSelectedUser}
              />
            </div>

            <p className="mt-3 text-gray-900 dark:text-white">
              Selected User: {selectedUser.name}
            </p>
          </>
        )}

        {/* Toggle Claim */}

        <button
          onClick={toggleDetails}
          className="mt-8 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          {showDetails ? "Hide" : "Show"} Claim Details
        </button>

        {/* Items */}

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onSelect={handleViewItem}
              variant="default"
            />
          ))}
        </div>

        {/* Claim */}

        {showDetails && claim && (
          <div className="mt-8">
            <ClaimCard
              claim={claim}
              variant="default"
            >
              <p className="text-sm text-green-600 dark:text-green-400">
                ✓ Claim approved. Ready for pickup.
              </p>
            </ClaimCard>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;