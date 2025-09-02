import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const NoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/notes/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = { title, content };
    if (id) {
      axios.put(`http://127.0.0.1:8000/notes/${id}`, note)
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    } else {
      axios.post('http://127.0.0.1:8000/notes/', note)
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Content</label>
        <textarea className="form-control" value={content} onChange={e => setContent(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default NoteForm;