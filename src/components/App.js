import { useState } from "react";
import Logo from "./Logo";
import Form from ".//Form";
import Stats from "./Stats";
import PackingList from "./PackingList";

// const initialItems = [
//   { id: 1, description: "shirt", quantity: 2, packed: true },
//   { id: 2, description: "socks", quantity: 10, packed: false },
//   { id: 3, description: "Laptop", quantity: 1, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((i) => i.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i))
    );
  }

  function handleClearItem() {
    const userRes = window.confirm("Are you want to delete the LIST ?");
    if (!userRes) return;
    //
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onUpdate={handleToggleItem}
        onClearList={handleClearItem}
      />
      <Stats items={items} />
    </div>
  );
}
