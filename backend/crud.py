import uuid
from sqlalchemy.orm import Session
from models import Note as NoteModel
from schemas import NoteCreate

def get_db():
    from database import SessionLocal
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_note(db: Session, note: NoteCreate):
    share_token = str(uuid.uuid4())  # Unique token for sharing
    db_note = NoteModel(title=note.title, content=note.content, share_token=share_token)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

def get_notes(db: Session):
    return db.query(NoteModel).all()

def get_note(db: Session, note_id: int):
    return db.query(NoteModel).filter(NoteModel.id == note_id).first()

def update_note(db: Session, note_id: int, note: NoteCreate):
    db_note = get_note(db, note_id)
    if db_note:
        db_note.title = note.title
        db_note.content = note.content
        db.commit()
        db.refresh(db_note)
    return db_note

def delete_note(db: Session, note_id: int):
    db_note = get_note(db, note_id)
    if db_note:
        db.delete(db_note)
        db.commit()
    return db_note

def get_note_by_token(db: Session, token: str):
    return db.query(NoteModel).filter(NoteModel.share_token == token).first()