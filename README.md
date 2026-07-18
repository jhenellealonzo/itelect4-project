# Campus Lost & Found Tracker

## Project Description

The Campus Lost & Found Tracker is a TypeScript-based application designed to demonstrate the core features of the TypeScript language through a campus-themed system. It models users, lost and found items, and item claims while showcasing the use of interfaces, utility types, enums, type aliases, union and intersection types, generic functions, and generic interfaces. The project serves as a simple example of how TypeScript's type system can be used to create well-structured, type-safe, and maintainable applications.

## Interfaces and Types

### Interfaces
- User
- Item
- Claim
- ApiResponse<T>

### Utility Types
- UserUpdate (Partial<User>)
- UserPreview (Pick<User>)
- PublicUser (Omit<User>)
- UserCount (Record)

### Type Aliases
- ID
- Location
- DateFormatter
- StringOrNumber
- ItemStatus
- ItemWithOwner

### Enums
- ClaimStatus
- UserRole

## Installation

Install the dependencies:

```bash
npm install
```

## Running the Project

Execute the project using:

```bash
npx ts-node src/index.ts
```

## Type Checking

Run the TypeScript compiler without generating JavaScript files:

```bash
npx tsc --noEmit
```