import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import ShareNote from './ShareNote';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Notes App</h1>
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/create" element={<NoteForm />} />
          <Route path="/edit/:id" element={<NoteForm />} />
          <Route path="/share/:token" element={<ShareNote />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;