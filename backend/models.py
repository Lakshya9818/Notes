from sqlalchemy import Column, Integer, String, Text
from database import Base

class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    share_token = Column(String, unique=True)  # For sharing via URL