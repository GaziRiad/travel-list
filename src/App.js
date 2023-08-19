import { useState } from "react";

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
        handleClearItem={handleClearItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 FAR AWAY 👜</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      id: Date.now(),
      quantity,
      description,
      packed: false,
    };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onUpdate, handleClearItem }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = [...items].sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onUpdate={onUpdate}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleClearItem}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onUpdate }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onUpdate(item.id)}
      ></input>

      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your list 🚀</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((i) => i.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage !== 100
          ? `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`
          : "You got everything! Ready to go ✈️"}
      </em>
    </footer>
  );
}
