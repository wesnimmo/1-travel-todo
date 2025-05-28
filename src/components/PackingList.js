import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    // Create a shallow copy of the items array and sort it alphabetically by the 'description' property (a string)
    sortedItems = [...items] // Makes a shallow copy so the original array isn't mutated
      .sort((a, b) => 
        a.description.localeCompare(b.description) // Compares strings alphabetically
      );

  if (sortBy === "packed")
    // Create a shallow copy of the items array and sort it by the 'packed' boolean (false before true)
    sortedItems = [...items]// Makes a shallow copy to avoid mutating the original array
      .sort((a, b) => 
        Number(a.packed) - Number(b.packed) // Converts booleans to numbers: false = 0, true = 1
      );




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
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
