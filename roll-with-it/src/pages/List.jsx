import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function List() {
  const { id } = useParams(); // Gets the `listId` from URL like /list/:id
  const navigate = useNavigate();

  const [listData, setListData] = useState(null);
  const [loading, setLoading] = useState(true);

  const LAMBDA_API_URL = `https://e7pg06nqla.execute-api.us-east-1.amazonaws.com/getPackingList?listId=${id}`;

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(LAMBDA_API_URL);
        const result = await res.json();

        // If Lambda returned an error format
        if (result.error) {
          console.error("Lambda error:", result.error);
          setListData(null);
        } else {
          setListData(result); // Already parsed item from JSON.stringify(data.Item)
        }
      } catch (err) {
        console.error("Failed to fetch list:", err);
        setListData(null);
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
      <h2 className="mb-4 text-center">{listData.title}</h2>
      <ul className="list-group">
        {listData.items?.map((item, index) => (
          <li key={index} className="list-group-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;