import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShareNote = () => {
  const { token } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/share/${token}`)
      .then(res => setNote(res.data))
      .catch(err => console.error(err));
  }, [token]);

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h2>Shared Note</h2>
      <h5>{note.title}</h5>
      <p>{note.content}</p>
    </div>
  );
};

export default ShareNote;