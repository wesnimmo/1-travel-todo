
import { useState } from "react";
import type { Item as ItemType } from "./Form";

interface ItemProps {
  item: ItemType;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
  onEditItem: (desc: string, quant: number) => void;

}


export default function Item({ 
  item,
  onDeleteItem, 
  onToggleItem,
  onEditItem 
}: ItemProps) {

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedDescription, setEditedDescription] = useState<string>(item.description)
  const [editedQuantity, setEditedQuantity] = useState<number>(item.quantity);
  const [error, setError] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setEditedDescription(e.target.value)

  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }

    if (e.key === "Escape") {
      setEditedDescription(item.description);
      setEditedQuantity(item.quantity);
      setIsEditing(false);
    }
  };


  const handleSave = () => {
    if (!editedDescription.trim()) {
      setError("Description cannot be empty.");
      return;
    }
    if (editedQuantity < 1) {
      setError("Quantity must be at least 1.");
      return;
    }
    setError(null);
    onEditItem(editedDescription, editedQuantity);
    setIsEditing(false);
  };

  
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />

      {
        isEditing ? (

          <>
            <input
              type="number"
              min={1}
              max={20}
              value={editedQuantity}
              onChange={e => setEditedQuantity(Number(e.target.value))}
              onKeyDown={handleKeyDown}
              autoFocus
              // ...other handlers
            />
            <input 
              type="text"
              value={editedDescription}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            {error && <div className="error">{error}</div>}
             <button style={{color: 'white'}} onClick={handleSave}>Save</button>
             <button style={{color: 'white'}} onClick={() => setIsEditing(false)}>Cancel</button>
          </>

        ) : (<span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>)
      }

      <button data-testid="edit-icon" style={{color: "white"}} onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
