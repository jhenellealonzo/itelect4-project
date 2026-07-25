import {
  useState,
  useEffect,
  useRef,
  type MouseEvent,
} from "react";

import type { User, Items, Claims } from "./types";

import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimCard from "./components/ClaimCard";

import {useToggle} from "./hooks/useToggle";
import {usePrevious} from "./hooks/usePrevious";

function App() {
  // ===== TYPED STATE WITH useState<T> =====

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [items, setItems] = useState<Items[]>([]);
  const [claim, setClaim] = useState<Claims | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ===== SEARCH STATE =====

  const [searchTerm, setSearchTerm] = useState<string>("");

  // ===== useRef =====

  const searchInputRef = useRef<HTMLInputElement>(null);

  // ===== CUSTOM HOOKS =====

  const [showClaimDetails, toggleClaimDetails] = useToggle(false);

  const previousSearch = usePrevious(searchTerm);

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
        description: "Left in the library",
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
      proof: "Student ID presented",
    };

    // Simulate loading like the instructor
    setTimeout(() => {
      setSelectedUser(mockUser);
      setItems(mockItems);
      setClaim(mockClaim);
      setIsLoading(false);
    }, 500);
  }, []);

  // ===== TYPED onChange =====

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  // ===== TYPED CALLBACK =====

  const handleViewItem = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    console.log(event.currentTarget);

    if (filteredItems.length > 0) {
      alert(`Viewing Item: ${filteredItems[0].name}`);
    }
  };

  // ===== FILTERED DATA =====

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== LOADING =====

  if (isLoading) {
    return <p>Loading lost and found items...</p>;
  }

  return (
    <div className="app">
      <h1>Campus Lost & Found Tracker</h1>

      {/* Search */}

      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search lost items..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <button
        onClick={() => searchInputRef.current?.focus()}
      >
        Focus Search
      </button>

      {/* Previous Search */}

      {previousSearch !== undefined &&
        previousSearch !== searchTerm && (
          <p>
            Previous Search: "{previousSearch}"
          </p>
        )}

      {/* User */}

      {selectedUser && (
        <>
          <UserCard user={selectedUser} />

          <p>
            Selected User: {selectedUser.name}
          </p>
        </>
      )}

      {/* Toggle Claim */}

      <button onClick={toggleClaimDetails}>
        {showClaimDetails ? "Hide" : "Show"} Claim Details
      </button>

      <br />
      <br />

      {/* Items */}

      {filteredItems.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onSelect={handleViewItem}
        />
      ))}

      {/* Claim */}

      {showClaimDetails && claim && (
        <ClaimCard claim={claim} />
      )}
    </div>
  );
}

export default App;