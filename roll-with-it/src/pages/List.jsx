import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function List() {
  const { id } = useParams(); // Gets the `listId` from URL like /list/:id
  const navigate = useNavigate();

  const [listData, setListData] = useState(null);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      const res = await fetch(`https://e7pg06nqla.execute-api.us-east-1.amazonaws.com/getPackingList?listId=${id}`);
      const result = await res.json();

      // If Lambda returned an error format
      if (result.error) {
        console.error("Lambda error:", result.error);
        setListData(null);
      } else {
        console.log('Fetched list:', result);
        // For now, an item is simply a string. So convert it into an object to do cool stuff
        result.items = result.items.map(item => ({
            id: Date.now() + Math.random(),
            text: item,
            checked: false
        }));
        setListData(result); // Already parsed item from JSON.stringify(data.Item)
        setItems(result.items);
      }
    } catch (err) {
      console.error("Failed to fetch list:", err);
      setListData(null);
    } finally {
      setLoading(false);
    }
  };

  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  };

  const handleAddItem = async () => {
    const trimmed = toTitleCase(newItem.trim());
    if (!trimmed) return;

    const newListItem = {
      id: Date.now(),
      text: trimmed,
      checked: false,
    };

    setItems([...items, newListItem]);
    setNewItem('');

    try {
      const res = await fetch(`https://e7pg06nqla.execute-api.us-east-1.amazonaws.com/addToPackingList?listId=${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newItem: trimmed }),
      });

      if (!res.ok) throw new Error("Server error");

      console.log("Item saved to server:", trimmed);
    } catch (error) {
      console.error("Failed to save item to server:", error);
      alert("Error saving item to server.");
    }
  };

  const toggleItemCheck = (itemId) => {
    // Future idea: POST request to change `checked` value
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  useEffect(() => {
    fetchList();
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <h2>Loading list...</h2>
      </div>
    );
  }

  if (!listData) {
    return (
      <div className="container text-center py-5">
        <h2>List not found</h2>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: '700px' }}>
      <div className="d-flex justify-content-center align-items-center mb-4">
        <h2 className="fw-bold mb-0 text-center">{listData.title}</h2>
      </div>

      {/* List of Items */}
      <ul className="list-group mb-4">
        {!items.length ? (
          <li className="list-group-item text-muted fst-italic">No items yet.</li>
        ) : (
          items.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex align-items-center"
            >
              <input
                type="checkbox"
                className="form-check-input me-3"
                checked={item.checked}
                onChange={() => toggleItemCheck(item.id)}
                id={`item-${item.id}`}
              />
              <label
                htmlFor={`item-${item.id}`}
                className={`mb-0 flex-grow-1 ${
                  item.checked ? 'text-decoration-line-through text-muted' : ''
                }`}
                style={{ cursor: 'pointer' }}
              >
                {item.text}
              </label>
            </li>
          ))
        )}
      </ul>

      {/* Add New Item */}
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Add new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
        />
        <button
          className="btn btn-primary"
          onClick={handleAddItem}
          disabled={!newItem.trim()}
        >
          Add
        </button>
      </div>

      {/* Just return home */}
      <div className="mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate('/')}
        >
          Return Home
        </button>
      </div>
    </div>
  );
}

export default List;
