from pydantic import BaseModel
from typing import Optional

class NoteBase(BaseModel):
    title: str
    content: str

class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: int
    share_token: Optional[str] = None

    class Config:
        from_attributes = True  # For ORM compatibility