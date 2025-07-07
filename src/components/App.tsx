import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import type { Item } from "./Form";
import { useLocalStorage } from "./useLocalStorage";

export default function App() {
  const [items, setItems] = useLocalStorage<Item[]>("items", []);

  function handleAddItems(item: Item) {
    setItems((items) => [...items, item]);
  }

  function handleEditItem(id: number, desc: string, quant: number ) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, description: desc, quantity: quant } : item
      )
    );
  }


  function handleDeleteItem(id: number) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id: number) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onEditItem={handleEditItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
