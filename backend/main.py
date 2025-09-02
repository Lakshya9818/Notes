from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import Base, engine
from schemas import Note, NoteCreate
from crud import create_note, get_notes, get_note, update_note, delete_note, get_note_by_token, get_db

app = FastAPI()

# Create DB tables
Base.metadata.create_all(bind=engine)

@app.post("/notes/", response_model=Note)
def create(note: NoteCreate, db: Session = Depends(get_db)):
    return create_note(db, note)

@app.get("/notes/", response_model=list[Note])
def read_notes(db: Session = Depends(get_db)):
    return get_notes(db)

@app.get("/notes/{note_id}", response_model=Note)
def read_note(note_id: int, db: Session = Depends(get_db)):
    note = get_note(db, note_id)
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@app.put("/notes/{note_id}", response_model=Note)
def update(note_id: int, note: NoteCreate, db: Session = Depends(get_db)):
    updated_note = update_note(db, note_id, note)
    if updated_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return updated_note

@app.delete("/notes/{note_id}")
def delete(note_id: int, db: Session = Depends(get_db)):
    deleted_note = delete_note(db, note_id)
    if deleted_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"message": "Note deleted"}

@app.get("/share/{token}", response_model=Note)
def share_note(token: str, db: Session = Depends(get_db)):
    note = get_note_by_token(db, token)
    if note is None:
        raise HTTPException(status_code=404, detail="Shared note not found")
    return note