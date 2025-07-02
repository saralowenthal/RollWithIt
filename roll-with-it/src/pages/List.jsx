import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function List() {
  const { id } = useParams(); // gets listId from URL
  const navigate = useNavigate();

  const [listData, setListData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace with your real Lambda API endpoint
  const LAMBDA_API_URL = `https://e7pg06nqla.execute-api.us-east-1.amazonaws.com/getPackingList`;

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(LAMBDA_API_URL);
        const data = await res.json();
        setListData(data);
      } catch (err) {
        console.error("Failed to fetch list:", err);
      } finally {
        setLoading(false);
      }
    };

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
    <div className="container py-5">
      <h2 className="mb-4 text-center">{listData.name}</h2>
      <ul className="list-group">
        {listData.items.map((item, index) => (
          <li key={index} className="list-group-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;