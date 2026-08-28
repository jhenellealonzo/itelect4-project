import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { User } from "@/types";


interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
  variant?: "default" | "compact";
  children?: ReactNode;
}


function UserCard({
  user,
  onSelect,
  variant = "default",
  children,
}: UserCardProps) {


  const isCompact = variant === "compact";


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {

    console.log(
      "Search:",
      e.target.value
    );

  };


  return (

    <div
      className={`
        rounded-lg
        border
        border-border
        bg-card
        p-5
        shadow-sm
        ${isCompact ? "text-sm" : ""}
      `}
    >

      <h3 className="text-lg font-bold text-foreground">
        {user.name}
      </h3>


      {!isCompact && (
        <>

          <p className="text-muted-foreground">
            {user.email}
          </p>


          <p className="text-sm text-muted-foreground">
            Role: {user.role}
          </p>

        </>
      )}


      <Button
        onClick={() => onSelect(user)}
        className="mt-3"
      >
        Select
      </Button>


      {!isCompact && (

        <Input
          onChange={handleChange}
          placeholder="Quick note (demo only)"
          className="mt-2"
        />

      )}


      {children}

    </div>

  );
}


export default UserCard;