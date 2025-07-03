import { useState } from "react";
import Item from "./Item";
import type { Item as ItemType } from "./Form"; 

interface PackingListProps {
  items: ItemType[];
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
  onClearList: () => void;
}

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}: PackingListProps) {
  const [sortBy, setSortBy] = useState<"input" | "description" | "packed">("input");

  let sortedItems: ItemType[];

  // Create a shallow copy of the items array and sort it alphabetically by the 'description' property (a string)
  if (sortBy === "input") sortedItems = items;
  else if (sortBy === "description")
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description) // Compares strings alphabetically
    );
  // Create a shallow copy of the items array and sort it by the 'packed' boolean (false before true)
  else if (sortBy === "packed")
    sortedItems = [...items].sort((a, b) =>
      Number(a.packed) - Number(b.packed) // Converts booleans to numbers: false = 0, true = 1
    );
  else
    sortedItems = items; // fallback, should never happen

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select
          value={sortBy}
          // TypeScript needs reassurance that the value you’re passing to setSortBy is indeed one of the three allowed values.
          // That’s why you use the type assertion (as "input" | "description" | "packed"):
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSortBy(e.target.value as "input" | "description" | "packed")
          }
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
