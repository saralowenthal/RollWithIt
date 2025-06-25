import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PackingListGrid() {
  const [lists, setLists] = useState([
    { id: 1, name: 'Beach Trip' },
    { id: 2, name: 'Business Trip' },
    { id: 3, name: 'Camping Weekend' },
    { id: 4, name: 'City Break' },
    { id: 5, name: 'Ski Holiday' },
  ]);

  const [addingNew, setAddingNew] = useState(false);
  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) return;
    setLists([...lists, { id: Date.now(), name: newName.trim() }]);
    setNewName('');
    setAddingNew(false);
  };

  return (
    <div className="container-fluid vh-100 py-5 bg-light">
      <h2
        className="text-center"
        style={{
          fontWeight: '700',
          letterSpacing: '0.15em',
          color: '#212529',
          borderBottom: '3px solid #6c757d',
          display: 'inline-block',
          paddingBottom: '0.25rem',
          marginBottom: '2rem',
        }}
      >
        Your Packing Lists
      </h2>
      <div className="row gx-4 gy-4 px-4">
        {lists.map((list) => (
          <div key={list.id} className="col-6 col-md-3">
            <div
              className="card h-100 bg-white text-dark rounded border d-flex align-items-center justify-content-center p-3 list-card"
              style={{ aspectRatio: '4 / 3', cursor: 'default', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              aria-label={list.name}
            >
              <small
                className="text-center text-truncate w-100 mb-0 fw-semibold"
                style={{ letterSpacing: '0.05em', fontSize: '1rem' }}
              >
                {list.name}
              </small>
            </div>
          </div>
        ))}

        {/* Add-new card */}
        <div className="col-6 col-md-3">
          <div
            className="card h-100 bg-white rounded border d-flex align-items-center justify-content-center p-3"
            style={{ aspectRatio: '4 / 3' }}
            aria-label="Add new list"
          >
            {!addingNew ? (
              <button
                className="btn btn-outline-secondary rounded-circle p-0"
                style={{ width: '44px', height: '44px', borderWidth: '1.5px' }}
                onClick={() => setAddingNew(true)}
                aria-label="Add new list"
                type="button"
              >
                <i className="bi bi-plus-lg fs-4"></i>
              </button>
            ) : (
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAdd()}
                  autoFocus
                />
                <button
                  className="btn btn-outline-success"
                  onClick={handleAdd}
                  disabled={!newName.trim()}
                >
                  <i className="bi bi-check-lg"></i>
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setAddingNew(false);
                    setNewName('');
                  }}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .list-card:hover {
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.1);
          transform: translateY(-4px);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}