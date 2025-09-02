import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/notes/')
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteNote = (id) => {
    axios.delete(`http://127.0.0.1:8000/notes/${id}`)
      .then(() => setNotes(notes.filter(note => note.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <Link to="/create" className="btn btn-primary mb-3">Create Note</Link>
      <ul className="list-group">
        {notes.map(note => (
          <li key={note.id} className="list-group-item">
            <h5>{note.title}</h5>
            <p>{note.content}</p>
            <Link to={`/edit/${note.id}`} className="btn btn-secondary mr-2">Edit</Link>
            <button onClick={() => deleteNote(note.id)} className="btn btn-danger">Delete</button>
            <Link to={`/share/${note.share_token}`} className="btn btn-info ml-2">Share URL</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;