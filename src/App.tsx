import type { MouseEvent } from "react";

import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimCard from "./components/ClaimCard";

import type { User, Items, Claims } from "./types";

function App() {
  const user: User = {
    id: 1,
    name: "Jhenelle Kath Olan",
    email: "jhenelle@example.com",
    role: "student",
    isActive: true,
  };

  const item: Items = {
    id: 1,
    name: "Pink Umbrella",
    description: "Left in the library",
    location: "Library",
    dateLost: new Date(),
    status: "lost",
    ownerId: 1,
  };

  const claim: Claims = {
    id: 1,
    itemId: 1,
    claimantId: 2,
    claimDate: new Date(),
    status: "approved",
    proof: "Student ID presented",
  };

  // Typed callback passed to ItemCard
  const handleViewItem = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    console.log(event.currentTarget);
    alert(`Viewing Item: ${item.name}`);
  };

  return (
    <div>
      <h1>Campus Lost & Found Tracker</h1>

      <UserCard user={user} />

      <ItemCard
        item={item}
        onSelect={handleViewItem}
      />

      <ClaimCard claim={claim} />
    </div>
  );
}

export default App;